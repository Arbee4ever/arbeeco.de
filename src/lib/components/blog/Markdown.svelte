<script lang="ts">
	import { afterUpdate } from 'svelte';
	import { Components, parseComponents } from '$lib/js/markdownComponents';
	import { marked } from 'marked';

	export let data: { markdown: string };

	let markdownBody: HTMLDivElement | null = null;

	data.markdown = parseComponents(data.markdown);

	function mountComponents() {
		if (!markdownBody) return;

		const placeholders = markdownBody.querySelectorAll<HTMLElement>('[data-token]:not([data-mounted])');
		placeholders.forEach((target) => {
			const token = target.dataset.token;
			if (!token) return;
			const json = JSON.parse(token) as { type?: string; value?: Object };
			if (!json.type || !(json.type in Components)) return;

			const componentType = json.type as keyof typeof Components;
			const componentConfig = Components[componentType];
			if (!componentConfig || typeof json.value === 'undefined') return '';

			new componentConfig.component({
				target,
				props: json.value,
				hydrate: true
			});

			target.dataset.mounted = 'true';
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