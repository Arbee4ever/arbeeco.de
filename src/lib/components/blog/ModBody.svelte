<script lang="ts">
	import { marked } from 'marked';

	export let data;
</script>

<div class="mod-body">
	{@html marked(data.body)}
</div>

<style lang="scss">
	.mod-body {
		:global img {
			width: fit-content;
			max-width: 100%;
			border-radius: 1vw;
			box-shadow: 0 0 32px 0 rgba(0, 0, 0, 0.37);
		}
	}
</style>