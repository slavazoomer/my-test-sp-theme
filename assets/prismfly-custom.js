//sticky filters script
if(window.location.href.includes('collection')){
    function checkForElement(selector, callback) {
        const maxDuration = 10000;
        const intervalDuration = 500;
        let elapsedTime = 0;
    
        const interval = setInterval(() => {
            const elem = document.querySelector(selector);
            if (elem) {
                clearInterval(interval);
                callback(elem);
            }
            elapsedTime += intervalDuration;
            if (elapsedTime >= maxDuration) {
                clearInterval(interval);
            }
        }, intervalDuration);
    }
    
    window.addEventListener('load', () => {
        checkForElement('.usf-facets__body', (facetsBodyElem) => {
            const applyFacetsBodyStyle = (applyStyles) => {
                if (applyStyles) {
                    facetsBodyElem.style.cssText = `
                        position: fixed;
                        z-index: 99;
                        top: 96px;
                        background-color: #fff;
                        width: 100%;
                        left: 0;
                        padding-left: 42px;
                        padding-right: 42px;
                    `;
                } else {
                    facetsBodyElem.style.cssText = '';
                }
            };
    
            if (window.matchMedia('(min-width: 750px)').matches) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        applyFacetsBodyStyle(!entry.isIntersecting);
                    });
                }, { threshold: [0.1] });
    
                const filtersElem = document.querySelector('.usf-sr-filters');
                if (filtersElem) observer.observe(filtersElem);
            }
    
            window.addEventListener('resize', () => {
                if (window.matchMedia('(min-width: 750px)').matches) {
                } else {
                    applyFacetsBodyStyle(false);
                }
            });
        });
    
        checkForElement('.usf-sr-config__mobile-filters-wrapper', (stickyElem) => {
            const observeElem = document.querySelector('.usf-sr-config');
            let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            let isElementSticky = false;
    
            if (window.innerWidth <= 749) {
                const observers = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            isElementSticky = !entry.isIntersecting;
                            adjustStickyElementStyle();
                        });
                    },
                    { threshold: 0 }
                );
                if (observeElem) observers.observe(observeElem);
    
                const adjustStickyElementStyle = () => {
                    let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    if (isElementSticky) {
                        if (currentScrollTop > lastScrollTop) {
                            stickyElem.style.cssText = `
                                position: fixed;
                                z-index: 99;
                                top: 0;
                                width: 100%;
                                background-color: #fff;
                                left: 0;
                            `;
                        } else {
                            stickyElem.style.cssText = `
                                position: fixed;
                                z-index: 99;
                                top: 60px;
                                width: 100%;
                                background-color: #fff;
                                left: 0;
                            `;
                        }
                    } else {
                        stickyElem.style.cssText = '';
                    }
                    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
                };
    
                window.addEventListener('scroll', adjustStickyElementStyle, false);
            }
        });
    });
    


}
