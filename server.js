const express = require('express');
const jsdom = require("jsdom");
const axios = require('axios');

require('dotenv').config({ path: './.env' }); 

const app = express();
const { JSDOM } = jsdom;

const port = process.env.APP_PORT || 5000;
const appName = process.env.APP_NAME || 'My website';
const appRoot = process.env.APP_ROOT || 'http://localhost:5000';

const endpoint = process.env.API_PORT || 'http://localhost:1337';
const token = process.env.API_TOKEN;

const path = require('path');

/* Creates and add each meta to document's head
*/
const appendMetas = ( doc, metas ) => {
	for ( const meta of metas ) {
		if ( (meta.name || meta.property) && meta.content ) {
			let metaEl = doc.createElement('meta');
			if (meta.name) metaEl.name = meta.name;
			if (meta.property) metaEl.setAttribute('property', meta.property);
			if (meta.content) metaEl.content = meta.content;
			doc.head.appendChild(metaEl);
		}
	}
}

const getPageMetas = async ( slug, defaultMetas ) => {
	const apiRes = await axios.get( `${endpoint}/api/pages?filters[slug][$eq]=${slug}&populate[0]=metaImage`, {
		"headers": {
			'Authorization': `Bearer ${token}`
		}
	});

	const pageData = apiRes.data.data?.[0]?.attributes;

	for ( var i = 0; i < defaultMetas.length; i++ ) {
		let meta = defaultMetas[i];
		switch (meta.property) {
			case 'og:title':
				if (pageData?.title) 
					meta.content =  `${pageData?.title} - ${appName}`;
			break;
			case 'og:description':
			case 'description':
				if (pageData?.metaDescription)
					meta.content = pageData?.metaDescription;
			break;
			case 'og:image':
				if (pageData?.metaImage?.data?.attributes?.url)
					meta.content = pageData?.metaImage?.data?.attributes?.url
			break;
		}
	}

	// TODO Strapi may provide additional images sizes,
	// get them and push as distinct metas

	return defaultMetas;
}

const getArticleMetas = async ( slug, defaultMetas ) => {
	const apiRes = await axios.get( `${endpoint}/api/articles?filters[slug][$eq]=${slug}&populate[0]=cover`, {
		"headers": {
			'Authorization': `Bearer ${token}`
		}
	});

	const articleData = apiRes.data.data?.[0]?.attributes;

	for ( var i = 0; i < defaultMetas.length; i++ ) {
		let meta = defaultMetas[i];
		switch (meta.property) {
			case 'og:title':
				if (articleData?.title) 
					meta.content =  `${articleData?.title} - ${appName}`;
			break;
			case 'og:description':
			case 'description':
				if (articleData?.description)
					meta.content = articleData?.description;
			break;
			case 'og:image':
				if (articleData?.cover?.data?.attributes?.url)
					meta.content = articleData?.cover?.data?.attributes?.url
			break;
		}
	}

	// Adds article's published and last updated time
	if (articleData) {
		defaultMetas.push({
			name: 'article:published_time',
			content: `${articleData.publishedAt}`
		})

		defaultMetas.push({
			name: 'article:article:modified_time',
			content: `${articleData.updatedAt}`
		})
	}

	// TODO Strapi may provide additional images sizes,
	// get them and push as distinct metas

	return defaultMetas;
}

app.get('/', async (req, res, next) => {

	const templatePath = path.resolve(__dirname, './build', 'index.html');

	const slug = 'home';

	// Format default meta values
	let og_title = { property: 'og:title', content: `Home - ${appName}` },
		og_description = { property: 'og:description', content: undefined },
		description = { name: 'description', content: og_description.content },
		og_url = { name: 'og:url', content: `${appRoot}` },
		og_site_name = { name: 'og:site_name', content: `${appName}` },
		og_locale = { name: 'og:locale', content: 'en_US' },
		og_image = { property: 'og:image', content: undefined },
		og_type = { property: 'og:type', content: 'website' };
	
	let metas = [ og_type, og_url,og_locale, og_site_name, og_title, og_description, description, og_image ];

	// Set from api, specific values for metas
	try {
		await getPageMetas(slug, metas)

		// Load dom from template for manipulation
		let dom = await JSDOM.fromFile(templatePath);
		let doc = dom.window.document;

		appendMetas(doc, metas);

		// Get and set the title tag
		let title = doc.head.querySelector('title');
		title.textContent = og_title.content;

		// Send serialized document
		res.send(dom.serialize());
	} catch (e) {
		res.sendFile(templatePath);
	}

});

app.get('/page/:slug', async (req, res, next) => {

	const templatePath = path.resolve(__dirname, './build', 'index.html');

	const slug = req.params.slug;

	// Format default meta values
	let og_title = { property: 'og:title', content: undefined },
		og_description = { property: 'og:description', content: undefined },
		og_url = { name: 'og:url', content: `${appRoot}/page/${slug}` },
		og_site_name = { name: 'og:site_name', content: `${appName}` },
		og_locale = { name: 'og:locale', content: 'en_US' },
		description = { name: 'description', content: og_description.content },
		og_image = { property: 'og:image', content: undefined },
		og_type = { property: 'og:type', content: 'website' };

	let metas = [ og_type, og_site_name, og_locale, og_url, og_title, og_description, description, og_image ];

	// Set from api, specific values for metas
	try {
		await getPageMetas(slug, metas)

		// Load dom from template for manipulation
		let dom = await JSDOM.fromFile(templatePath);
		let doc = dom.window.document;

		appendMetas(doc, metas);

		// Get and set the title tag
		let title = doc.head.querySelector('title');
		title.textContent = og_title.content;

		// Send serialized document
		res.send(dom.serialize());
	} catch (e) {
		res.sendFile(templatePath);
	}

});

app.get('/article/:slug', async (req, res, next) => {

	const templatePath = path.resolve(__dirname, './build', 'index.html');

	const slug = req.params.slug;

	// Format default meta values
	let og_title = { property: 'og:title', content: undefined },
		og_description = { property: 'og:description', content: undefined },
		og_url = { name: 'og:url', content: `${appRoot}/page/${slug}` },
		og_site_name = { name: 'og:site_name', content: `${appName}` },
		og_locale = { name: 'og:locale', content: 'en_US' },
		description = { name: 'description', content: og_description.content },
		og_image = { property: 'og:image', content: undefined },
		og_type = { property: 'og:type', content: 'article' };

	let metas = [ og_type, og_url, og_site_name, og_locale, og_title, og_description, description, og_image ];

	// Set from api, specific values for metas
	try {
		await getArticleMetas(slug, metas)

		// Load dom from template for manipulation
		let dom = await JSDOM.fromFile(templatePath);
		let doc = dom.window.document;

		appendMetas(doc, metas);

		// Get and set the title tag
		let title = doc.head.querySelector('title');
		title.textContent = og_title.content;

		// Send serialized document
		res.send(dom.serialize());
	} catch (e) {
		res.sendFile(templatePath);
	}

});

app.use(express.static(path.resolve(__dirname, './build')));

app.get('*', (req, res) => {
	const templatePath = path.resolve(__dirname, './build', 'index.html');
	res.sendFile(templatePath);
});

app.listen(port, () => console.log(`Listening on port ${port}`));