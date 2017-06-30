import resource from 'resource-router-middleware';
import pivotTable from './../utils/pivot';
// import defaultFile from './../csvSamples/sample1.json';
import defaultFile from './../csvSamples/sample2.json';

let fs = require('fs');



export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'pivot',

	/** GET / - List all entities */
	index({ params }, res) {
		res.json(params);
	},

    /** POST / - Create a new entity */
	create({ body }, res) {
		let result = pivotTable(defaultFile.results, body.rowFields, body.colFields, {});

		res.json({
			result,
			'rowHeaders': result.rowHeaders,
			'columnHeaders': result.columnHeaders
		});
	},



	/** GET /:id - Return a given entity */
	read({ facet }, res) {
		res.json(facet);
	},

	/** PUT /:id - Update a given entity */
	update({ facet, body }, res) {
		for (let key in body) {
			if (key!=='id') {
				facet[key] = body[key];
			}
		}
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({ facet }, res) {
		res.sendStatus(facet);
	}
});
