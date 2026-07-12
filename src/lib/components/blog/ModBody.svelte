<script lang="ts">
	import { marked } from 'marked';
	import { loadModData } from '$lib/js/helpers';

	export let slug: string;
</script>

<div class="mod-body">
	{#if slug}
		{#await loadModData(slug)}
			<p>Loading mod data...</p>
		{:then mod}
			{@html marked(mod.body)}
		{/await}
	{/if}
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