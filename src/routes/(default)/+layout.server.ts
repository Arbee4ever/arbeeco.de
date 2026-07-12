import { getPosts } from '$lib/js/collections';
import { loadModData } from '$lib/js/helpers';

/** @type {import('./$types').PageServerLoad} **/
export async function load({ params }) {
	return {
		posts: getPosts(params.title)
	};
}
