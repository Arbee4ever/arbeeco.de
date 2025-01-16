<script lang="ts">
	import { marked } from 'marked';

	export let data;
</script>

<div class="markdown-body">
	{@html marked(data.markdown)}
</div>

<style lang="scss">
	:global .markdown-body {
		a {
			color: #00BFFF;

			&:hover {
				text-shadow: 0 0 20px #00BFFF;
			}
		}
	}
</style>