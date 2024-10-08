const selectors = {
  addToCart: '[data-pf-type="ProductBox"] .addToCartBtn',
  form: '[data-pf-type="ProductBox"] .pf-product-form'
}

class InsuranceProduct extends HTMLElement {
  constructor() {
    super();

    this.product = this.querySelector('.js-insurance-product');
    this.entry = this.querySelector('.js-insurance-entry');
    this.mainSelect = this.querySelector('.js-insurance-main-select');
    this.checkbox = this.querySelector('.js-insurance-checkbox');
    this.checkboxesConsent = this.querySelectorAll('.js-insurance-consent');
    this.price = this.querySelector('.js-insurance-price');
    this.descriptions = this.querySelectorAll('.js-insurance-description');
    this.error = this.querySelector('.js-insurance-error');
    this.variantIdField = document.querySelectorAll('.js-insurance-variant-id');
    this.metafields = document.querySelectorAll('.js-insurance-field');
    this.mainVariantSelector = document.querySelector('input[name="id"][data-product-id]');
    this.variantLabels = document.querySelectorAll('[data-option-name] > label');
    this.addToCart = document.querySelector(selectors.addToCart);
    this.variantIdInput = document.querySelector('.js-product-variant-id');
    this.languageCode = document.querySelector('html').getAttribute('lang');
    this.fakeAddToCart = null;
    this.isFormValid = false;
    this.mainSelectCurrentOption = null;

    this.init();
  }

  init() {
    this.handleVisibility();
    this.handleVariantChange();
    this.handleCheckboxConsent();
    this.validateForm();
    this.handleFields('disable');
    this.refreshTermsAndConditionsLinks();
    this.refreshEntryLink();

    this.mainVariantSelector.disabled = true;
    
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.js-fake-add-to-cart')) {
        return;
      }

      event.preventDefault();

      this.fakeAddToCart = event.target.closest('.js-fake-add-to-cart');

      this.validateForm();

      if (!this.checkbox.checked || (this.checkbox.checked && this.isFormValid)) {
        this.addToCart = document.querySelector(`${selectors.addToCart}:not(.js-fake-add-to-cart)`);
        this.addToCart.click();
      }
    });
  }

  validateForm() {
    if (!this.checkbox.checked) {
      return;
    }

    this.isFormValid = true;

    // Show Select Error
    if (this.mainSelect.value == 0) {
      this.isFormValid = false;
      
      // Show error
      const error = this.mainSelect.parentNode.parentNode.querySelector('.js-insurance-error');
      error?.classList.remove('hidden');
    }
    
    // Show Consent Error
    this.checkboxesConsent.forEach(checkbox => {
      if (!checkbox.checked) {
        this.isFormValid = false;
        
        const error = checkbox.parentNode.querySelector('.js-insurance-error');
        // Show error
        checkbox.classList.add('error');
        error?.classList.remove('hidden');
      }
    });
  }

  showCheckboxesConsent() {
    this.checkboxesConsent.forEach(checkbox => {
      checkbox.parentNode.classList.remove('hidden');
    });
  }

  refreshEntryLink() { 
    if (!this.entry) return;
    
    this.entry.querySelectorAll('a').forEach(link => {
      const href = link.getAttribute('href');
      let newHref = href;
      
      // Replace Lang
      if (href.includes('lang=')) {
        const languageIndex = href.indexOf('lang=');
        const currentLanguageQuery = href.substring(languageIndex, languageIndex + 7);
        newHref = newHref.replace(currentLanguageQuery, `lang=${this.languageCode}`);
      }
      
      link.setAttribute('href', newHref);
    });
  }

  refreshTermsAndConditionsLinks() {
    // Replace "Terms and Conditions" links URL with the correct Language code
    this.checkboxesConsent.forEach(checkbox => {
      checkbox.parentNode.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        let newHref = href;

        // Replace Language
        if (href.includes('language=')) {
          const languageIndex = href.indexOf('language=');
          const currentLanguageQuery = href.substring(languageIndex, languageIndex + 11);
          newHref = newHref.replace(currentLanguageQuery, `language=${this.languageCode}`);
        }

        link.setAttribute('href', newHref);
      });
    });
  }

  handleVariantChange() {
    // Insurance Variant Change
    this.mainSelect.addEventListener('change', (event) => {
      this.mainSelectCurrentOption = this.mainSelect.options[this.mainSelect.selectedIndex];
      const variantId = this.mainSelectCurrentOption.dataset.variantId;
      const price = this.mainSelectCurrentOption.dataset.price;

      this.price.textContent = price;
      this.variantIdField.forEach(field => field.value = variantId);
      this.error?.classList.add('hidden');

      this.refreshDescription();
      this.showCheckboxesConsent();
    });

    // Product Variant change
    this.variantLabels.forEach(label => {
      label.addEventListener('click', (event) => {
        // Wait for the main select to get it's value changed
        // Not the greatest solution but it does the job, sorry
        setTimeout(() => {
          const insuranceProductVariantId = document.querySelector('.js-insurance-product-variant-id');
          const variantId = this.mainVariantSelector.value;
          
          this.variantIdInput.value = variantId;
          insuranceProductVariantId.value = variantId;
        }, 100);
      });
    })
  }

  refreshDescription() {
    this.descriptions.forEach((description) => {
      const isHidden = description.getAttribute('id') != this.mainSelectCurrentOption.dataset.id;
      description.classList.toggle('hidden', isHidden);
    });
  }

  handleCheckboxConsent() {
    this.checkboxesConsent.forEach(checkbox => {
      checkbox.addEventListener('change', (event) => {
        if (checkbox.checked) {
          const error = checkbox.parentNode.querySelector('.js-insurance-error');

          error.classList.add('hidden');
          checkbox.classList.add('error');
        }
      });
    });
  }

  handleFields(status = null) {
    if (!status) return;

    switch (status) {
      case 'enable':
        this.product.classList.remove('hidden');
        this.metafields.forEach(field => field.removeAttribute('disabled'));
        return;
      case 'disable':
        this.product.classList.add('hidden');
        this.metafields.forEach(field => field.setAttribute('disabled', ''));
        return;
    }
  }

  handleVisibility() {
    this.checkbox.addEventListener('change', (event) => {      
      if (event.currentTarget.checked) { // Checked
        this.handleFields('enable');
      } else { // Not checked
        this.handleFields('disable');
      }
    });
  }
}

customElements.define('insurance-product', InsuranceProduct);

class Insurance {
  constructor() {
    this.templateInsuranceProduct = document.querySelector('.js-insurance-product-template');
    this.templateInsuranceMetafields = document.querySelector('.js-insurance-metafields-template');
    this.addToCart = document.querySelector(selectors.addToCart);
    this.fakeButton = null;

    if (!this.templateInsuranceProduct || !this.templateInsuranceMetafields) return;
    
    this.init();
  }
  
  init() {
    this.generateFakeAddToCart();
    this.moveInsuranceMetafieldsInPlace();
    this.moveInsuranceProductInPlace();
  }

  moveInsuranceMetafieldsInPlace() {
    const htmlString = this.templateInsuranceMetafields.innerHTML;
    const html = this.createElementFromHTML(htmlString);

    document.querySelector(this.templateInsuranceMetafields.dataset.appendTo).prepend(html);
  }

  generateFakeAddToCart() {
    this.fakeButton = this.addToCart.cloneNode(true);
    this.fakeButton.removeAttribute('data-pf-type');
    this.fakeButton.removeAttribute('onclick');
    this.fakeButton.removeAttribute('id');
    this.fakeButton.classList.add('js-fake-add-to-cart');

    this.insertBefore(this.fakeButton, this.addToCart);
    
    this.addToCart.setAttribute('onclick', 'addToCartInsurance("atc")');
    this.addToCart.classList.add('hidden');
  }
  
  moveInsuranceProductInPlace() {
    const htmlString = this.templateInsuranceProduct.innerHTML;
    const html = this.createElementFromHTML(htmlString);

    if (location.href.includes('urtopia-carbon')) {
      $('.product .buttons').before(html)
    } else {
      this.insertBefore(html, this.fakeButton);
    }
  }
  
  insertBefore(element, selector) {
    const parent = selector.parentNode;

    parent.insertBefore(element, selector); 
  }
  
  createElementFromHTML(htmlString) {
    const div = document.createElement('div');

    div.innerHTML = htmlString.trim();

    return div.firstChild;
  }
}

const insurance = new Insurance();
const url_to_page_map = {
  "/products/urtopia-chord-ebike": 'chord-order-page',
  "/products/urtopia-carbon-e-bike": 'carbon-order-page',
  "/products/outlet-carbon-1-1s": 'outlet-carbon-order-page',
  "/products/outlet-urtopia-chord": 'outlet-chord-order-page',
  "/products/urtopia-fusion-carbon-ebike": 'fusion-order-page',
  '/products/urtopia-carbon-1-pro-ebike': 'carbon1pro-order-page'
}

function addToCartInsurance(parse, show = false) {
  window.show_notification_checkout_button = show

  const cartListNew = {
    // 如果是carbon 页面，自动把配件加进去
    items: []
  }

  $('.product .accessories .items .active').each((i, item) => {
    cartListNew.items.push({ 
      id: $(item).attr('variant-id'), 
      quantity: 1
    })
  })

  // 加埋点
  !show && fetchBuried('websiteclick', location.pathname.split('/').pop(), { button: 'ATC' })

  const cart1New =
    document.querySelector("cart-notification") ||
    document.querySelector("cart-drawer");
  let addingNew = false;
  
  if (addingNew == false) {
    !show && changeAddToCartText(parse,1);
    addingNew = true;

    const form = document.querySelector(selectors.form);
    const formData = new FormData(form);
    
    const item0 = { 
      id: $('input[name="id"]').val(),
      quantity: 1
    }
    
    if (formData.get('items[0]properties[_insurance_variant_id]')) {
      item0.properties = {
        _insurance_variant_id: formData.get('items[0]properties[_insurance_variant_id]'),
      }
    }
    
    // If has insurance product
    if (formData.get('items[1]id')) {
      let item1 = { 
        id: formData.get('items[1]id'), 
        quantity: 1
      }
  
      if (formData.get('items[1]properties[_product_variant_id]') && formData.get('items[1]properties[_product_variant_id]') && formData.get('items[1]properties[_variant_name]')) {
        item1.properties = {
          _product_variant_id: $('input[name="id"]').val(),
          _model: formData.get('items[1]properties[_model]'),
          _variant_name: formData.get('items[1]properties[_variant_name]'),
        }
      }

      cartListNew.items.push(item1);
    }
    
    cartListNew.items.push(item0);

    if(cart1New){
      const sections = cart1New.getSectionsToRender().map((section) => section.id);
    	cartListNew.sections = sections.join(",");
    }
    
    fetch("/cart/add.js", {
      method: "POST",
      body: JSON.stringify(cartListNew), // formData
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((res1) => {
      res1.key = "";

      if (res1.message && res1.status) {
        $('.product .js-fake-add-to-cart').before('<span style="color:red;" class="error-tip u14Medium_v2">Your order quantity has reached our stock limit</span>')
        fetchBuried('error', 'addtocard-error', res1)

        setTimeout(() => {
          $('.product .buttons .error-tip').remove()
        }, 8000)

        return !show && changeAddToCartText(parse, 0);
      }



      if (parse=="buynow") {
        window.location.href="/checkout"
      } else {
        // Swap items' places
        function swapElements(arr, i1, i2) {
          arr[i1] = arr.splice(i2, 1, arr[i1])[0];
        }
        
        if (res1.items.length == 2) {
          swapElements(res1.items, 0, 1);
        }
        cart1New.classList.contains('is-empty') && cart1New.classList.remove('is-empty');
        
        cart1New.renderContents(res1);
        !show && changeAddToCartText(parse, 0);
      }
    })
    .catch((err) => {
      
    });
  }
}