<script lang="ts">
	import type { PageData } from './$types';
	import Markdown from '$lib/components/blog/Markdown.svelte';
	import Mod from '$lib/components/blog/Mod.svelte';
	import Image from '$lib/components/blog/Image.svelte';
	import ModBody from '$lib/components/blog/ModBody.svelte';
	import DownloadButton from '$lib/components/blog/DownloadButton.svelte';
	import { marked } from 'marked';
	import { browser } from '$app/environment';
	import striptags from 'striptags';
	import { loadModData } from '$lib/js/helpers';

	export let data: PageData;
	let post = data.post;

	const image = post.image;
	const img = post.content.find((el) => el.type === 'image');
	const text = post.content.find((el) => el.type === 'text');
	const mod = post.content.find((el) => el.type === 'mod');
	const modBody = post.content.find((el) => el.type === 'modbody');

	const Components = {
		text: Markdown,
		mod: Mod,
		image: Image,
		modbody: ModBody
	};

	async function loadDescription(slug) {
		if (browser) {
			let response = await loadModData(slug);
			let body = await marked(response.body);
			return shorten(body);
		}
	}

	function shorten(body: string) {
		body = striptags(body);
		const LINEBREAK = /(\r\n|\n|\r)/gm;
		const WHITESPACE = /\s+/;
		body = body.replace(LINEBREAK, '');
		const maxLength = 20;
		if (body.split(WHITESPACE).length > maxLength + 1) {
			body = body.split(WHITESPACE).slice(0, maxLength).join(' ') + '...';
		}
		return body;
	}
</script>

<svelte:head>
	<title>{post.title.toUpperCase()} | ARBEE</title>
	<meta property="og:title" content="{post.title.toUpperCase()} | ARBEE" />
	{#if post.category.key === "mcmod"}
		<meta name="twitter:card" content="summary" />
	{:else}
		<meta name="twitter:card" content="summary_large_image" />
	{/if}
	{#if text !== undefined}
		{#await marked(text.markdown) then content}
			<meta name="twitter:description" content="{shorten(content)}" />
			<meta property="og:description" content="{shorten(content)}" />
		{/await}
	{:else if modBody || mod !== undefined}
		{#await loadDescription((modBody ?? mod).slug) then content}
			<meta name="twitter:description" content="{content}" />
			<meta property="og:description" content="{content}" />
		{/await}
	{/if}
	{#if post.image}
		<meta property="og:image" content="{post.image.src}" />
	{:else if modBody || mod !== undefined}
		{#await loadModData((modBody ?? mod).slug) then mod}
			<meta property="og:image" content="{mod.icon_url}" />
		{/await}
	{:else if img}
		<meta property="og:image" content="{img.src}" />
	{/if}
	<meta property="og:published_time " content="{post.date}" />
</svelte:head>

<div class="post">
	{#if post.image}
		<img class="postImg" src={post.image.src} alt={post.image.alt}>
	{:else if modBody || mod !== undefined}
		<iframe class="postImg" title="Website generating Image for mod from modrinth"
						src="/genImg?p={(modBody ?? mod).slug}"></iframe>
	{:else if img !== undefined}
		<img class="postImg" src={img.src} alt={img.alt}>
	{/if}
	<div class="postData">
		<div class="postAbout">
			<a href={post.authors[0].url} target="_blank">
				<img class="authorImg" src={post.authors[0].image.src} alt={post.authors[0].image.alt}>
			</a>
			<p>Author:</p>
			<a class="authorName" href={post.authors[0].url} target="_blank">{post.authors[0].name}</a>
			<br>
			<p>Published:</p>
			<p class="postDate">{new Date(post.date).toLocaleDateString("en-GB", {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
			})}</p>
		</div>
		<article class="postContent">
			<a class="postCategory" href="/blog?c={post.category.key}">{post.category.name}</a>
			<h1 class="postTitle">{post.title}</h1>
			{#if modBody !== undefined}
				<div class="download">
					<DownloadButton mod={modBody}></DownloadButton>
				</div>
			{/if}
			<p class="postText">
				{#each post.content as item}
					<svelte:component this={Components[item.type]} data={item}></svelte:component>
				{/each}
			</p>
		</article>
	</div>
</div>

<style lang="scss">
	.post {
		width: 80vw;
		margin: auto;
		display: flex;
		flex-direction: column;
		gap: 2vh;

		.postImg {
			width: 100%;
			border-radius: 10px;
			border: none;

			&:is(img) {
				object-fit: cover;
			}

			&:is(iframe) {
				height: 30vh;
			}
		}

		.postData {
			display: flex;
			gap: 1vw;
			position: relative;

			.postAbout {
				line-height: 20px;
				padding: 1vw 0;
				height: fit-content;
				border-radius: 10px;
				text-align: center;
				background: rgba(0, 0, 0, 0.25);
				box-shadow: 0 0 32px 0 rgba(0, 0, 0, 0.37);
				min-width: 10vw;
			}

			.postContent {
				margin-left: auto;
				margin-right: auto;
				display: flex;
				flex-direction: column;
				gap: 1vh;

				.postCategory {
					text-transform: uppercase;
				}

				.postTitle {
					text-transform: uppercase;
					margin: 0 0 1vh;
				}

				.postText {
					display: flex;
					flex-direction: column;
					gap: 1vh;
					line-height: 1.6;
				}

				.download {
					position: absolute;
					top: 0;
					right: 0;
				}
			}

			@media only screen and (max-width: 1075px) {
				flex-direction: column;

				.postContent {
					.download {
						position: relative;
					}
				}
			}

			.authorImg {
				width: 5vw;
				border-radius: 100%;
			}
		}
	}
</style>