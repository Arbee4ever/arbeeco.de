import Mod from '$lib/components/blog/Mod.svelte';
import Images from '$lib/components/blog/Images.svelte';
import Code from '$lib/components/blog/Code.svelte';
import type { Field } from '@sveltia/cms';

type Component = {
	pattern: RegExp;
	component: any;
	label: string;
	icon: string;
	fields: Field[];
	transform: (input: string) => any;
	markdown: (data: any) => string;
};

export const Components: { [key: string]: Component } = {
	mod: {
		pattern: /!mod\[([^\]]*)]/,
		component: Mod,
		label: 'Mod',
		icon: 'deployed_code',
		fields: [
			{
				name: 'slug',
				label: 'Modrinth-Slug',
				widget: 'string'
			}
		],
		transform: (input: string) => ({ slug: input }),
		markdown: (data) => `!mod[${data.slug}]`
	},
	images: {
		pattern: /!\(([^)]*)\)/,
		component: Images,
		label: 'Images',
		icon: 'image',
		fields: [
			{
				name: 'src',
				label: 'Source',
				widget: 'image',
				multiple: true
			}
		],
		transform: (input: string) => ({ src: input.split(',') }),
		markdown: (data) => `!(${data.src})`
	},
	code: {
		pattern: /!code\[([^\]]*)]/,
		component: Code,
		label: 'Code',
		icon: 'code',
		fields: [
			{
				name: 'src',
				label: 'Source',
				widget: 'code'
			}
		],
		transform: (input: string) => {
			console.log("input", input);
			return ({ src: { code: input, lang: 'plain' } })
		},
		markdown: (data) => `!code[${JSON.stringify(data)}]`
	}
} as const;

export function parseComponents(markdown: string) {
	(Object.keys(Components) as Array<keyof typeof Components>).forEach((key) => {
		const component = Components[key];
		const pattern = new RegExp(component.pattern, 'g');
		markdown.matchAll(pattern).forEach((match) => {
			const token = {
				type: key,
				value: match[1]
			};
			markdown = markdown.replace(match[0], `<div data-token='${JSON.stringify(token)}'></div>`);
		});
	});
	return markdown;
}