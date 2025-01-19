<script lang="ts">
	import GithubLogo from '$lib/img/GitHub-Mark-Light-120px-plus.png?url';
	import DiscordLogo from '$lib/img/icon_clyde_circle_white.svg?url';
	import MailLogo from '$lib/img/MailLogoWhite.svg?url';
	import TwitterLogo from '$lib/img/TwitterLogoWhite.svg?url';
	import BlogIcon from '$lib/img/BlogIcon.svg?url';
	import CenterCross from '$lib/img/CenterCross.svg?url';
	import CenterCircle from '$lib/img/CenterCircle.svg?url';
	import { onMount } from 'svelte';
	import BlogSection from '$lib/components/BlogSection.svelte';

	import type {PageData} from "./$types";
	export let data: PageData;
	let posts = data.posts;

	let center: HTMLDivElement;
	let hovering = false;
	let unclickable = false;
	onMount(() => {
		hovering = center.matches(':hover');
		unclickable = !hovering;
	})

	function toggleHide(e) {
		hovering = e.type == "mouseenter";
		setTimeout(() => {
			unclickable = !hovering;
		}, 500);
	}
</script>

<main id="main">
	<div bind:this={center} class:bigger={hovering} role="main" class="center" on:mouseenter={toggleHide} on:mouseleave={toggleHide}>
		<img class:hide={hovering} src={CenterCircle} id="centerIcon" alt="Hover to show Contact options.">
		<img class:hide={!hovering} src={CenterCross} id="centerIcon2" class="hide"
				 alt="Stop hovering to hide Contact options.">
		<a href="/links/discord" class:unclickable target="_blank">
			<img class:hide={!hovering} src={DiscordLogo} class="button discord"
					 alt="Contact ARBEE over Discord." style="left: 39%; top: 15%;">
		</a>
		<a href="/links/twitter" class:unclickable target="_blank">
			<img class:hide={!hovering} src={TwitterLogo} class="button twitter"
					 alt="Contact ARBEE over Twitter" style="right: 15%; top: 39%">
		</a>
		<a href="/links/github" class:unclickable target="_blank">
			<img class:hide={!hovering} src={GithubLogo} class="button github"
					 alt="Contact ARBEE over GitHub." style="left: 15%; top: 39%;">
		</a>
		<a href="/links/email" class:unclickable target="_blank">
			<img class:hide={!hovering} src={MailLogo} class="button mail"
					 alt="Contact ARBEE over eMail." style="left: 39%; bottom: 15%;">
		</a>
	</div>
	<h1 id="description">I (ARBEE) am a german guy&nbsp;who&nbsp;likes&nbsp;programming&nbsp;fun&nbsp;things.
		<br>I'm creating Minecraft mods and&nbsp;Websites&nbsp;with&nbsp;Svelte.
	</h1>
	<a href="#blog" id="blogBtnDiv">
		<img class="blogBtn" src={BlogIcon} alt="Click to show blog.">
	</a>
</main>
<BlogSection {posts}></BlogSection>

<style lang="scss">
	/* @formatter:off */
	@keyframes transform {
		0%,
		100% { border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%; }
		14% { border-radius: 40% 60% 54% 46% / 49% 60% 40% 51%; }
		28% { border-radius: 54% 46% 38% 62% / 49% 70% 30% 51%; }
		42% { border-radius: 61% 39% 55% 45% / 61% 38% 62% 39%; }
		56% { border-radius: 61% 39% 67% 33% / 70% 50% 50% 30%; }
		70% { border-radius: 50% 50% 34% 66% / 56% 68% 32% 44%; }
		84% { border-radius: 46% 54% 50% 50% / 35% 61% 39% 65%; }
	}

	@keyframes movement {
		0%,
		100% { transform: translateY(0vh); }
		50% { transform: translateY(-2vh); }
	}
	/* @formatter:on */

	#hero {
		height: 100vh;
	}

	//TODO: refactor
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		min-height: 90vh;
	}

	.center {
		margin-top: 25vh;
		display: flex;
		justify-content: center;
		height: 25vh;
		width: 25vh;
		box-shadow: 0 0 20px #000;
		transition: height 0.4s ease-in-out, width 0.4s ease-in-out, margin-top 0.4s ease-in-out;
		background: -moz-linear-gradient(45deg, #2b8eaf 0%, #b222a8 100%);
		background: -webkit-linear-gradient(45deg, #2b8eaf 0%, #b222a8 100%);
		background: linear-gradient(45deg, #2b8eaf 0%, #b222a8 100%);
		animation: transform 50s ease-in-out infinite both alternate,
		movement 10s ease-in-out infinite both;
		position: absolute;
	}

	#centerIcon,
	#centerIcon2 {
		position: absolute;
		transition: height 0.4s ease-in-out, margin 0.4s ease-in-out, opacity 0.4s ease-in-out;
		height: 60%;
		margin: 20%;
		margin-left: auto;
		margin-right: auto;
		display: block;
		filter: drop-shadow(0 0 10px #00BFFF);
		-webkit-filter: drop-shadow(0 0 10px #00BFFF);
	}

	#centerIcon2 {
		pointer-events: none;
		filter: drop-shadow(0 0 10px #ff00ee);
		-webkit-filter: drop-shadow(0 0 10px #ff00ee);
	}

	.button {
		opacity: 0.75;
		transition: opacity 0.4s ease-in-out;
		margin: 1%;
		position: absolute;
		height: 6vh;
		width: 6vh;
	}

	.path {
		transition: fill 0.5s;
	}

	.discord:hover > .path {
		fill: #5865F2;
	}

	.twitter:hover > .path {
		fill: #1DA1F2;
	}

	.github:hover > .path {
		fill: black;
	}

	.mail:hover > .path {
		fill: #ffc861;
	}

	#blogBtnDiv {
		position: absolute;
		bottom: 0vh;
	}

	.blogBtn {
		height: 10vh;
		max-width: 6vh;
	}

	#description {
		font-weight: normal;
		line-height: 120%;
		font-size: 2vh;
		margin: 1vh;
		margin-top: 60vh;
		height: 5vh;
		text-align: center;
	}

	:global(.bigger) {
		margin-top: 22.5vh !important;
		height: 30vh !important;
		width: 30vh !important;
	}
</style>