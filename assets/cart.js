class CartRemoveButton extends HTMLElement {
  constructor() {
    super();

    this.addEventListener('click', event => {
      const cartItems = this.closest('cart-items') || this.closest('cart-drawer-items');
      
      cartItems.onCartChange(event)
    })


    /*
    this.addEventListener('click', (event) => {
      console.log('event', event)
      event.preventDefault();
      const cartItems = this.closest('cart-items') || this.closest('cart-drawer-items');

      const lineItem = this.closest('[data-line-item]');
      const lineId = lineItem.dataset.lineItemVariantId;
      const insuranceId = lineItem.dataset.insuranceVariantId;

      const pruduct_id = lineItem.dataset.lineItemProductId
      const quantity = lineItem.dataset.quantity
      const index = lineItem.dataset.lineItem
      console.log('pruduct_id', pruduct_id)

        // 如果是carbon one 单车
      if (pruduct_id === global_config.event_bike_product_id) {
        return cartItems.updateCarbonOneWithComponents(event, lineId, parseInt(quantity), 0)
      }

      // Remove the Product and it's Insurance product
      if (insuranceId) {
        cartItems.removeInsuranceProducts(event, lineId, insuranceId);
      } else {
        cartItems.updateQuantity(this.dataset.index, 0,"","remove");//更改
      }
    });
    */
  }
}

customElements.define('cart-remove-button', CartRemoveButton);


class CartItems extends HTMLElement {
  constructor() {
    super();
    this.lineItemStatusElement = document.getElementById('shopping-cart-line-item-status') || document.getElementById('CartDrawer-LineItemStatus');
    this.currentItemCount = Array.from(this.querySelectorAll('[name="updates[]"]'))
      .reduce((total, quantityInput) => total + parseInt(quantityInput.value), 0);
    this.debouncedOnChange = debounce((event) => {
      this.onChange(event);
    }, 300);

    this.addEventListener('change', this.debouncedOnChange.bind(this));
  }

  onCartChange (event) {
    // 查找当前行
    const line_item = $(event.target.closest('.cart-item'))

    const product_id = line_item.attr('data-line-item-product-id')
    const variant_id = line_item.attr('data-line-item-variant-id')

    const quantity = parseInt(line_item.attr('data-quantity'))
    // 如果 target value 有值，是onchange , 否则 onremove
    const to_quantity = event.target.value ? parseInt(event.target.value) : 0

    const index = parseInt(line_item.attr('data-index'))
    const sale_name = line_item.attr('data-line-item-sale-name')

    console.log(variant_id, sale_name, index, quantity, to_quantity)

    // 数量变动
    const quantity_arr = []

    // 查找保险产品
    const insurance = $(`.cart-items .cart-item[data-insurance-product-variant-id="${variant_id}"][data-index="${index + 1}"]`)

    console.log('insurance', insurance)

    // 如果是带活动产品
    if (sale_name) {
      const sale_components = $(`.cart-items .cart-item[data-line-item-sale-name="${sale_name}"]:not([data-line-item-variant-id="${variant_id}"]):not([data-line-item-product-id="${product_id}"])`)
      const sale_bikes = $(`.cart-items .cart-item[data-line-item-sale-name="${sale_name}"][data-line-item-product-id="${product_id}"]`)

      // 计算车总数
      let count = 0
      // 遍历活动车
      sale_bikes.each((i, item) => {
        if (item === line_item[0]) {
          count += quantity
        } else {
          count += parseInt($(item).attr('data-quantity'))
        }      
      })

      // 活动配件
      sale_components.each((i, item) => {
        quantity_arr[$(item).attr('data-index') - 1] = (count - quantity) + to_quantity
      })

    }

    // 如果当前车variant 存在保险
    if (insurance.length === 1) {
      quantity_arr[insurance.attr('data-index') - 1] = to_quantity
    }

    // 修改产品本身 quantity
    quantity_arr[index - 1] = to_quantity

    // batch update quantity
    $(`.cart-items .cart-item`).each((index, item) => {
      if (quantity_arr[index] === undefined) {
        quantity_arr[index] = parseInt($(item).attr('data-quantity'))
      }
    })

    

    console.log('quantity_arr', quantity_arr)

    event.preventDefault();
  }

  updateCarbonOneWithComponents (currentIndex, lineItemVariantId, beforeQuantity, afterQuantity) {
    console.log('beforeQuantity', beforeQuantity)
    console.log('afterQuantity', afterQuantity)

    const updates = {}
    // 
    const bike = $(`.cart-items .cart-item[data-line-item-variant-id="${lineItemVariantId}"]`)
    const sale_name = bike.attr('data-line-item-sale-name')
    

    const components = $(`.cart-items .cart-item[data-line-item-sale-name="${sale_name}"]:not([data-line-item-variant-id="${lineItemVariantId}"]):not([data-line-item-product-id="${bike.attr('data-line-item-product-id')}"])`)
    const other_bikes = $(`.cart-items .cart-item[data-line-item-sale-name="${sale_name}"][data-line-item-product-id="${bike.attr('data-line-item-product-id')}"]:not([data-line-item-variant-id="${lineItemVariantId}"])`)

    // 查找保险产品
    const insurance = $(`.cart-items .cart-item[data-insurance-product-variant-id="${lineItemVariantId}"]`)
    // 如果存在 跟车绑定的保险产品
    if (insurance.length) {
      updates[insurance.attr('data-line-item-variant-id')] = afterQuantity
    }


    let other_bikes_quantity = 0
    other_bikes.each((i, item) => {
      other_bikes_quantity += Number($(item).attr('data-quantity'))
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
      body: JSON.stringify({ updates })
    }).then(response => response.json()).then(data => {
      location.reload(true);

      return data
    }).catch((error) => {
      throw new Error(error);
    });

    // this.disableLoading(index);
  }

  removeInsuranceProducts(event, lineItemId, insuranceId) {
    const items = document.querySelectorAll('.cart-items [data-cart-item]');
    let itemsQuantityArray = [];

    items.forEach(item => {
      if (item.dataset.lineItemVariantId == lineItemId && item.dataset.insuranceVariantId == insuranceId) { // is main product with insurance
        itemsQuantityArray.push(0);
      } else if (item.dataset.lineItemVariantId == insuranceId && item.dataset.insuranceProductVariantId == lineItemId) { // is the insurance
        itemsQuantityArray.push(0);
      } else { // is everything else
        itemsQuantityArray.push(parseInt(item.dataset.quantity));
      }
    });

    const formData = {
      updates: itemsQuantityArray
    }

    let info = fetch('/cart/update.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': `application/json` },
      body: JSON.stringify(formData)
    }).then(response => response.json()).then(data => {
      location.reload(true);

      return data
    }).catch((error) => {
      throw new Error(error);
    });
  }

  onChange(event, ...a) {
    const lineItem = event.target.closest('[data-line-item]');
    const lineId = lineItem.dataset.lineItemVariantId;
    const pruduct_id = lineItem.dataset.lineItemProductId
    const quantity = lineItem.dataset.quantity
    const index = lineItem.dataset.lineItem
    console.log('pruduct_id', pruduct_id)


    if (pruduct_id === global_config.event_bike_product_id) {
        return this.updateCarbonOneWithComponents(event, lineId, parseInt(quantity), parseInt(event.target.value));
    }
    
    ////购物车逻辑
   /* var data = event.target.dataset;
   if(data.type && data.type.indexOf("Carbon One")>-1)
   {
     var discountTitle = data.discount;
     var accessoriesNum = {hNum:Number(data.hnum),gNum:Number(data.gnum),kNum:Number(data.knum),mNum:Number(data.mnum),wNum:Number(data.wnum),bNum:Number(data.bnum),bikeID:data.id}
     this.updateQuantityLabour(data.index, event.target.value, document.activeElement.getAttribute('name'),accessoriesNum,discountTitle);
   }
      
   else{*/
      this.updateQuantity(event.target.dataset.index, event.target.value, document.activeElement.getAttribute('name'));
    //}
  }
  getSectionsToRender() {
    return [
      {
        id: 'main-cart-items',
        section: document.getElementById('main-cart-items').dataset.id,
        selector: '.js-contents',
      },
      {
        id: 'cart-icon-bubble',
        section: 'cart-icon-bubble',
        selector: '.shopify-section'
      },
      {
        id: 'cart-live-region-text',
        section: 'cart-live-region-text',
        selector: '.shopify-section'
      },
      {
        id: 'main-cart-footer',
        section: document.getElementById('main-cart-footer').dataset.id,
        selector: '.js-contents',
      }
    ];
  }
  //labour 活动
  
  updateQuantityLabour(line,quantity,name,allQuantity,actName){
    this.enableLoading(line);
    var num = quantity - allQuantity.bNum;
    var updates={};
    /*
    if(actName=="Christmas Sale Plan 1")
    {
      updates["43548507373784"]=allQuantity.hNum+num;
    }else if(actName=="Christmas Sale Plan 2"){
    updates["42615024713944"]=allQuantity.kNum+num;
    updates["42615024550104"]=allQuantity.wNum+num;
    updates["42615024976088"]=allQuantity.mNum+num;
  }*/
  updates["43502341095640"]=allQuantity.hNum+num;
  updates["43565513834712"]=allQuantity.gNum+num;
    //updates["43502341095640"]=allQuantity.hNum+num;
    updates[allQuantity.bikeID]=quantity;
    const body = JSON.stringify({
      updates:updates,
      sections: this.getSectionsToRender().map((section) => section.section),
      sections_url: window.location.pathname
    });
    fetch(`${routes.cart_update_url}`, {...fetchConfig(), ...{ body }})
      .then((response) => {
        return response.text();
      })
      .then((state) => {
        const parsedState = JSON.parse(state);
        this.classList.toggle('is-empty', parsedState.item_count === 0);
        const cartDrawerWrapper = document.querySelector('cart-drawer');
        const cartFooter = document.getElementById('main-cart-footer');

        if (cartFooter) cartFooter.classList.toggle('is-empty', parsedState.item_count === 0);
        if (cartDrawerWrapper) cartDrawerWrapper.classList.toggle('is-empty', parsedState.item_count === 0);

        this.getSectionsToRender().forEach((section => {
          const elementToReplace =
            document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);
          elementToReplace.innerHTML =
            this.getSectionInnerHTML(parsedState.sections[section.section], section.selector);
        }));

        this.updateLiveRegions(line, parsedState.item_count);
        const lineItem =  document.getElementById(`CartItem-${line}`) || document.getElementById(`CartDrawer-Item-${line}`);
        if (lineItem && lineItem.querySelector(`[name="${name}"]`)) {
          cartDrawerWrapper ? trapFocus(cartDrawerWrapper, lineItem.querySelector(`[name="${name}"]`)) : lineItem.querySelector(`[name="${name}"]`).focus();
        } else if (parsedState.item_count === 0 && cartDrawerWrapper) {
          trapFocus(cartDrawerWrapper.querySelector('.drawer__inner-empty'), cartDrawerWrapper.querySelector('a'))
        } else if (document.querySelector('.cart-item') && cartDrawerWrapper) {
          trapFocus(cartDrawerWrapper, document.querySelector('.cart-item__name'))
        }
        this.disableLoading();
      }).catch(() => {
        this.querySelectorAll('.loading-overlay').forEach((overlay) => overlay.classList.add('hidden'));
        const errors = document.getElementById('cart-errors') || document.getElementById('CartDrawer-CartErrors');
        errors.textContent = window.cartStrings.error;
        this.disableLoading();
      });
  }
  //
  updateQuantity(line, quantity, name,type) {
    this.enableLoading(line);

    const body = JSON.stringify({
      line,
      quantity,
      sections: this.getSectionsToRender().map((section) => section.section),
      sections_url: window.location.pathname
    });
    fetch(`${routes.cart_change_url}`, {...fetchConfig(), ...{ body }})
      .then((response) => {
        return response.text();
      })
      .then((state) => {
        const parsedState = JSON.parse(state);
        this.classList.toggle('is-empty', parsedState.item_count === 0);
        const cartDrawerWrapper = document.querySelector('cart-drawer');
        const cartFooter = document.getElementById('main-cart-footer');

        if (cartFooter) cartFooter.classList.toggle('is-empty', parsedState.item_count === 0);
        if (cartDrawerWrapper) cartDrawerWrapper.classList.toggle('is-empty', parsedState.item_count === 0);

        this.getSectionsToRender().forEach((section => {
          const elementToReplace =
            document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);
          elementToReplace.innerHTML =
            this.getSectionInnerHTML(parsedState.sections[section.section], section.selector);
        }));

        this.updateLiveRegions(line, parsedState.item_count,type);//更改
        const lineItem =  document.getElementById(`CartItem-${line}`) || document.getElementById(`CartDrawer-Item-${line}`);
        if (lineItem && lineItem.querySelector(`[name="${name}"]`)) {
          cartDrawerWrapper ? trapFocus(cartDrawerWrapper, lineItem.querySelector(`[name="${name}"]`)) : lineItem.querySelector(`[name="${name}"]`).focus();
        } else if (parsedState.item_count === 0 && cartDrawerWrapper) {
          trapFocus(cartDrawerWrapper.querySelector('.drawer__inner-empty'), cartDrawerWrapper.querySelector('a'))
        } else if (document.querySelector('.cart-item') && cartDrawerWrapper) {
          trapFocus(cartDrawerWrapper, document.querySelector('.cart-item__name'))
        }
        this.disableLoading();
      }).catch(() => {
        this.querySelectorAll('.loading-overlay').forEach((overlay) => overlay.classList.add('hidden'));
        const errors = document.getElementById('cart-errors') || document.getElementById('CartDrawer-CartErrors');
        errors.textContent = window.cartStrings.error;
        this.disableLoading();
      }).finally(refreshProductCode);
  }

  updateLiveRegions(line, itemCount,type) {
    if(type=="remove")return;//更改
    if (this.currentItemCount === itemCount) {
      const lineItemError = document.getElementById(`Line-item-error-${line}`) || document.getElementById(`CartDrawer-LineItemError-${line}`);
      const quantityElement = document.getElementById(`Quantity-${line}`) || document.getElementById(`Drawer-quantity-${line}`);

      lineItemError
        .querySelector('.cart-item__error-text')
        .innerHTML = window.cartStrings.quantityError.replace(
          '[quantity]',
          quantityElement.value
        );
    }

    this.currentItemCount = itemCount;
    this.lineItemStatusElement.setAttribute('aria-hidden', true);

    const cartStatus = document.getElementById('cart-live-region-text') || document.getElementById('CartDrawer-LiveRegionText');
    cartStatus.setAttribute('aria-hidden', false);

    setTimeout(() => {
      cartStatus.setAttribute('aria-hidden', true);
    }, 1000);
  }

  getSectionInnerHTML(html, selector) {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).innerHTML;
  }

  enableLoading(line) {
    const mainCartItems = document.getElementById('main-cart-items') || document.getElementById('CartDrawer-CartItems');
    mainCartItems.classList.add('cart__items--disabled');

    const cartItemElements = this.querySelectorAll(`#CartItem-${line} .loading-overlay`);
    const cartDrawerItemElements = this.querySelectorAll(`#CartDrawer-Item-${line} .loading-overlay`);

    [...cartItemElements, ...cartDrawerItemElements].forEach((overlay) => overlay.classList.remove('hidden'));

    document.activeElement.blur();
    this.lineItemStatusElement.setAttribute('aria-hidden', false);
  }

  disableLoading() {
    const mainCartItems = document.getElementById('main-cart-items') || document.getElementById('CartDrawer-CartItems');
    mainCartItems.classList.remove('cart__items--disabled');
  }
}

customElements.define('cart-items', CartItems);

if (!customElements.get('cart-note')) {
  customElements.define('cart-note', class CartNote extends HTMLElement {
    constructor() {
      super();

      this.addEventListener('change', debounce((event) => {
        const body = JSON.stringify({ note: event.target.value });
        fetch(`${routes.cart_update_url}`, {...fetchConfig(), ...{ body }});
      }, 300))
    }
  });
};
