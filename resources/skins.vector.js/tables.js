const config = require( './config.json' );
const init = () => {
	if ( !config.VectorWrapTablesTemporary ) {
		return;
	}
	const tables = document.querySelectorAll( '.mw-parser-output table.wikitable:not(.floatright):not(.floatleft)' );
	Array.from( tables ).forEach( ( table ) => {
		// Don't wrap tables within tables
		const parent = table.parentElement;
		if (
			parent && table.matches( '.wikitable' ) &&
			!parent.matches( '.noresize' ) &&
			!parent.closest( 'table' )
		) {
			const wrapper = document.createElement( 'div' );
			wrapper.classList.add( 'noresize' );
			parent.insertBefore( wrapper, table );
			wrapper.appendChild( table );
		}
	} );
};

module.exports = {
	init
};