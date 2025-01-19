<script lang="ts">
	import { marked } from 'marked';
	import { browser } from '$app/environment';

	export let data;

	async function loadModData(slug) {
		if (browser) {
			let req = await fetch('https://api.modrinth.com/v2/project/' + slug);
			return await req.json();
		}
	}
</script>

<div class="mod-body">
	{#await loadModData(data.slug) then mod}
		{@html marked(mod.body)}
	{/await}
</div>

<style lang="scss">
	.mod-body {
		:global img {
			width: fit-content;
			max-width: 100%;
			border-radius: 1vw;
			box-shadow: 0 0 32px 0 rgba(0, 0, 0, 0.37);
		}
	}
</style>