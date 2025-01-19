import { getLink } from '$lib/js/collections';
import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { goto } from '$app/navigation';

export const load: PageLoad = ({ params }) => {
	let link = getLink(params.name);
	if (link === null) return error(404, 'Not Found');
	redirect(308, link.url);
};
