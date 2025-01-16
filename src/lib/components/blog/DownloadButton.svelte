<script lang="ts">
	import { SquareArrowOutUpRight } from 'lucide-svelte';

	export let mod;
</script>

<a class="download" href="https://modrinth.com/project/{mod.slug}" target="_blank">
	<span>
		<SquareArrowOutUpRight />
		Download
	</span>
</a>

<style lang="scss">
	.download {
		background-color: white;
		color: black;
		padding: 1vw;
		border-radius: 0.5vw;
		text-align: center;
		align-content: center;
		display: block;

		span {
			width: max-content;
		}

		/*medium screens (tablets)*/
		@media only screen and (max-width: 800px) {
			width: calc(100% - 2vw);
			height: 5vh;
		}
	}
</style>