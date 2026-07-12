<script lang="ts">
	import { afterUpdate } from 'svelte';
	import { Components, parseComponents } from '$lib/js/markdownComponents';
	import { marked } from 'marked';

	export let data: { markdown: string };

	let markdownBody: HTMLDivElement | null = null;

	data.markdown = parseComponents(data.markdown);

	type ComponentKey = keyof typeof Components;
	type ComponentToken = {
		type: ComponentKey;
		data: string;
	};

	function mountComponents() {
		if (!markdownBody) return;

		const placeholders = markdownBody.querySelectorAll<HTMLElement>('[data-token]:not([data-mounted])');
		placeholders.forEach((target) => {
			const token = target.dataset.token;
			if (!token) return;
			const json = JSON.parse(token) as Partial<ComponentToken>;
			if (!json.type || !json.data || !(json.type in Components)) return;

			target.dataset.mounted = 'true';

			const component = Components[json.type];
			const key = component.prop;
			new component.component({
				target,
				//@ts-expect-error
				props: { [key]: component.transform(json.data) },
				hydrate: true
			});
		});
	}

	afterUpdate(() => {
		mountComponents();
	});
</script>

<div bind:this={markdownBody} class="markdown-body">
	{@html marked(data.markdown)}
</div>

<style lang="scss">
	:global .markdown-body {
		p > a {
			color: #00BFFF;

			&:hover {
				text-shadow: 0 0 20px #00BFFF;
			}
		}
	}
</style>