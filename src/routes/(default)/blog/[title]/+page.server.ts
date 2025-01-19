import { getPost, getPosts } from '$lib/js/collections';

/** @type {import('./$types').PageServerLoad} **/
export async function load({params}) {
	let post = getPost(params.title);

	return {
		post
	};
}
