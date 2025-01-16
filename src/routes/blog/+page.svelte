<script lang="ts">
	import type { PageData } from './$types';
	import BlogSection from '$lib/components/BlogSection.svelte';

	export let data: PageData;
	let posts = data.posts;
</script>

<BlogSection {posts} all={true}></BlogSection>

<style lang="scss">
</style>