<script lang="ts">
	import { marked } from 'marked';
	import striptags from 'striptags';
	import { Download, Heart } from 'lucide-svelte';
	import DownloadButton from '$lib/components/blog/DownloadButton.svelte';

	export let data;

	const body = marked(data.body) as string;
</script>

<div class="mod">
	<img src={data.icon_url} alt={data.title}>
	<div class="info">
		<h2>{data.title}</h2>
		<p>{@html striptags(body)}</p>
		<div class="bottom">
			<div class="stats">
				<p>
					<Download /> {data.downloads}
				</p>
				<p>
					<Heart /> {data.followers}
				</p>
			</div>
			<DownloadButton mod={data} />
		</div>
	</div>
</div>

<style lang="scss">
	.mod {
		line-height: 20px;
		height: fit-content;
		max-height: 15vh;
		border-radius: 1vw;
		text-align: center;
		background: rgba(0, 0, 0, 0.25);
		box-shadow: 0 0 32px 0 rgba(0, 0, 0, 0.37), 0 0 32px 0 rgba(0, 0, 0, 0.37) inset;
		padding: 1vw;
		width: 50vw;
		display: flex;
		gap: 0.5vw;

		img {
			min-height: 100%;
			height: 100%;
			max-height: 15vh;
			max-width: 15vh;
			flex: 0 0 200px; /* Set fixed width for left element */
			width: min-content;
			aspect-ratio: 1/1;
			border-radius: 0.5vw;
		}

		.info {
			flex-grow: 0;
			text-align: initial;
			min-height: 100%;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			h2 {
				line-height: 1.2;
				margin: 0;
			}

			.bottom {
				display: flex;
				gap: 1vw;
				place-items: end;
				justify-content: space-between;

				p {
					display: inline-block;
				}
			}
		}

		/*medium screens (tablets)*/
		@media only screen and (max-width: 800px) {
			flex-direction: column;
			max-height: initial;
			width: initial;
			text-align: start;
			padding: 3vw;
			position: relative;

			.info {
				gap: 0.5vw;

				.bottom {
					flex-direction: column;

					.stats {
						position: absolute;
						right: 3vw;
						top: 3vw;
					}
				}
			}
		}
	}
</style>