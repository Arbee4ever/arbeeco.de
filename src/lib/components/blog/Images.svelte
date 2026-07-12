<script lang="ts">

	export let src: string[];

	let rootFloor = Math.floor(Math.sqrt(src.length));
	let rootCeil = Math.ceil(Math.sqrt(src.length));
</script>

<div class="images" style="--root-floor: {rootFloor}; --root-ceil: {rootCeil}; --img-num: {src.length}">
	{#if src}
		{#each src as image}
			<img src={image} alt="">
		{/each}
	{/if}
</div>

<style lang="scss">
	.images {
		display: grid;
		width: 100%;
		grid-template-columns: repeat(var(--root-floor), 1fr);
		grid-template-rows: repeat(var(--root-ceil), 1fr);
		gap: 2vh;

		img {
			width: 100%;
			border-radius: 1vw;
			box-shadow: 0 0 32px 0 rgba(0, 0, 0, 0.37);
		}
	}
</style>