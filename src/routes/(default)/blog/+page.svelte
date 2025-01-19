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

<svelte:head>
	<title>A Я B E E | BLOG</title>
	<meta name="twitter:card" content="summary" />
	<meta property="og:description" content="Read about stuff ARBEE is doing or thinking about technical, political or any other stuff." />
	<meta property="og:title" content="A Я B E E | BLOG" />
	<meta property="og:image"
				content="https://arbeeco.de/authorImg/2022-01_ARBEE_Bild-Marke_rgb_weiss_bg_verlauf_01.png" />
</svelte:head>

<BlogSection {posts} all={true}></BlogSection>

<style lang="scss">
</style>