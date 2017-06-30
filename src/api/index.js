import { version } from '../../package.json';
import { Router } from 'express';
import pivot from './pivot';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/pivot', pivot({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
