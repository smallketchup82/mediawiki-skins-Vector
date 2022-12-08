/** @interface MwApi */

let /** @type {MwApi} */ api;
const debounce = require( /** @type {string} */ ( 'mediawiki.util' ) ).debounce;

/**
 * Saves preference to user preferences and/or localStorage.
 *
 * @param {string} feature
 * @param {boolean} enabled
 */
function save( feature, enabled ) {
	let featuresJSON;
	// @ts-ignore
	const features = mw.storage.get( 'VectorFeatures' ) || '{}';

	try {
		featuresJSON = JSON.parse( features );
	} catch ( e ) {
		featuresJSON = {};
	}
	featuresJSON[ feature ] = enabled;
	// @ts-ignore
	mw.storage.set( 'VectorFeatures', JSON.stringify( featuresJSON ) );

	if ( !mw.user.isAnon() ) {
		debounce( function () {
			api = api || new mw.Api();
			api.saveOption( 'vector-' + feature, enabled ? 1 : 0 );
		}, 500 )();
	}
}

/**
 * @param {string} name
 * @throws {Error} if unknown feature toggled.
 */
function toggle( name ) {
	const featureClassEnabled = 'vector-feature-' + name + '-enabled',
		classList = document.body.classList,
		featureClassDisabled = 'vector-feature-' + name + '-disabled';

	if ( classList.contains( featureClassDisabled ) ) {
		classList.remove( featureClassDisabled );
		classList.add( featureClassEnabled );
		save( name, true );
	} else if ( classList.contains( featureClassEnabled ) ) {
		classList.add( featureClassDisabled );
		classList.remove( featureClassEnabled );
		save( name, false );
	} else {
		throw new Error( 'Attempt to toggle unknown feature: ' + name );
	}
}

/**
 * Checks if the feature is enabled.
 *
 * @param {string} name
 * @return {boolean}
 */
function isEnabled( name ) {
	return document.body.classList.contains(
		'vector-feature-' + name + '-enabled'
	);
}

module.exports = {
	isEnabled: isEnabled,
	toggle: toggle
};