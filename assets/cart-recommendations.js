class CartRecommendations extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    new IntersectionObserver(this.handleIntersection.bind(this)).observe(this);
  }

  handleIntersection(entries, observer) {
    if (!entries[0].isIntersecting) return;
    observer.unobserve(this);
    
    fetch(this.dataset.url)
      .then(response => response.text())
      .then(text => {
        
        const html = document.createElement('div');
        html.innerHTML = text;
        let recommendations = html.querySelector('cart-recommendations');
        let runSlider = false;
        if(this.classList.contains('growthbook-cart-recommendations')){
          recommendations = html.querySelector('cart-recommendations.growthbook-cart-recommendations')
          runSlider = true;
        }
        if (recommendations && recommendations.innerHTML.trim().length) {
          this.innerHTML = recommendations.innerHTML;
        }
        if(runSlider){
          if(document.querySelector('cart-recommendations.growthbook-cart-recommendations .mini-cart__navigation')){
            const cartDrawerFlickity = new Flickity(document.querySelector('cart-recommendations.growthbook-cart-recommendations .mini-cart__navigation'), {
              accessibility: false,
              prevNextButtons: false,
              wrapAround: false,
              pageDots: false,
              prevNextArrows: false,
              contain: true
            })
            document.querySelector('cart-recommendations.growthbook-cart-recommendations .mini-cart__navigation .flickity-slider').style.transform = "translateX(0)";
          }

        }
      })
      .catch(e => {
        console.error(e);
      });

  }
}
customElements.define('cart-recommendations', CartRecommendations);
