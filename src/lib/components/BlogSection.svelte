<script lang="ts">
	import { marked } from 'marked';
	import striptags from 'striptags';
	import tilt from 'svelte-tilt';
	import { browser } from '$app/environment';

	export let posts: any[];
	export let all = false;

	let maxPosts = 3;

	function moreLink(e) {
		maxPosts += 3;
		if (maxPosts == 9 || maxPosts == posts.length) {
			e.target.href = '/blog';
		}
	}

	async function loadDescription(slug) {
		if (browser) {
			let req = await fetch('https://api.modrinth.com/v2/project/' + slug);
			let response = await req.json();
			let body = await marked(response.body);
			body = striptags(body);
			const LINEBREAK = /(\r\n|\n|\r)/gm;
			body = body.replace(LINEBREAK, '');
			const maxLength = 200;
			if (body.split('').length > maxLength + 1) {
				body = body.split('').slice(0, maxLength).join('') + '...';
			}
			return body;
		}
	}
</script>

<section id="blog">
	<div class="posts">
		{#each posts.slice(0, all ? posts.length : maxPosts) as post, i}
			{@const heroImg = post.content.find(el => el.hero === true)}
			{@const img = post.content.find((el) => el.type === "image")}
			{@const text = post.content.find((el) => el.type === "text")}
			{@const mod = post.content.find((el) => el.type === "mod")}
			{@const modBody = post.content.find((el) => el.type === "modbody")}
			<div class="post" use:tilt={{ scale: 0.95, strength: 0.25 }} class:wide={all && i === 0}>
				<div class="postAbout">
					<a href="{post.authors[0].url}" target="_blank">
						<img class="authorImg" src="{post.authors[0].image.src}" alt={post.authors[0].image.alt}>
					</a>
					<a class="authorName" href="{post.authors[0].url}" target="_blank">{post.authors[0].name}</a>
					<p class="postDate">{new Date(post.date).toLocaleDateString("en-GB", {
						year: 'numeric',
						month: 'short',
						day: 'numeric',
					})}</p>
				</div>
				<h3 class="postCategory">
					<a href="/blog?c={post.category.key}">{post.category.name}</a>
				</h3>
				<a class="postLink" href="/blog/{post.collName}">
					<div class="postContent">
						{#if post.image}
							<img class="postImg" src={post.image.src} alt={post.image.alt}>
						{:else if modBody !== undefined}
							<iframe class="postImg" frameBorder="0" title="Website generating Image for mod from modrinth"
											src="https://arbeeco.de/genImg?p={modBody.slug}"></iframe>
						{:else if mod}
							<iframe class="postImg" title="Website generating Image for mod from modrinth"
											src="https://arbeeco.de/genImg?p={mod.slug}"></iframe>
						{:else if img}
							<img class="postImg" src={img.src} alt={img.alt}>
						{/if}
						<div class="postSummary">
							<h2 class="postTitle">{post.title}</h2>
							{#if text !== undefined}
								{#await marked(text.markdown) then content}
									<p class="postPreview">{@html striptags(content)}</p>
								{/await}
							{:else if mod !== undefined}
								{#await loadDescription(mod.slug) then content}
									<p class="postPreview">{@html marked(content)}</p>
								{:catch error}
									{error}
								{/await}
							{/if}
						</div>
					</div>
				</a>
			</div>
		{/each}
	</div>
	{#if !all}
		<div class="miscLinks">
			<a on:click={moreLink} on:keydown={moreLink}>MORE</a>
			<a class="seeAll" href="/blog">SEE ALL</a>
		</div>
	{/if}
</section>

<style lang="scss">
	.posts {
		margin: 2vw;
		display: grid;
		gap: 1vw 1vw;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: 1fr;

		/*medium screens (tablets)*/
		@media only screen and (max-width: 1024px) {
			& {
				grid-template-columns: repeat(2, 1fr);
			}
		}

		/*small screens (phones)*/
		@media only screen and (max-width: 480px) {
			& {
				grid-template-columns: 1fr;

				.wide {
					grid-column: span 1;

					.postContent {
						flex-direction: column;
					}
				}
			}
		}

		.post {
			height: 100%;
			background: #1a1a1a99;
			border-radius: 10px;
			background: rgba(0, 0, 0, 0.25);
			box-shadow: 0 0 32px 0 rgba(0, 0, 0, 0.37);

			/*everything but small screens (phones)*/
			@media only screen and (min-width: 481px) {
			}

			.postAbout {
				margin: 3px;
				height: 4vh;
				align-content: center;
				background: rgba(0, 0, 0, 0.25);
				box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
				border-radius: 10px;

				.authorImg {
					border-radius: 100%;
					margin: 0.5vh;
					float: left;
					height: 3vh;
				}

				.authorName {
					float: left;
					height: 4vh;
					line-height: 4vh;
				}

				.postDate {
					margin-right: 1vw;
					line-height: 4vh;
					float: right;
				}
			}

			.postCategory {
				text-shadow: 0 0 20px black;
				margin: 1vw;
				position: absolute;
			}

			.postContent {
				border-radius: 0 0 10px 10px;
				margin: 0 3px 3px;

				.postImg {
					width: 100%;
					aspect-ratio: 16/9;
					object-fit: cover;
					background: rgba(0, 0, 0, 0.25);
					box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
					border-radius: 10px;
					pointer-events: none;
					border: none;
				}

				.postSummary {
					.postTitle {
						margin: 2vh 1vw 1vw;
						text-transform: uppercase;
					}

					.postPreview {
						margin: 2vh 1vw 1vw;
					}
				}
			}

			&.wide {
				grid-column: 1 / -1;

				.postContent {
					display: flex;
					flex-direction: row;

					.postImg {
						max-width: 50%;
						aspect-ratio: 16/9;
					}

					.postSummary {
						min-width: 50%;
					}
				}
			}
		}
	}

	.miscLinks {
		letter-spacing: 0.2vw;
		font-size: 2vh;
		position: relative;
		text-align: center;
		display: flex;
		align-items: center;
		flex-direction: column;
		margin-top: 8vh;
		gap: 5vh;

		a {
			width: fit-content;
			cursor: pointer;

			&:hover {
				color: #00BFFF;
				text-shadow: 0 0 20px #00BFFF;
			}
		}
	}
</style>