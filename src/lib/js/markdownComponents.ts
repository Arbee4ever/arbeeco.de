import Mod from '$lib/components/blog/Mod.svelte';
import Images from '$lib/components/blog/Images.svelte';
import { Code } from 'lucide-svelte';

export const Components = {
	mod: {
		pattern: /!mod\[([^\]]*)]/,
		component: Mod,
		prop: 'slug',
		transform: (input: string) => input
	},
	images: {
		pattern: /!\(([^)]*)\)/,
		component: Images,
		prop: 'src',
		transform: (input: string) => input.split(',')
	},
	code: {
		pattern: /```([^`]*)```/,
		component: Code,
		prop: 'src',
		transform: (input: string) => input
	}
} as const;

export function parseComponents(markdown: string) {
	(Object.keys(Components) as Array<keyof typeof Components>).forEach((key) => {
		const component = Components[key];
		const pattern = new RegExp(component.pattern, 'g');
		markdown.matchAll(pattern).forEach((match) => {
			const token = {
				type: key,
				data: match[1]
			};
			markdown = markdown.replace(match[0], `<div data-token='${JSON.stringify(token)}'></div>`);
		});
	});
	return markdown;
}