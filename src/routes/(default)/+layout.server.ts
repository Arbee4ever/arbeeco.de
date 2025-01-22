import { getPosts } from '$lib/js/collections';
import { loadModData } from '$lib/js/helpers';

/** @type {import('./$types').PageServerLoad} **/
export async function load({params}) {
	let posts = getPosts(params.title);

	if(params.title != undefined) {
		posts.content = await posts.content.reduce(
			async (acc: Array<object>, cur: { type: string; slug: string }) => {
				if (cur.type !== 'mod' && cur.type !== 'modbody') return acc.push(cur);
				acc.push({ type: cur.type, ...(await loadModData(cur.slug)) });
				return acc;
			},
			[]
		);
	}

	return {
		posts
	};
}
