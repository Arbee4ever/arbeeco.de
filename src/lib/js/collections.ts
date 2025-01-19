import _ from 'lodash';
import { trimSuffix } from '$lib/js/helpers';

// vite-import YAML-files defining CMS-content
let files = import.meta.glob('/content/**/*.yml', { eager: true });
let collections = globImportToCollections(files);

/**
 * Takes the return-value of an eager vite-globImport from the CMS-files and converts it to an object of collections
 *
 * @param globImport Record<string,any> returned from `import.meta.glob("<GLOB-PATTERN>", { eager: true });`
 */
function globImportToCollections(
	globImport: Record<string, any>
): Record<string, Record<string, any>> {
	let collections: Record<string, Record<string, any>> = {};
	for (const path in globImport) {
		let collType, collName;
		[collType, collName] = path.split('/').slice(2);
		if (collName.endsWith('.yml')) {
			collName = trimSuffix(collName);
			_.merge(collections, {
				[collType]: { [collName]: { ...globImport[path].default, collName } }
			});
		} else {
			if (!collections[collType]?.assets) {
				collections[collType] = { assets: [] };
			}
			collections[collType].assets.push(globImport[path].default);
		}
	}
	return collections;
}

export function getPosts() {
	let posts = _.cloneDeep(Object.values(collections.posts));
	for (let post of posts) {
		post.authors = post.authors.reduce((acc: Array<object>, author: string) => {
			acc.push(getAuthor(author));
			return acc;
		}, []);
		post.category = getCategory(post.category);
	}
	posts.sort((a, b) => {
		return new Date(b.date).valueOf() - new Date(a.date).valueOf();
	});
	return posts;
}

export function getPost(title: string) {
	if (!collections.posts) return null;
	let post = _.cloneDeep(collections.posts[title]);
	if (!post) return null;
	post.authors = post.authors.reduce((acc: Array<object>, author: string) => {
		acc.push(getAuthor(author));
		return acc;
	}, []);
	post.category = getCategory(post.category);
	return post;
}

export function getAuthors() {
	if (!collections.authors) return [];
	return Object.values(collections.authors);
}

export function getAuthor(name: string) {
	if (!collections.authors) return null;
	let author = collections.authors[name];
	if (!author) return null;
	return author;
}

function getCategory(key: string) {
	if (!collections.categories) return null;
	let category = collections.categories[key];
	if (!category) return null;
	return category;
}

export function getLink(key: string) {
	if (!collections.links) return null;
	let category = collections.links[key];
	if (!category) return null;
	return category;
}