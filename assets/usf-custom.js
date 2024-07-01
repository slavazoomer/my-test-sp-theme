// define templates for the Be Yours-RoarTheme-6.7.0 theme

var _usfImageWidths;
var _usfFilesUrl;
var _usfShowSwatch;
var _usfShowVendor;
var _usfProductPrice = `
<div ref="usf-price" class="price" :class="{'price--sold-out': isSoldOut,'price--on-sale': !isSoldOut && hasDiscount && (!(priceVaries && !product.selectedVariantId) || (minPrice > minDiscountedPrice))}">
    <dl>
        <div class="price__regular">
            <dt>
                <span class="visually-hidden visually-hidden--inline">Regular price</span>
            </dt>
            <dd>
                <span v-if="priceVaries && !product.selectedVariantId" class="price-item price-item--regular">
                    <template v-if="hasDiscount && (!(priceVaries && !product.selectedVariantId) || (minPrice > minDiscountedPrice))">
                        <span v-html="loc.from"></span>
                        <price-money><bdi v-html="displayMinDiscountedPrice"></bdi></price-money>
                    </template>
                    <template v-else>
                        <price-money><bdi v-html="displayMinDiscountedPrice"></bdi></price-money>
                        <price-money><bdi v-html="displayMaxDiscountedPrice"></bdi></price-money>
                    </template>
                </span>
                <span v-else class="price-item price-item--regular">
                    <price-money><bdi v-html="displayDiscountedPrice"></bdi></price-money>
                </span>
            </dd>
        </div>
        <div class="price__sale">
            <template>
                <dt class="price__compare">
                    <span class="visually-hidden visually-hidden--inline">Regular price</span>
                </dt>
                <dd class="price__compare">
                    <s class="price-item price-item--regular">
                        <price-money><bdi v-html="displayPrice"></bdi></price-money>
                    </s>
                </dd>
            </template>
            <dt>
                <span class="visually-hidden visually-hidden--inline">Sale price</span>
            </dt>
            <dd>
                <span v-if="priceVaries && !product.selectedVariantId" class="price-item price-item--sale">
                    <template v-if="hasDiscount && (!(priceVaries && !product.selectedVariantId) || (minPrice > minDiscountedPrice))">
                        <span v-html="loc.from"></span>
                        <price-money><bdi v-html="displayMinDiscountedPrice"></bdi></price-money>
                    </template>
                    <template v-else>
                        <price-money><bdi v-html="displayMinDiscountedPrice"></bdi></price-money>
                        <price-money><bdi v-html="displayMaxDiscountedPrice"></bdi></price-money>
                    </template>
                </span>
                <span v-else class="price-item price-item--sale">
                    <price-money><bdi v-html="displayDiscountedPrice"></bdi></price-money>
                </span>
            </dd>
        </div>
    </dl>
</div>`;
var _usfFilterBodyTemplate = /*inc_begin_filter-body*/
`<!-- Range filter -->
<div v-if="isRange" class="usf-facet-values usf-facet-range">
    <!-- Range inputs -->
    <div class="usf-slider-inputs usf-clear">
        <span class="usf-slider-input__from">
            <span class="usf-slider-input__prefix" v-html="facet.sliderPrefix" v-if="facet.showSliderInputPrefixSuffix"></span>
            <input :readonly="!hasRangeInputs" :value="rangeConverter(range[0]).toFixed(rangeDecimals)" @change="e => onRangeInput(e, range[0], 0)">
            <span class="usf-slider-input__suffix" v-html="facet.sliderSuffix" v-if="facet.showSliderInputPrefixSuffix"></span>
        </span>
        <span class="usf-slider-div">-</span>
        <span class="usf-slider-input__to">
            <span class="usf-slider-input__prefix" v-html="facet.sliderPrefix" v-if="facet.showSliderInputPrefixSuffix"></span>
            <input :readonly="!hasRangeInputs" :value="rangeConverter(range[1]).toFixed(rangeDecimals)" @change="e => onRangeInput(e, range[1], 1)">
            <span class="usf-slider-input__suffix" v-html="facet.sliderSuffix" v-if="facet.showSliderInputPrefixSuffix"></span>
        </span>
    </div>
	<!-- See API reference of this component at https://docs.sobooster.com/search/storefront-js-api/slider-component -->
    <usf-slider :color="facet.sliderColor" :symbols="facet.sliderValueSymbols" :prefix="facet.sliderPrefix" :suffix="facet.sliderSuffix" :min="facet.min" :max="facet.max" :pips="facet.range[0]" :step="facet.range[1]" :decimals="rangeDecimals" :value="range" :converter="rangeConverter" @input="onRangeSliderInput" @change="onRangeSliderChange"></usf-slider>
</div>
<!-- List + Swatch filter -->
<div v-else ref="values" :class="'usf-facet-values usf-scrollbar usf-facet-values--' + facet.display + (facet.navigationCollections ? ' usf-navigation' : '') + (facet.valuesTransformation ? (' usf-' + facet.valuesTransformation.toLowerCase()) : '') + (facet.circleSwatch ? ' usf-facet-values--circle' : '')" :style="!usf.isMobileFilter && facet.maxHeight ? { maxHeight: facet.maxHeight } : null">
    <!-- Filter options -->                
    <usf-filter-option v-for="o in visibleOptions" :facet="facet" :option="o" :key="o.label"></usf-filter-option>
</div>

<!-- More -->
<div v-if="isMoreVisible" class="usf-more" @click="onShowMore" v-html="loc.more"></div>`
/*inc_end_filter-body*/;

var _usfSearchResultsSkeletonItemTpl = /*inc_begin_search-skeleton-item*/
`<div v-if="view === 'grid'" class="usf-sr-product usf-skeleton">
    <div class="usf-img"></div>
    <div class="usf-meta"></div>
</div>
<div class="usf-sr-product usf-skeleton" v-else>
    <!-- Image column -->
    <div class="usf-img-column">
        <div class="usf-img"></div>
    </div>

    <!-- Info column -->
    <div class="usf-info-column">
        <div class="usf-title"></div>
        <div class="usf-vendor"></div>
        <div class="usf-price-wrapper"></div>
    </div>
</div>`
/*inc_end_search-skeleton-item*/;

var _usfSearchResultsSummaryTpl = /*inc_begin_search-summary*/
`<span class="usf-sr-summary" v-html="loader === true ? '&nbsp;' : usf.utils.format(term ? loc.productSearchResultWithTermSummary : loc.productSearchResultSummary, result.total, usf.utils.encodeHtml(term))"></span>`
/*inc_end_search-summary*/;

var _usfSearchResultsViewsTpl = 
`<layout-switcher class="small-hide">
<ul class="list-unstyled list-view" role="list">
    <li>
        <button type="button" class="list-view__item" data-layout-mode="grid-2" :class="{'list-view__item--active': productPerRow == 2}" @click.prevent.stop="onNewGridViewClick(2)">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="icon icon-grid-2" fill="none" viewBox="0 0 25 20" stroke-miterlimit="10">
                    <line x1="1" y1="6.8" x2="5.6" y2="6.8"></line>
                    <line x1="6.1" y1="1.7" x2="6.1" y2="6.3"></line>
                    <line x1="12.5" y1="1.7" x2="12.5" y2="6.3"></line>
                    <line x1="19" y1="1.7" x2="19" y2="6.3"></line>
                    <line x1="6.1" y1="13.7" x2="6.1" y2="18.3"></line>
                    <line x1="12.5" y1="13.7" x2="12.5" y2="18.3"></line>
                    <line x1="19" y1="13.7" x2="19" y2="18.3"></line>
                    <line x1="1" y1="13.3" x2="5.6" y2="13.3"></line>
                    <line x1="19.5" y1="6.8" x2="24" y2="6.8"></line>
                    <line x1="19" y1="13.3" x2="24" y2="13.3"></line>
                    <rect x="6.1" y="6.8" width="6.5" height="6.5" stroke="currentColor"></rect>
                    <rect x="12.5" y="6.8" width="6.5" height="6.5" stroke="currentColor"></rect>
                </svg>
                <i>2</i>
            </span>
        </button>
    </li>
    <li>
        <button type="button" class="list-view__item" data-layout-mode="grid-3" :class="{'list-view__item--active': productPerRow == 3}" @click.prevent.stop="onNewGridViewClick(3)">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="icon icon-grid-3" fill="none" viewBox="0 0 32 20" stroke-miterlimit="10">
                    <line x1="1.3" y1="6.8" x2="5.8" y2="6.8"></line>
                    <line x1="1.3" y1="13.3" x2="5.8" y2="13.3"></line>
                    <line x1="6.3" y1="1.7" x2="6.3" y2="6.3"></line>
                    <line x1="12.8" y1="1.7" x2="12.8" y2="6.3"></line>
                    <line x1="19.2" y1="1.7" x2="19.2" y2="6.3"></line>
                    <line x1="25.7" y1="1.7" x2="25.7" y2="6.3"></line>
                    <line x1="6.3" y1="13.7" x2="6.3" y2="18.3"></line>
                    <line x1="12.8" y1="13.7" x2="12.8" y2="18.3"></line>
                    <line x1="19.2" y1="13.7" x2="19.2" y2="18.3"></line>
                    <line x1="25.7" y1="13.7" x2="25.7" y2="18.3"></line>
                    <line x1="26.2" y1="6.8" x2="30.7" y2="6.8"></line>
                    <line x1="26.2" y1="13.3" x2="30.7" y2="13.3"></line>
                    <rect x="6.3" y="6.8" width="6.5" height="6.5" stroke="currentColor"></rect>
                    <rect x="12.8" y="6.8" width="6.5" height="6.5" stroke="currentColor"></rect>
                    <rect x="19.2" y="6.8" width="6.5" height="6.5" stroke="currentColor"></rect>
                </svg>
                <i>3</i>
            </span>
        </button>
    </li>
    <li>
        <button type="button" class="list-view__item" :class="{'list-view__item--active': productPerRow == 4}" data-layout-mode="grid-4" @click.prevent.stop="onNewGridViewClick(4)">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="icon icon-grid-4" fill="none" viewBox="0 0 39 20" stroke-miterlimit="10">
                    <line x1="1.5" y1="6.8" x2="6" y2="6.8"></line>
                    <line x1="1.5" y1="13.3" x2="6" y2="13.3"></line>
                    <line x1="6.5" y1="1.7" x2="6.5" y2="6.3"></line>
                    <line x1="13" y1="1.7" x2="13" y2="6.3"></line>
                    <line x1="19.5" y1="1.7" x2="19.5" y2="6.3"></line>
                    <line x1="26" y1="1.7" x2="26" y2="6.3"></line>
                    <line x1="32.5" y1="1.7" x2="32.5" y2="6.3"></line>
                    <line x1="6.5" y1="13.7" x2="6.5" y2="18.3"></line>
                    <line x1="13" y1="13.7" x2="13" y2="18.3"></line>
                    <line x1="19.5" y1="13.7" x2="19.5" y2="18.3"></line>
                    <line x1="26" y1="13.7" x2="26" y2="18.3"></line>
                    <line x1="32.5" y1="13.7" x2="32.5" y2="18.3"></line>
                    <line x1="33" y1="6.8" x2="37.5" y2="6.8"></line>
                    <line x1="33" y1="13.3" x2="37.5" y2="13.3"></line>
                    <rect x="6.5" y="6.8" width="6.5" height="6.5" stroke="currentColor"></rect>
                    <rect x="13" y="6.8" width="6.5" height="6.5" stroke="currentColor"></rect>
                    <rect x="19.5" y="6.8" width="6.5" height="6.5" stroke="currentColor"></rect>
                    <rect x="26" y="6.8" width="6.5" height="6.5" stroke="currentColor"></rect>
                </svg>
                <i>4</i>
            </span>
        </button>
    </li>
</ul>
</layout-switcher>`
;

var _usfSearchResultsSortByTpl = /*inc_begin_search-sortby*/
`<usf-dropdown :placeholder="loc.sort" :value="sortBy" :options="sortByOptions" @input="onSortByChanged"></usf-dropdown>`
/*inc_end_search-sortby*/;

usf.templates = {
    // application
    app: 
`<div id="usf_container" class="usf-zone usf-clear" :class="{'usf-filters-horz': usf.settings.filters.horz}">
    <template v-if="hasFilters">
        <usf-new-filters class="usf-sr-filters"></usf-new-filters>
    </template>
    <usf-new-sr></usf-new-sr>
</div>`
,

    // search results
    searchResults: `
<div class="usf-sr-container" :class="{'usf-no-facets': noFacets, 'usf-empty': !loader && !hasResults, 'usf-nosearch': !showSearchBox}">
    <!-- Search form -->
    <form v-if="showSearchBox" action="/search" method="get" role="search" class="usf-sr-inputbox">
        <button type="submit" class="usf-icon usf-icon-search usf-btn"></button>
        <input name="q" autocomplete="off" ref="searchInput" v-model="termModel">
        <button v-if="termModel" class="usf-remove usf-btn" @click.prevent.stop="clearSearch"></button>
    </form>

    <div class="usf-sr-config" v-if="usf.isMobile">
        <div class="usf-sr-config__mobile-filters-wrapper">
            <div class="usf-filters" :class="{'usf-has-filters': !!facetFilters}" @click="onMobileToggle">
                <button class="usf-btn" v-html="loc.filters"></button>
            </div>
            ` + _usfSearchResultsSortByTpl + `
        </div>
        
        ` + _usfSearchResultsSummaryTpl + _usfSearchResultsViewsTpl + `
    </div>
    <div class="usf-sr-config" v-else>
        ` + _usfSearchResultsViewsTpl + _usfSearchResultsSummaryTpl + _usfSearchResultsSortByTpl + `
    </div>

    <usf-sr-banner v-if="result && result.extra && result.extra.banner && !result.extra.banner.isBottom" :banner="result.extra.banner"></usf-sr-banner>

    <!-- Load previous -->
    <div id="usf-sr-top-loader" :class="{'usf-with-loader':loader === 'prev'}" v-if="(loader === 'prev' || itemsOffset) && loader !== true && hasResults && usf.settings.search.more !== 'page'"></div>
    <ul  :class="gridWrapClass + \' usf-results usf-clear usf-\' + view" >
        <template v-if="0 || loader===true">` + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl +
        `</template>
        <template v-else>
            <template v-if="hasResults">
                <template v-for="(p,index) in result.items">
                    <usf-new-griditem :pIndex="index" :product="p" :result="result" :key="p.id"></usf-new-griditem>
                </template>
            </template>
            <template v-else>
                <!-- Empty result -->
                <div class="usf-sr-empty">
                    <div class="usf-icon"></div>
                    <span v-html="term ? usf.utils.format(loc.productSearchNoResults, term) : loc.productSearchNoResultsEmptyTerm"></span>
                    <button v-if="facetFilters" class="usf-btn usf-btn-action" v-html="loc.clearAllFilters" @click="usf.queryRewriter.removeAllFacetFilters"></button>
                </div>
            </template>
        </template>
    </ul>

    <usf-sr-banner v-if="result && result.extra && result.extra.banner && result.extra.banner.isBottom" :banner="result.extra.banner"></usf-sr-banner>

    <!-- Paging & load more -->
    <div class="usf-sr-paging" v-if="loader !== true">
        <div class="usf-sr-more" v-if="hasResults && usf.settings.search.more === 'more'">
            <div class="usf-title" v-html="usf.utils.format(loc.youHaveViewed, itemsLoaded, result.total)"></div>
            <div class="usf-progress">
                <div :style="{width: (itemsLoaded * 100 / result.total) + '%'}"></div>
            </div>
            <button v-if="itemsLoaded < result.total" class="usf-load-more" :class="{'usf-with-loader': loader === 'more'}" @click="onLoadMore"><span v-html="loc.loadMore"></span></button>
        </div>
        <usf-sr-pages v-else-if="hasResults && usf.settings.search.more === 'page'" :page="page" :pages-total="pagesTotal" :pages-to-display="4" :side-pages-to-display="1"></usf-sr-pages>
        <div class="usf-sr-loader usf-with-loader" v-else-if="loader === 'more'"></div>
    </div>
</div>
`,
    // Grid view item
    searchResultsGridViewItem: `
<li class="usf-sr-product grid__item" :data-usf-pid="product.id">
    <div class="card-wrapper" @click="onItemClick" @mouseover="onItemHover" @mouseleave="onItemLeave">
        <!-- Wishlist -->
        <usf-plugin name="searchResultsProductWishList" :data="pluginData"></usf-plugin>
        <!-- Labels -->
        <usf-plugin name="searchResultsProductLabel" :data="pluginData"></usf-plugin>
        <a :href="productUrl" class="full-unstyled-link">
            <span class="visually-hidden" v-html="product.title"></span>
        </a>
       
        <use-animate data-animate="zoom-fade-small" class="card card--product" :class="{'card--text': !product.images.length}" tabindex="-1">
            <a v-if="product.images.length" :href="productUrl" class="card__media media-wrapper" tabindex="-1">
                <div class="image-animate media media--hover-effect" :class="['media--' + _usfSectionSettings.image_ratio,{'media--image-contain': !_usfSectionSettings.enable_image_fill}]" :style="_usfSectionSettings.image_ratio == 'adapt' ? '--image-ratio-percent: ' + 100/_usfGetImageRatio(selectedImage) + '%;' : false">
                    <img :src="selectedImageUrl" :alt="product.title" :srcset="_usfGetSrcset(selectedImage,scaledSelectedImageUrl)" :width="selectedImage.width" :height="selectedImage.height" :loading="pIndex ? 'lazy' : 'eager'" :sizes="_usf_sizes" class="motion-reduce">
                    <img v-if="_usfSectionSettings.show_secondary_image && hoverImage" :src="hoverImageUrl" :alt="product.title" :srcset="_usfGetSrcset(hoverImage,scaledHoverImageUrl)" :width="hoverImage.width" :height="hoverImage.height" :loading="pIndex ? 'lazy' : 'eager'" :sizes="_usf_sizes" class="motion-reduce">
                </div>
            </a>
            <div v-else class="card__inner">
                <a :href="productUrl" :class="'media media--' + _usfSectionSettings.image_ratio" tabindex="-1">
                    <div class="card__content">
                        <h3 class="card-information__text h3" v-html="product.title"></h3>
                    </div>
                </a>
            </div>
        </use-animate>
  
        <div class="card-information">
            <div class="card-information__wrapper">
                <div v-if="_usfShowVendor || _usfShowSwatch" class="card-information__top">
                    <!--vendor-->
                    <template v-if="_usfShowVendor">
                        <span class="visually-hidden">vendor</span>
                        <div class="card-article-info caption-with-letter-spacing" v-html="product.vendor"></div>
                    </template>
                    <usf-swatches v-if="_usfShowSwatch && _usfGlobalSettings.color_swatches_position == 'top'" :product="product"></usf-swatches>
                </div>
                <a v-if="product.images.length" :href="productUrl" class="card-information__text h4" tabindex="-1" v-html="product.title"></a>
                <!-- Product review -->
                <usf-plugin name="searchResultsProductReview" :data="pluginData"></usf-plugin>
                `+_usfProductPrice+`
  
                <!--theme review-->
                <template v-if="_usfSectionSettings.show_rating && ratingMeta">
                    <div class="rating" role="img" :aria-label="_usfReviewInfo.replace('{{ rating_value }}',ratingMeta.value).replace('{{ rating_max }}',ratingMeta.scale_max)">
                        <span aria-hidden="true" class="rating-star" :style="'--rating: ' + Math.floor(ratingMeta.value) + '; --rating-max: ' + ratingMeta.scale_max + '; --rating-decimal: ' + rating_decimal + ';'"></span>
                    </div>
                    <p class="rating-text caption">
                        <span aria-hidden="true" v-html="ratingMeta.value + ' / ' + ratingMeta.scale_max"></span>
                    </p>
                    <p class="rating-count caption">
                        <span aria-hidden="true" v-html="'(' + usf.utils.getMetafield(product,'reviews','rating_count') + ')'"></span>
                        <span class="visually-hidden" v-html="usf.utils.getMetafield(product,'reviews','rating_count') + ' ' + _usf_total_reviews"></span>
                    </p>
                </template>
                <usf-swatches v-if="_usfShowSwatch && _usfGlobalSettings.color_swatches_position == 'bottom'" :product="product"></usf-swatches>
                <!-- Swatch-->
                <usf-plugin name="searchResultsProductSwatch" :data="pluginData"></usf-plugin>
            </div>
  
            <div ref="card-information-button" class="card-information__button">
                <button v-if="isSoldOut" class="button button--small button--soldout" type="button" disabled="disabled" v-html="loc.soldOut"></button>
                <template v-else-if="_usfSectionSettings.show_quick_buy">
                    <add-to-cart v-if="product.variants.length == 1" class="button button--small" :data-variant-id="selectedVariantForPrice.id">
                        <span v-html="loc.addToCart"></span>
                        <svg class="icon icon-cart" aria-hidden="true" focusable="false">
                            <use href="#icon-cart">
                        </svg>
                    </add-to-cart>
                    <template v-else>
                        <quick-view-button v-if="_usfGlobalSettings.quick_view_enabled && _usfSectionSettings.enable_quick_view" class="button button--small" :data-product-url="'/products/' + product.urlName + '?variant=' + selectedVariantForPrice.id">
                            <span v-html="loc.chooseOptions"></span>
                            <svg class="icon icon-cart" aria-hidden="true" focusable="false">
                                <use href="#icon-cart">
                            </svg>
                        </quick-view-button>
                        <a v-else :href="productUrl" class="button button--small" tabindex="-1">
                            <span v-html="loc.quickView"></span>
                            <svg class="icon icon-cart" aria-hidden="true" focusable="false">
                                <use href="#icon-cart">
                            </svg>
                        </a>
                    </template>
                </template>
            </div>
        </div>
  
        <div class="card__badge">
            <span v-if="isSoldOut && usf.settings.search.showSoldOut" class="badge badge--soldout" aria-hidden="true" v-html="loc.soldOut"></span>
            <template v-else-if="hasDiscount && usf.settings.search.showSale">
                <span class="badge badge--product" aria-hidden="true" v-html="loc.sale"></span>
            </template>
        </div>
        <div v-if="_usfGlobalSettings.quick_view_enabled && _usfSectionSettings.enable_quick_view" ref="usf-quick-view-drawer">
            <quick-view-drawer >
                <details>
                    <summary class="quick-view__summary" tabindex="-1">
                        <span class="visually-hidden" v-html="loc.quickView"></span>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="icon icon-search" fill="none" viewBox="0 0 15 17">
                            <circle cx="7.11113" cy="7.11113" r="6.56113" stroke="currentColor" stroke-width="1.1" fill="none" />
                            <path d="M11.078 12.3282L13.8878 16.0009" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" fill="none" />
                        </svg>
                    </summary>
                    <quick-view class="quick-view" :data-product-url="'/products/' + product.urlName + '?variant=' + selectedVariantForPrice.id">
                        <div role="dialog" :aria-label="loc.chooseOptions" aria-modal="true" class="quick-view__content" tabindex="-1"></div>
                    </quick-view>
                </details>
            </quick-view-drawer>
        </div>
    </div>
  </li>
`,
    // Search result pages
    searchResultsPages: `
<div class="pagination-wrapper">
    <nav class="pagination">
        <ul class="pagination__list list-unstyled">
        <template v-for="e in elements">
            <li v-if="e.type === 'prev'"><a href="javascript:void(0)" :title="loc.prevPage" @click="onPrev" class="pagination__item pagination__item--next motion-reduce">←</a></li>
            <li v-else-if="e.type === 'dots'"><span class="pagination__item">...</span></li>
            <li v-else-if="e.type === 'page' && e.current"><span class="pagination__item pagination__item--current">{{e.page}}</span></li>
            <li v-else-if="e.type === 'page' && !e.current"><a href="javascript:void(0)" class="pagination__item" @click="ev=>onPage(e.page,ev)" :title="usf.utils.format(loc.gotoPage,e.page)">{{e.page}}</a></li>
            <li v-else-if="e.type === 'next'"><a href="javascript:void(0)" :title="loc.nextPage" @click="onNext" class="pagination__item pagination__item--prev motion-reduce">→</a></li>
        </template>
        </ul>
    </nav>
</div>
`,
    // List view item
    searchResultsListViewItem: 
``
,
    // AddToCart Plugin	
    addToCartPlugin: ``,

    // Preview Plugin
    previewPlugin: ``,

    previewPluginModal: ``,

    searchResultsBanner: /*inc_begin_search-banner*/        
`<div class="usf-sr-banner">
    <a :href="banner.url || 'javascript:void(0)'" :alt="banner.description">
        <img :src="banner.mediaUrl" style="max-width:100%">
    </a>
</div>
`
/*inc_end_search-banner*/,

    ////////////////////////
    // Filter templates
    // facet filters breadcrumb
    filtersBreadcrumb: /*inc_begin_filters-breadcrumb*/
`<div v-if="usf.settings.filterNavigation.showFilterArea && root.facetFilters && root.facets && facetFilterIds.length" class="usf-refineby">
    <!-- Breadcrumb Header -->
    <div class="usf-title usf-clear">
        <span class="usf-pull-left usf-icon usf-icon-equalizer"></span>
        <span class="usf-label" v-html="loc.filters"></span>

        <!-- Clear all -->
        <button class="usf-clear-all usf-btn" v-html="loc.clearAll" @click.prevent.stop="root.removeAllFacetFilters" :aria-label="loc.clearAllFilters"></button>
    </div>

    <!-- Breadcrumb Values -->
    <div class="usf-refineby__body">
        <template v-for="facetId in facetFilterIds" v-if="(facet = root.facets.find(fc => fc.id === facetId)) && (f = root.facetFilters[facetId])">
            <template v-for="queryValStr in f[1]">
                <div class="usf-refineby__item usf-pointer usf-clear" @click.prevent.stop="root.removeFacetFilter(facetId, queryValStr)">
                    <button class="usf-btn"><span class="usf-filter-label" v-html="facet.title + ': '"></span><b v-html="root.formatBreadcrumbLabel(facet, f[0], queryValStr)"></b></button><span class="usf-remove"></span>
                </div>
            </template>
        </template>
    </div>
 </div>`
 /*inc_end_filters-breadcrumb*/,

    // facet filters    
    filters: /*inc_begin_filters*/
// Vert & Horz modes have different render order
`<div class="usf-facets usf-no-select usf-zone" :class="{'usf-facets--mobile':usf.isMobileFilter}">
<!-- Mobile view -->
<template v-if="usf.isMobile">
    <div class="usf-close" @click="onMobileBack(1)"></div>
    <div class="usf-facets-wrapper">
        <!-- Header. shows 'Filters', facet name, etc. -->
        <div class="usf-header">
            <!-- Single facet mode -->
            <template v-if="isSingleFacetMode">
                <div class="usf-title" @click="onMobileBack(0)" v-html="facets[0].title"></div>
                <div v-if="facetFilters" class="usf-clear" @click="removeAllFacetFilters" v-html="loc.clear"></div>
            </template>

            <!-- When a filter is selected -->
            <template v-else-if="mobileSelectedFacet">
                <div class="usf-title usf-back" @click="onMobileBack(0)" v-html="mobileSelectedFacet.title"></div>
                <div v-if="facetFilters && facetFilters[mobileSelectedFacet.id]" class="usf-clear" @click="removeFacetFilter(mobileSelectedFacet.id)" v-html="loc.clear"></div>
                <div v-else-if="mobileSelectedFacet.multiple" class="usf-all" @click="selectFacetFilter(mobileSelectedFacet)" v-html="loc.all"></div>
            </template>

            <!-- When no filter is selected -->
            <template v-else>
                <div class="usf-title" @click="onMobileBack(0)" v-html="loc.filters"></div>
                <div v-if="facetFilters" class="usf-clear" @click="removeAllFacetFilters" v-html="loc.clearAll"></div>
            </template>
        </div>

        <div class="usf-body">
            <!-- Desktop-like filter in mobile -->
            <template v-if="usf.settings.filters.desktopLikeMobile">
                <usf-filter-breadcrumb></usf-filter-breadcrumb>
                
                <!-- Facets body -->
                <div class="usf-facets__body">
                    <usf-filter :facet="f" :key="f.id" v-for="f in facets"></usf-filter>
                </div>
            </template>
            
            <!-- Mobile filter -->
            <template v-else>
                <!-- List all filter options, in single facet mode -->
                <usf-filter v-if="isSingleFacetMode" :facet="facets[0]"></usf-filter>

                <!-- List all filter options, when a filter is selected -->
                <usf-filter v-else-if="mobileSelectedFacet" :facet="mobileSelectedFacet"></usf-filter>

                <!-- List all when there are more than one facet -->
                <template v-else :key="f.id" v-for="f in facets">
                    <template v-if="canShowFilter(f)">
                        <div class="usf-facet-value" @click="onMobileSelectFacet(f)">
                            <span class="usf-title" v-html="f.title"></span>
                            <div v-if="(selectedFilterOptionValues = facetFilters && (ff = facetFilters[f.id]) ? ff[1] : null)" class="usf-dimmed">
                                <span v-for="cf in selectedFilterOptionValues" v-html="formatBreadcrumbLabel(f, f.facetName, cf)"></span>
                            </div>
                        </div>
                    </template>
                </template>
            </template>
        </div>

        <!-- View items -->
        <div class="usf-footer">
            <div @click="onMobileBack(1)" v-html="loc.viewItems"></div>
        </div>
    </div>
</template>

<!-- Desktop view -->
<template v-else>
    <usf-filter-breadcrumb></usf-filter-breadcrumb>
    <!-- Filters Loader -->
    <div v-if="!facets" class="usf-facets__first-loader">
        <template v-for="i in 3">
            <div class="usf-facet"><div class="usf-title usf-no-select"><span class="usf-label"></span></div>
                <div v-if="!usf.settings.filters.horz" class="usf-container"><div class="usf-facet-values usf-facet-values--List"><div class="usf-relative usf-facet-value usf-facet-value-single"><span class="usf-label"></span><span class="usf-value"></span></div><div class="usf-relative usf-facet-value usf-facet-value-single"><span class="usf-label"></span><span class="usf-value"></span></div></div></div>
            </div>
        </template>
    </div>
    <!-- Facets body -->
    <div v-else class="usf-facets__body">
        <usf-filter :facet="f" :key="f.id" v-for="f in facets"></usf-filter>
    </div>
</template>
</div>`
/*inc_end_filters*/,

    // facet filter item
    filter: /*inc_begin_filter*/
`<div v-if="canShow" class="usf-facet" :class="{'usf-collapsed': collapsed && !usf.isMobileFilter, 'usf-has-filter': isInBreadcrumb}">
    <!-- Mobile filter -->
    <div v-if="usf.isMobileFilter" class="usf-container">
        <!-- Search box -->
        <input v-if="hasSearchBox" class="usf-search-box" :aria-label="loc.filterOptions" :placeholder="loc.filterOptions" :value="term" @input="v => term = v.target.value">

        <!-- Values -->
        ` + _usfFilterBodyTemplate +
    `</div>

    <!-- Desktop filter -->
    <template v-else>
        <!-- Filter title -->
        <div class="usf-clear">
            <div class="usf-title usf-no-select" @click.prevent.stop="onExpandCollapse">
                <button class="usf-label usf-btn" v-html="facet.title" :aria-label="usf.utils.format(loc.filterBy,facet.title)" :aria-expanded="!collapsed"></button>
                <usf-helptip v-if="facet.tooltip" :tooltip="facet.tooltip"></usf-helptip>            
                <!-- 'Clear all' button to clear the current facet filter. -->
                <button v-if="isInBreadcrumb" class="usf-clear-all usf-btn" :title="loc.clearFilterOptions" :aria-label="usf.utils.format(loc.clearFiltersBy,facet.title)" @click.prevent.stop="onClear" v-html="loc.clear"></button>
                <span class="usf-pm"></span>
            </div>
        </div>

        <!-- Filter body -->
        <div class="usf-container">
            <!-- Search box -->
            <input v-if="hasSearchBox" class="usf-search-box" :placeholder="loc.filterOptions" :value="term" @input="v => term = v.target.value">

            ` + _usfFilterBodyTemplate +
        `
        </div>
    </template>
</div>`
/*inc_end_filter*/,

    // facet filter option
    filterOption: /*inc_begin_filter-option*/
`<div v-if="children" :class="(isSelected ? 'usf-selected ' : '') + ' usf-relative usf-facet-value usf-facet-value-single usf-with-children' + (collapsed ? ' usf-collapsed' : '')">
    <!-- option label -->
    <button class="usf-pm usf-btn" v-if="children" @click.prevent.stop="onToggleChildren"></button>
    <button class="usf-label usf-btn" v-html="label" @click.prevent.stop="onToggle"></button>

    <!-- product count -->
    <span v-if="!(!usf.settings.filterNavigation.showProductCount || (swatchImage && !usf.isMobileFilter)) && option.value !== undefined" class="usf-value">{{option.value}}</span>    

    <div class="usf-children-container" v-if="children && !collapsed">
        <button :class="'usf-child-item usf-btn usf-facet-value' + (isChildSelected(c) ? ' usf-selected' : '')" v-for="c in children" v-html="getChildLabel(c)" @click="onChildClick(c)"></span>
    </div>
</div>
<button v-else :class="(isSelected ? 'usf-selected ' : '') + (swatchImage ? ' usf-facet-value--with-background' : '') + ' usf-btn usf-relative usf-facet-value usf-facet-value-' + (facet.multiple ? 'multiple' : 'single')" :title="isSwatch || isBox ? label + ' (' + option.value + ')' : undefined" :style="usf.isMobileFilter ? null : swatchStyle" @click.prevent.stop="onToggle">
    <!-- checkbox -->
    <div v-if="!isBox && !isSwatch && facet.multiple" :class="'usf-checkbox' + (isSelected ? ' usf-checked' : '')">
        <span class="usf-checkbox-inner"></span>
    </div>

    <!-- swatch image in mobile -->
    <div v-if="swatchImage && usf.isMobileFilter" class="usf-mobile-swatch" :style="swatchStyle"></div>

    <!-- option label -->
    <span class="usf-label usf-btn" v-html="label"></span>
    
    <!-- product count -->
    <span v-if="!(!usf.settings.filterNavigation.showProductCount || (swatchImage && !usf.isMobileFilter)) && option.value !== undefined" class="usf-value">{{option.value}}</span>
</button>`
/*inc_end_filter-option*/,

    // Instant search popup
    instantSearch: /*inc_begin_instantsearch*/
`<div :class="'usf-popup usf-zone usf-is usf-is--compact usf-is--' + position + (shouldShow ? '' : ' usf-hide') + (isEmpty ? ' usf-empty' : '') + (hasProductsOnly ? ' usf-is--products-only' : '') + (firstLoader ? ' usf-is--first-loader': '')"  :style="usf.isMobile ? null : {left: this.left + 'px',top: this.top + 'px',width: this.width + 'px'}">
    <!-- Mobile search box -->
    <div v-if="usf.isMobile">
        <form class="usf-is-inputbox" :action="searchUrl" method="get" role="search">
            <span class="usf-icon usf-icon-back usf-close" @click="usf.utils.hideInstantSearch"></span>
            <input name="q" autocomplete="off" ref="searchInput" :value="term" @input="onSearchBoxInput">
            <span class="usf-remove" v-if="term" @click="onClear"></span>
        </form>
    </div>

    <!-- First loader -->
    <div class="usf-is-first-loader" v-if="firstLoader">
        <div class="usf-clear">
            <div class="usf-img"></div>
            <div class="usf-title"></div>
            <div class="usf-subtitle"></div>
        </div>
        <div class="usf-clear">
            <div class="usf-img"></div>
            <div class="usf-title"></div>
            <div class="usf-subtitle"></div>
        </div>
        <div class="usf-clear">
            <div class="usf-img"></div>
            <div class="usf-title"></div>
            <div class="usf-subtitle"></div>
        </div>
    </div>

    <!-- All JS files loaded -->
    <template v-else>
        <!-- Empty view -->
        <div v-if="isEmpty" class="usf-is-no-results">
            <div style="background:url('//cdn.shopify.com/s/files/1/0257/0108/9360/t/85/assets/no-items.png?t=2') center no-repeat;min-height:160px"></div>
            <div v-html="usf.utils.format(loc.noMatchesFoundFor, term)"></div>
        </div>
        <template v-else>
            <!-- Body content -->
            <div class="usf-is-content">
                <!-- Products -->
                <div class="usf-is-matches usf-is-products">
                    <div class="usf-title" v-html="queryOrTerm ? loc.productMatches : loc.trending"></div>
                    
                    <div class="usf-is-list" v-if="result.items.length">
                        <!-- Did you mean -->
                        <span class="usf-is-did-you-mean" v-html="usf.utils.format(loc.didYouMean, usf.utils.encodeHtml(term), result.query)" v-if="termDiffers"></span>

                        <!-- Product -->
                        <usf-is-item v-for="p in result.items" :product="p" :result="result" :key="p.id + '-' + p.selectedVariantId"></usf-is-item>
                    </div>
                    <div class="usf-is-list" v-else style="background:url('//cdn.shopify.com/s/files/1/0257/0108/9360/t/85/assets/no-products.png?t=2') center no-repeat;min-height:250px"></div>
                </div>

                <div class="usf-is-side">
                    <!-- Suggestions -->
                    <div class="usf-is-matches usf-is-suggestions" v-if="result.suggestions && result.suggestions.length">
                        <div class="usf-title" v-html="loc.searchSuggestions"></div>
                        <span v-for="s in result.suggestions" class="usf-is-match" v-html="usf.utils.highlight(s, result.query)" @click="search(s)"></span>
                    </div>

                    <!-- Collections -->
                    <div class="usf-is-matches usf-is-collections" v-if="result.collections && result.collections.length">
                        <div class="usf-title" v-html="loc.collections"></div>
                        <span v-for="c in result.collections" class="usf-is-match" v-html="usf.utils.highlight(c.title, result.query)" @click="selectCollection(c)"></span>
                    </div>

                    <!-- Pages -->
                    <div class="usf-is-matches usf-is-pages" v-if="result.pages && result.pages.length">
                        <div class="usf-title" v-html="loc.pages"></div>
                        <span v-for="p in result.pages" class="usf-is-match" v-html="usf.utils.highlight(p.title, result.query)" @click="selectPage(p)"></span>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="usf-is-viewall">
                <span @click="search(queryOrTerm)" v-html="usf.utils.format(queryOrTerm ? loc.viewAllResultsFor : loc.viewAllResults, queryOrTerm)"></span>
            </div>
        </template>
    </template>
</div>`
/*inc_end_instantsearch*/
,

    // Instant search item
    instantSearchItem:/*inc_begin_instantsearch-item*/
`<span class="usf-is-product usf-clear" @click="onItemClick">
    <!-- Image -->
    <div class="usf-img-wrapper usf-pull-left">
        <img class="usf-img" :src="selectedImageUrl">
    </div>
    
    <div class="usf-pull-left">
        <!-- Title -->
        <div class="usf-title" v-html="usf.utils.highlight(product.title, result.query)"></div>

        <!-- Vendor -->
        <div class="usf-vendor" v-html="product.vendor" v-if="usf.settings.search.showVendor"></div>

        <!-- Prices -->
        <div class="usf-price-wrapper">
            <span class="usf-price" :class="{ 'usf-has-discount': hasDiscount }" v-html="displayPrice"></span>
            <span v-if="hasDiscount" class="usf-discount" v-html="displayDiscountedPrice"></span>
        </div>
    </div>
</span>`
/*inc_end_instantsearch-item*/,
};



usf.event.add('init', function () {    
	// register or override components
    // ...    
    /*var SearchResultsGridItem2 = {
        template: usf.templates.searchResultsGridViewItem,
    }
    usf.register(SearchResultsGridItem2, usf.components.SearchResultsGridItem, "usf-sr-griditem");*/
    _usfImageWidths = _usfIsDynamicImage ? [200, 400, 600, 700, 800, 900, 1000, 1200] : [usf.settings.search.imageSize];
    _usfSetDefaultThemeSettings();

    var NewSearchResults = {
        mixins: [usf.components.SearchResults],
        template: usf.templates.searchResults,
        data(){
            var productPerRow = parseInt(_usfSectionSettings.products_per_row);
            var baseClass = 'product-grid grid grid--2-col grid--3-col-tablet';
            if(_usfSectionSettings.columns_mobile == 1){
                baseClass += ' grid--1-col-mobile';
            }
            return {
                baseClass: baseClass,
                productPerRow: productPerRow
            }
        },
        created(){ 
       
        }, 
        methods:{
            onNewGridViewClick(col){
                this.productPerRow = col;
                this.onGridViewClick();
            },
            onNewListViewClick(){
                this.onListViewClick();
            },
        },
        computed:{
            gridWrapClass(){
                if(this.productPerRow == 2){
                    return 'product-grid grid grid--2-col';
                }
                return this.baseClass + ` grid--${this.productPerRow}-col-desktop`
            },
        }
    }
    usf.register(NewSearchResults, null, "usf-new-sr");

    /**
    * custom filter
    * */
    var _usfWindowWidth = 750;
    var NewFilter = {
        mixins: [usf.components.Filters],
        template: usf.templates.filters,
        mounted() {
            this.$nextTick(function() {
                if (!usf.settings.filters.horz && !usf.isMobile && window.innerWidth >= _usfWindowWidth) {
                    this.moveFilter();
                    usf.event.add('mobile_changed', this.moveFilter);
                }
                var t = this;
                window.addEventListener("resize", function(){
                    if (!usf.settings.filters.horz && !usf.isMobile) {
                        if((document.body.classList.contains('usf-has-filter-drawer') && window.innerWidth < _usfWindowWidth) || !document.body.classList.contains('usf-has-filter-drawer') && window.innerWidth >= _usfWindowWidth)
                            t.moveFilter();
                    }
                });

            })
        },
        methods: {
            moveFilter() {
                var el = this.$el;
                if(window.innerWidth >= _usfWindowWidth){
                    var drawerZone = _usf_filter_type == 'drawer' ? document.querySelector('.mobile-facets__main') :document.getElementById('FacetFiltersForm')
                    if (drawerZone) {
                        drawerZone.innerHTML = '';
                        drawerZone.appendChild(el);
                        el.classList.add('mobile-facets__inner');
                        document.body.classList.add('usf-has-filter-drawer');
                    }
                }else{
                    window.usf_container.prepend(el);
                    document.body.classList.remove('usf-has-filter-drawer');
                }
                
            }
        }
    }
    usf.register(NewFilter, null, 'usf-new-filters');


    var NewGridItem = {
        props: {
            pIndex: Number
        },
        mixins: [usf.components.SearchResultsGridItem],
        template: usf.templates.searchResultsGridViewItem,
  
        mounted() {
            this.$nextTick(function() {

                //for customElements
                if(_usfSectionSettings.show_quick_buy && this.$refs['card-information-button']){
                    var temp = this.$refs['card-information-button'].innerHTML;
                    this.$refs['card-information-button'].innerHTML = '';
                    this.$refs['card-information-button'].innerHTML = temp;
                }

                if(_usfGlobalSettings.quick_view_enabled && _usfSectionSettings.enable_quick_view && this.$refs['usf-quick-view-drawer']){
                    var quickViewDrawer = this.$refs['usf-quick-view-drawer'].innerHTML;
                    this.$refs['usf-quick-view-drawer'].innerHTML = '';
                    this.$refs['usf-quick-view-drawer'].innerHTML = quickViewDrawer
                }
                if(this.$refs['usf-price']){
                    var price_temp = this.$refs['usf-price'].innerHTML;
                    this.$refs['usf-price'].innerHTML = '';
                    this.$refs['usf-price'].innerHTML = price_temp;
                }
            })
        },
        computed: {
            ratio() {
                if (this.product.images && _usfSectionSettings.media_aspect_ratio == 'portrait')
                    return 0.8;
                else if (this.product.images && _usfSectionSettings.media_aspect_ratio == 'adapt')
                    return _usfGetImageRatio(this.selectedImage);
                return 1
            },
            rating_decimal() {
                if (_usfSectionSettings.show_rating && this.ratingMeta) {
                    var rating_decimal = 0;
                    var decimal = this.ratingMeta.value % 1;
                    if (decimal >= 0.3 && decimal <= 0.7)
                        rating_decimal = 0.5;
                    else if (decimal > 0.7)
                        rating_decimal = 1;

                    return rating_decimal
                }
                return 0
            },
            ratingMeta() {
                var meta = usf.utils.getMetafield(this.product, 'reviews', 'rating');
                if (meta != '')
                    return JSON.parse(meta)
                return 0
            }
        }
    }
    usf.register(NewGridItem, null, "usf-new-griditem");


       /**
    * color swatch component
    * */
    var UsfSwatches = {
        props: {
            product: Object,
        },
        data() {
            var product = this.product;
            var option;
            var optionIndex = 0;
            var optionWithValues = [];
            var optionRendereds = {};
            for (let i = 0; i < product.options.length; i++) {
                var o = product.options[i];
                var downcased_option = o.name.toLowerCase();
                if (downcased_option.includes(_usf_swatch_trigger) || ( _usf_swatch_trigger == 'color' && downcased_option == 'colour')) {
                    optionIndex = i;
                    option = o;
                    break;
                }
            }
            if (option) {
                option.values.filter(o => {
                    for (let x = 0; x < product.variants.length; x++) {
                        var v = product.variants[x];
                        if (v.options[optionIndex] != undefined) {
                            var vrOpt = option.values[v.options[optionIndex]];
                            if (o === vrOpt && !optionRendereds[o]) {
                                optionRendereds[o] = 1;
                                optionWithValues.push({
                                    value: o,
                                    image: product.images[v.imageIndex],
                                    variant: v
                                });
                                break;
                            }
                        }
                    }
                })
            }
            var productSouldOut = true;
            for (let x = 0; x < product.variants.length; x++) {
                var v = product.variants[x];
                if(!usf.utils.isVariantSoldOut(v)){
                    productSouldOut = false;
                    break;
                }
            }

            return {
                option: option,
                optionWithValues: optionWithValues,
                productSouldOut: productSouldOut
            }
        },
        methods: {
            _variantUrl(v) {
                return _usfAddQuery(this.$parent.productUrl, `variant=${v.id}`)
            }
        },
        mounted() {
            this.$nextTick(function() {
                var temp = this.$el.innerHTML;
                this.$el.innerHTML = '';
                this.$el.innerHTML = temp;  
            })
        },
        render(h) {
            if (this.optionWithValues.length > 1) return h('div', { class: ['card__colors','card__colors--' + _usfGlobalSettings.color_swatches_size,'card__colors--' + this.product.id]}, [
                this.optionWithValues.map((o, index) => {
                    if(index <= _usfGlobalSettings.color_swatches_max_items){
                        var optHandled = _usfHandlezie(o.value);
                        var temp = o.value.split(' ').pop();
                        var color_swatch_fallback = _usfHandlezie(temp);
                        var imgFiles = _usfFilesUrl + optHandled + '_50x.png';
                     
                        var dataSrcset = '';
                        var dataSrc = '';
                        if(o.image){
                            var imgUrl;
                            if(_usfIsDynamicImage){
                                imgUrl = _usfGetOriginImgWithSize(o.image.url,'{size}x');
                            }else{
                                imgUrl = _usfGetOriginImgWithSize(o.image.url,usf.settings.search.imageSize + 'x');
                            }
                            dataSrc = imgUrl
                            dataSrcset = _usfGetDataSrcset(o.image,imgUrl);
                        }else if(this.product.images.length){
                            dataSrcset = _usfGetDataSrcset(this.$parent.selectedImage,this.$parent.selectedImageUrl);
                            dataSrc = this.$parent.selectedImageUrl;
                        }else{
                            dataSrcset = this.$parent.selectedImageUrl;
                            dataSrc = this.$parent.selectedImageUrl;
                        }

                        var _attrs = {
                            style: '--swatch-background-color:' + color_swatch_fallback + ';' + `--swatch-background-image: url(${imgFiles})`,
                            title: o.value,
                            'data-srcset': dataSrcset,
                            'data-src': dataSrc
                        };
                        if(!this.productSouldOut && this.product.options.length <= 2){
                            _attrs['data-variant-id'] = o.variant.id;
                            _attrs['data-product-handle'] = this.product.urlName;
                            _attrs['data-collection-handle'] = usf.platform.collection ? usf.platform.collection : 'all';
                        }

                        return h('color-swatch',{
                            class:'color-swatch',
                            attrs: _attrs
                        },[
                            h('a',{
                                class: 'filter-item filter-image',
                                attrs:{
                                    href: this._variantUrl(o.variant),
                                    tabindex: '-1'
                                }
                            },[
                                h('span',{class:'visually-hidden'},[o.value])
                            ])
                        ])
                    }
                }),
                this.optionWithValues.length > _usfGlobalSettings.color_swatches_max_items ? h('a', { 
                    class: 'link link--text',
                    attrs: {
                        href: '/products/' + this.product.urlName,
                        tabindex: '-1'
                    } 
                }, [
                    h('small', ['+' + (this.optionWithValues.length - _usfGlobalSettings.color_swatches_max_items)])
                ]) : null
            ])
        }
    }
    usf.register(UsfSwatches, null, 'usf-swatches');

  
});

function _usfOnAddToCartSuccess(rs, formSelector) {
}

function _usfGetSrcset(img,scaledImgUrl) {
    var srcset = [];
    _usfImageWidths.filter(w => {
        if(img.width >= w){
            srcset.push(scaledImgUrl.replace('{size}', w) + `&width=${w} ${w}w`);
        }
    });
    return srcset.join(',')
}
function _usfGetDataSrcset(img, imgUrl) {
    if (_usfIsDynamicImage) {
        var srcset = [];
        if (img.width >= 165)
            srcset.push(imgUrl.replace('{size}', 165) + ' 165w');
        if (img.width >= 360)
            srcset.push(imgUrl.replace('{size}', 360) + ' 360w');
        if (img.width >= 533)
            srcset.push(imgUrl.replace('{size}', 533) + ' 533w');
        if (img.width >= 720)
            srcset.push(imgUrl.replace('{size}', 720) + ' 720w');
        if (img.width >= 940)
            srcset.push(imgUrl.replace('{size}', 940) + ' 940w');
        if (img.width >= 1066)
            srcset.push(imgUrl.replace('{size}', 1066) + ' 1066w');
        srcset.push(img.url + ' ' + img.width + 'w');

        return srcset.join(',')

    } else
        return imgUrl + ' ' + usf.settings.search.imageSize + 'w'
}

function _usfSetDefaultThemeSettings(){
    var nodes = document.head.children;
    for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        if (n.href && n.href.indexOf('component-color-swatches.css') !== -1) {
            _usfFilesUrl = n.href;
            var m = _usfFilesUrl.indexOf('/assets/');
            while (_usfFilesUrl[--m] !== '/');
            while (_usfFilesUrl[--m] !== '/');
            _usfFilesUrl = _usfFilesUrl.substring(0, m) + "/files/";
            break;
        }
    }
    window._usfGlobalSettings = window._usfGlobalSettings || {
        color_swatches_enabled: true,
        color_swatches_max_items: 4,
        color_swatches_size: "large",
        color_swatches_position: "top",
        quick_view_enabled: true,
      };
      window._usfSectionSettings = window._usfSectionSettings || {
        enable_color_swatches: true,
        show_vendor: true,
        image_ratio: "portrait",
        enable_image_fill: true,
        show_secondary_image: true,
        show_rating: true,
        enable_countdown: true,
        enable_quick_view: true,
        show_quick_buy: false,
        columns_mobile: "2",
        products_per_row: 4,
      };
      window._usf_swatch_trigger = window._usf_swatch_trigger || "color";
      window._usf_sizes = window._usf_sizes || "(min-width: 1600px) 367px, (min-width: 990px) calc((100vw - 10rem) \/ 4), (min-width: 750px) calc((100vw - 10rem) \/ 3), calc(100vw - 3rem)";
      window._usfReviewInfo = window._usfReviewInfo || "{{ rating_value }} out of {{ rating_max }} stars";
      window._usf_total_reviews = window._usf_total_reviews || "total reviews";
      window._usf_grid_class = window._usf_grid_class || "grid grid--2-col grid--3-col-tablet grid--4-col-desktop";
      window._usf_filter_type = window._usf_filter_type || "vertical";
    _usfShowSwatch = _usfGlobalSettings.color_swatches_enabled && _usfSectionSettings.enable_color_swatches;
    _usfShowVendor = _usfSectionSettings.show_vendor && usf.settings.search.showVendor;
}

/* Begin theme ready code */
if (usf.settings.instantSearch.online && usf.isMobile) {
    // click on search icon -> show our instant search
    var searchIcon = document.querySelector('.header__icon--search');
    if (searchIcon)
        searchIcon.addEventListener('click',function(){
            var target  = document.createElement('input');
            usf.utils.loadAndShowInstantSearch(target, true);
        });

    // still register to 'is_show' event to hide the drawer.
    usf.event.add('is_show', function () {
        setTimeout(() => {
            var closeSearch = document.querySelector('.search__button[aria-label="Close"]');
            if(closeSearch)
                closeSearch.click();
            // refocus on our input box
            usf.instantSearch.focus();
        }, 300);
    })
}
/* End theme ready code */
