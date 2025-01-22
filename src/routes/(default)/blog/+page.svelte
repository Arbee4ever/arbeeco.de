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
	<meta name="twitter:description" content="Read about stuff ARBEE is doing or thinking about technical or any other stuff." />
	<meta property="og:description" content="Read about stuff ARBEE is doing or thinking about technical or any other stuff." />
	<meta property="og:title" content="A Я B E E | BLOG" />
	<meta name="twitter:image"
				content="https://arbeeco.de/img/2022-01_ARBEE_Bild-Marke_rgb_Verlauf_01.png" />
	<meta property="og:image"
				content="https://arbeeco.de/img/2022-01_ARBEE_Bild-Marke_rgb_Verlauf_01.png" />
</svelte:head>

<BlogSection {posts} all={true}></BlogSection>

<style lang="scss">
</style>