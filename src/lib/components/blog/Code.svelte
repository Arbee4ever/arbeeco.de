<script lang="ts">
	export let src: { code: string, lang: string };
	console.log('src', src);
</script>

<p>{JSON.stringify(src)}</p>