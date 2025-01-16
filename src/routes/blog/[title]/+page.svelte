<script lang="ts">
	import type { PageData } from './$types';
	import Markdown from '$lib/components/blog/Markdown.svelte';
	import Mod from '$lib/components/blog/Mod.svelte';
	import Image from '$lib/components/blog/Image.svelte';
	import ModBody from '$lib/components/blog/ModBody.svelte';
	import DownloadButton from '$lib/components/blog/DownloadButton.svelte';

	export let data: PageData;
	let post = data.post;

	const img = post.content.find((el) => el.type === 'image');
	const mod = post.content.find((el) => el.type === 'mod');
	const modBody = post.content.find((el) => el.type === 'modbody');

	const Components = {
		text: Markdown,
		mod: Mod,
		image: Image,
		modbody: ModBody
	};
</script>

<div class="post">
	{#if modBody !== undefined}
		<iframe class="postImg" frameBorder="0" title="Website generating Image for mod from modrinth"
						src="https://arbeeco.de/genImg?p={modBody.slug}"></iframe>
	{:else if post.image}
		<img class="postImg" src={post.image.src} alt={post.image.alt}>
	{:else if mod !== undefined}
		<iframe class="postImg" frameBorder="0" title="Website generating Image for mod from modrinth"
						src="https://arbeeco.de/genImg?p={mod.slug}"></iframe>
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