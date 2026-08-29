<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/stores';
	import globalStylesheet from './../lib/css/global.scss?url'
	import normalizeStylesheet from './../lib/css/normalize.css?url'
</script>

<svelte:head>
	<title>{$page.status} | ARBEE</title>
	<link rel="stylesheet" href={globalStylesheet} />
	<link rel="stylesheet" href={normalizeStylesheet} />
</svelte:head>

<Header></Header>
<main>
	<div id="notFound">
		<h1>{$page.status}</h1>

		<p><strong>{$page.status == 404 ? "Page not found :(" : $page.error?.message}</strong></p>
		{#if $page.status == 404}
			<p>The requested page could not be found.</p>
		{/if}
	</div>
</main>
<Footer></Footer>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		min-height: 90vh;
	}

	#notFound {
		position: absolute;
		top: 50%;
		transform: translate(0, -50%);
		width: 100%;
		text-align: center;
		font-size: 150%;
		color: hsl(0, 0%, 100%);
	}
</style>