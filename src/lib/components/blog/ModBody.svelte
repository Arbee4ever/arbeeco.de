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

<div>
	{#await loadModData(data.slug) then mod}
		{@html marked(mod.body)}
	{/await}
</div>