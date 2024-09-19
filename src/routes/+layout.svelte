<script lang="ts">
	import "$lib/css/global.scss";
	import "$lib/css/normalize.css";
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ArbeeLogo from "$lib/img/2022-01_ARBEE_Bild-Marke_rgb_Verlauf_01.png"
</script>

<svelte:head>
	<meta charset="utf-8" />
	<title>A Я B E E</title>
	<meta name="description"
				content="I (ARBEE) am a german guy who likes programming fun things. I'm creating Minecraft mods and Websites with Svelte.">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="icon" href={ArbeeLogo}>
	<link rel="canonical" href="https://arbeeco.de">
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="@ARBEE_codes" />
	<meta name="twitter:creator" content="@ARBEE_codes" />
	<meta property="og:url" content="https://arbeeco.de" />
	<meta property="og:title" content="ARBEE" />
	<meta property="og:description"
				content="I (ARBEE) am a german guy who likes programming fun things. I'm creating Minecraft mods and Websites with Svelte." />
	<meta property="og:image"
				content="https://arbeeco.de/authorImg/2022-01_ARBEE_Bild-Marke_rgb_weiss_bg_verlauf_01.png" />
	<meta name="theme-color" content="#2b8eaf" />
	<meta name="keywords" content="Blog, Modding, Gamedev, Arbee, GitHub">
</svelte:head>

<Header></Header>
<slot></slot>
<Footer></Footer>