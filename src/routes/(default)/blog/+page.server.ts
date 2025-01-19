import { getPosts } from '$lib/js/collections';

/** @type {import('./$types').PageServerLoad} **/
export async function load() {
	let posts = getPosts();

	return {
		posts
	};
}
