<script lang="ts">
	import { marked } from 'marked';

	export let data
</script>

<img src={data.src} style={data.style}>

<style lang="scss">
	img {
		width: fit-content;
		max-width: 100%;
		border-radius: 1vw;
		box-shadow: 0 0 32px 0 rgba(0, 0, 0, 0.37);
	}
</style>