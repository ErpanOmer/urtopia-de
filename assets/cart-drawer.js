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
      setTimeout(() => {
        const containerToTrapFocusOn = this.classList.contains('is-empty') ? this.querySelector('.drawer__inner-empty') : document.getElementById('CartDrawer');
      const focusElement = this.querySelector('.drawer__inner') || this.querySelector('.drawer__close');

      console.log('containerToTrapFocusOn', containerToTrapFocusOn)
      console.log('focusElement', containerToTrapFocusOn)

      // trapFocus(containerToTrapFocusOn, focusElement);
      }, 300);
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
  updateCarbonOneWithComponents (e, lineItemVariantId, beforeQuantity, afterQuantity) {
    console.log('beforeQuantity', beforeQuantity)
    console.log('afterQuantity', afterQuantity)

    const updates = {}
    // 
    const bike = $(e.target.closest('.cart-item'))
    const sale_name = bike.attr('data-line-item-sale-name')

    this.enableLoading(bike.attr('data-index'))
    

    const components = $(`.cart-items .cart-item[data-line-item-sale-name="${sale_name}"]:not([data-line-item-variant-id="${lineItemVariantId}"]):not([data-line-item-product-id="${bike.attr('data-line-item-product-id')}"])`)
    const all_bikes = $(`.cart-items .cart-item[data-line-item-sale-name="${sale_name}"][data-line-item-product-id="${bike.attr('data-line-item-product-id')}"][data-line-item-variant-id="${lineItemVariantId}"]`)

    // 查找保险产品
    const insurance = $(`.cart-items .cart-item[data-insurance-product-variant-id="${lineItemVariantId}"]`)
    // 如果存在 跟车绑定的保险产品
    if (insurance.length) {
      updates[insurance.attr('data-line-item-variant-id')] = afterQuantity
    }


    let other_bikes_quantity = 0
    all_bikes.each((i, item) => {
      // other_bikes_quantity += Number($(item).attr('data-quantity'))
    })

    // 活动配件
    components.each((i, item) => {
      updates[$(item).attr('data-line-item-variant-id')] = afterQuantity + other_bikes_quantity
    })

    updates[lineItemVariantId] = afterQuantity

    console.log('updates', updates)

    fetch('/cart/update.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': `application/json` },
      body: JSON.stringify({ 
        updates,
        sections: this.getSectionsToRender().map((section) => section.section),
        sections_url: window.location.pathname
      })
    }).then(response => response.json()).then(parsedState => {
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
    }).catch((error) => {
      throw new Error(error);
    }).finally(() => {
      this.disableLoading()
      this.refreshProductCode()
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
