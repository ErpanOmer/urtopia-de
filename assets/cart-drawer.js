class CartDrawer extends HTMLElement {
  constructor() {
    super();

    this.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.close());
    this.querySelector('#CartDrawer-Overlay').addEventListener('click', this.close.bind(this));
    this.setHeaderCartIconAccessibility();
  }

  setHeaderCartIconAccessibility() {
    const cartLink = document.querySelector('#cart-icon-bubble');
    cartLink.setAttribute('role', 'button');
    cartLink.setAttribute('aria-haspopup', 'dialog');
    cartLink.addEventListener('click', (event) => {
      event.preventDefault();
      this.open(cartLink)
    });
    cartLink.addEventListener('keydown', (event) => {
      if (event.code.toUpperCase() === 'SPACE') {
        event.preventDefault();
        this.open(cartLink);
      }
    });
  }

  open(triggeredBy) {
    if (triggeredBy) this.setActiveElement(triggeredBy);
    const cartDrawerNote = this.querySelector('[id^="Details-"] summary');
    if (cartDrawerNote && !cartDrawerNote.hasAttribute('role')) this.setSummaryAccessibility(cartDrawerNote);
    // here the animation doesn't seem to always get triggered. A timeout seem to help
    setTimeout(() => {this.classList.add('animate', 'active')});

    this.addEventListener('transitionend', () => {
      const containerToTrapFocusOn = this.classList.contains('is-empty') ? this.querySelector('.drawer__inner-empty') : document.getElementById('CartDrawer');
      const focusElement = this.querySelector('.drawer__inner') || this.querySelector('.drawer__close');
      trapFocus(containerToTrapFocusOn, focusElement);
    }, { once: true });

    document.body.classList.add('overflow-hidden');
  }

  close() {
    this.classList.remove('active');
    removeTrapFocus(this.activeElement);
    document.body.classList.remove('overflow-hidden');
  }

  setSummaryAccessibility(cartDrawerNote) {
    cartDrawerNote.setAttribute('role', 'button');
    cartDrawerNote.setAttribute('aria-expanded', 'false');

    if(cartDrawerNote.nextElementSibling.getAttribute('id')) {
      cartDrawerNote.setAttribute('aria-controls', cartDrawerNote.nextElementSibling.id);
    }

    cartDrawerNote.addEventListener('click', (event) => {
      event.currentTarget.setAttribute('aria-expanded', !event.currentTarget.closest('details').hasAttribute('open'));
    });

    cartDrawerNote.parentElement.addEventListener('keyup', onKeyUpEscape);
  }

  renderContents(parsedState) {
    this.querySelector('.drawer__inner').classList.contains('is-empty') && this.querySelector('.drawer__inner').classList.remove('is-empty');
    this.productId = parsedState.id;
    this.getSectionsToRender().forEach((section => {
      const sectionElement = section.selector ? document.querySelector(section.selector) : document.getElementById(section.id);
      sectionElement.innerHTML =
          this.getSectionInnerHTML(parsedState.sections[section.id], section.selector);
    }));

    setTimeout(() => {
      this.querySelector('#CartDrawer-Overlay').addEventListener('click', this.close.bind(this));
      this.open();
    });
  }

  getSectionInnerHTML(html, selector = '.shopify-section') {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).innerHTML;
  }

  getSectionsToRender() {
    return [
      {
        id: 'cart-drawer',
        selector: '#CartDrawer'
      },
      {
        id: 'cart-icon-bubble'
      }
    ];
  }

  getSectionDOM(html, selector = '.shopify-section') {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector);
  }

  setActiveElement(element) {
    this.activeElement = element;
  }
}

customElements.define('cart-drawer', CartDrawer);

class CartDrawerItems extends CartItems {
  updateCarbonOneWithComponents (event, lineItemVariantId, beforeQuantity, afterQuantity) {
    console.log('beforeQuantity', beforeQuantity)
    console.log('afterQuantity', afterQuantity)

    const updates = {}
    const changes = {
      sections: this.getSectionsToRender().map((section) => section.section),
      sections_url: window.location.pathname
    }
    //
    const bike = $(event.target.closest('.cart-item'))
    const sale_name = bike.attr('data-line-item-sale-name')
    const insurance_key = bike.attr('data-insurance-key')

    this.enableLoading(bike.attr('data-index'))

    const components = $(`.cart-items .cart-item[data-line-item-sale-name="${sale_name}"]:not([data-line-item-variant-id="${lineItemVariantId}"]):not([data-line-item-product-id="${bike.attr('data-line-item-product-id')}"])`)
    const other_bikes = $(`.cart-items .cart-item[data-line-item-sale-name="${sale_name}"][data-line-item-product-id="${bike.attr('data-line-item-product-id')}"]:not([data-line-item-variant-id="${lineItemVariantId}"])`)

    // 查找保险产品
    const insurance = $(`.cart-items .cart-item[data-insurance-product-variant-id="${lineItemVariantId}"][data-insurance-key="${insurance_key}"]`)
    // 如果存在 跟车绑定的保险产品
    if (insurance.length) {
      changes['line'] = Number(insurance.attr('data-line-item'))
      changes['quantity'] = afterQuantity
    }


    let other_bikes_quantity = 0
    other_bikes.each((i, item) => {
      other_bikes_quantity += Number($(item).attr('data-quantity'))
    })

    // 活动配件
    components.each((i, item) => {
      updates[$(item).attr('data-cart-item')] = afterQuantity + other_bikes_quantity
    })

    updates[bike.attr('data-cart-item')] = afterQuantity

    console.log('updates', updates)

    const fn = parsedState => {
      console.log('parsedState', parsedState)
      // location.reload(true);
      this.classList.toggle('is-empty', parsedState.item_count === 0);
      const cartDrawerWrapper = document.querySelector('cart-drawer');

      this.getSectionsToRender().forEach((section => {
        const elementToReplace =
          document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);
        elementToReplace.innerHTML =
          this.getSectionInnerHTML(parsedState.sections[section.section], section.selector);
      }));

      if (cartDrawerWrapper) cartDrawerWrapper.classList.toggle('is-empty', parsedState.item_count === 0);

      return parsedState
    }

    fetch('/cart/update.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': `application/json` },
      body: JSON.stringify({ 
        updates,
        sections: this.getSectionsToRender().map((section) => section.section),
        sections_url: window.location.pathname
      })
    }).then(response => response.json()).then(fn).then(() => {
      return fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': `application/json` },
        body: JSON.stringify(changes)
      }).then(response => response.json()).then(fn)
    }).catch((error) => {
      throw new Error(error);
    }).finally(() => {
      this.disableLoading()
      refreshProductCode()
    })
  }

  getSectionsToRender() {
    return [
      {
        id: 'CartDrawer',
        section: 'cart-drawer',
        selector: '.drawer__inner'
      },
      {
        id: 'cart-icon-bubble',
        section: 'cart-icon-bubble',
        selector: '.shopify-section'
      }
    ];
  }
}

customElements.define('cart-drawer-items', CartDrawerItems);
