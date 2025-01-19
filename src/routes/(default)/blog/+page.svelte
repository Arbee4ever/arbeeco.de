<script lang="ts">
	import type { PageData } from './$types';
	import BlogSection from '$lib/components/BlogSection.svelte';
	import { page } from '$app/stores';

	export let data: PageData;
	let posts = data.posts;

	if ($page.url.searchParams.has("c")) {
		let category = $page.url.searchParams.get("c")
		posts = posts.filter(post => {
			console.log('post', post);
			return post.category.key == category;
		});
	}
</script>

<BlogSection {posts} all={true}></BlogSection>

<style lang="scss">
</style>