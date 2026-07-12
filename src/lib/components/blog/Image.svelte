<script lang="ts">

	export let image;
</script>

<img src={image.src} style={image.style} alt={image.alt}>

<style lang="scss">
	img {
		width: fit-content;
		max-width: 100%;
		border-radius: 1vw;
		box-shadow: 0 0 32px 0 rgba(0, 0, 0, 0.37);
	}
</style>