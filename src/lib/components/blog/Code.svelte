<script lang="ts">
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';
	import { LucideCopy } from 'lucide-svelte';

	export let src: { code: string, lang: string };

	let source = '';
	if (hljs.getLanguage(src.lang)) {
		source = hljs.highlight(src.code, { language: src.lang }).value;
	} else {
		source = hljs.highlightAuto(src.code).value;
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(src.code).then(() => {
			console.log('Code copied to clipboard');
		}).catch((err) => {
			console.error('Could not copy code: ', err);
		});
	}
</script>

<div class="code language-{src.lang}">
	{@html source}
	<span class="corner">
		<button class="copy" on:click={copyToClipboard}>
			<span>COPY</span>
			<LucideCopy size="1em" strokeWidth={3} color="white" />
		</button>
		{#if hljs.getLanguage(src.lang) != undefined}
			<span class="lang">
				{src.lang}
			</span>
		{/if}
	</span>
</div>

<style lang="scss">
	.code {
		padding: 1em;
		height: fit-content;
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.25);
		box-shadow: 0 0 32px 0 rgba(0, 0, 0, 0.37);
		position: relative;
		white-space: pre;

		.corner {
			top: 0;
			right: 0;
			position: absolute;
			height: 1em;
			text-transform: uppercase;
			background: rgba(0, 0, 0, 0.30);
			border-radius: 0 10px 0 10px;
			font-size: 0.75em;
			padding: 0.25em;
			line-height: 1em;

			.copy {
				all: unset;
				cursor: pointer;
			}
		}
	}
</style>