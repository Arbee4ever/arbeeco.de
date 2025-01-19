<script lang="ts">
	import '$lib/css/normalize.css';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	const project = $page.url.searchParams.get('p');

	let modimg: HTMLImageElement;

	onMount(async () => {
		await fetch('https://api.modrinth.com/v2/project/' + project, {
			'Accept': 'application/json',
			method: 'GET',
			'User-Agent': 'https://github.com/Arbee4ever/arbeeco.de (arbeeco.de)'
		})
			.then(async response => {
				let json = await response.json();
				modimg.crossOrigin = 'Anonymous';
				modimg.src = json.icon_url;
				modimg.onload = function() {
					const context = document.createElement('canvas').getContext('2d')!;
					context.drawImage(modimg, 1, 1, 100, 100);
					const { data } = context.getImageData(1, 1, 1, 1);
					document.body.style.backgroundColor = 'rgb(' + data[0] + ',' + data[1] + ',' + data[2] + ')';
				};
			});
	});
</script>

<svelte:head>
	<title>Blog Image generator | ARBEE</title>
</svelte:head>

<div id="imgdiv">
	<img id="modimg" bind:this={modimg} alt="" src="">
</div>
<img id="quiltimg" alt="Available for Quilt"
		 src="https://raw.githubusercontent.com/intergrav/devins-badges/c3978d683c857458fbd4f7fb609b197a3aeb6ec1/badges/quilt_vector.svg">
<img id="modrinthimg" alt="Available on Modrinth"
		 src="https://raw.githubusercontent.com/intergrav/devins-badges/c3978d683c857458fbd4f7fb609b197a3aeb6ec1/badges/modrinth_vector.svg">

<style lang="scss">
	#quiltimg, #modrinthimg {
		height: 15vh;
		position: absolute;
	}

	#quiltimg {
		right: 1vw;
		bottom: 1vw;
	}

	#modrinthimg {
		bottom: 1vw;
		left: 1vw;
	}

	#imgdiv {
		width: 100vw;
		height: 100vh;
		text-align: center;
		line-height: 100vh;

		#modimg {
			vertical-align: middle;
			height: 50vh;
		}
	}
</style>