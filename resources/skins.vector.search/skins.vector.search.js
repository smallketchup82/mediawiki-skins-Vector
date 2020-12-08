var
	Vue = require( 'vue' ).default || require( 'vue' ),
	App = require( './App.vue' );

/**
 * @param {HTMLElement} searchForm
 * @param {HTMLInputElement} search
 * @return {void}
 */
function initApp( searchForm, search ) {
	// eslint-disable-next-line no-new
	new Vue( {
		el: '#p-search',
		/**
		 *
		 * @param {Function} createElement
		 * @return {Vue.VNode}
		 */
		render: function ( createElement ) {
			return createElement( App, {
				props: {
					autofocusInput: search === document.activeElement,
					action: searchForm.getAttribute( 'action' ),
					searchAccessKey: search.getAttribute( 'accessKey' ),
					searchTitle: search.getAttribute( 'title' ),
					searchPlaceholder: search.getAttribute( 'placeholder' ),
					searchQuery: search.value
				}
			} );
		}
	} );
}
/**
 * @param {Document} document
 * @return {void}
 */
function main( document ) {
	var
		searchForm = /** @type {HTMLElement} */ ( document.querySelector( '#searchform' ) ),
		search = /** @type {HTMLInputElement|null} */ ( document.getElementById( 'searchInput' ) );
	if ( search && searchForm ) {
		initApp( searchForm, search );
	}
}
main( document );