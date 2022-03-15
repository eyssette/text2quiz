<script>
	import {darkmode} from './stores'
	const title = 'Quiz';
	import {onMount} from 'svelte'
	onMount(async () => {
	if(window.matchMedia('(prefers-color-scheme: dark)').matches) {$darkmode=true}
	})
</script>

<svelte:head>	
	<title>{title}</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css">
	<link href="./favicon.ico" rel="icon" type="image/x-icon" />
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<link href="https://cdn.jsdelivr.net/npm/@creativebulma/bulma-tooltip@1.2.0/dist/bulma-tooltip.min.css" rel="stylesheet">
	{#if $darkmode}
		<link href="./darkmode.min.css" rel="stylesheet">
	{/if}
	<link href="https://cdn.jsdelivr.net/npm/bulma-checkradio@2.1.3/dist/css/bulma-checkradio.min.css" rel="stylesheet">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css" integrity="sha384-MlJdn/WNKDGXveldHDdyRP1R4CTHr3FeuDNfhsLPYrq2t0UBkUdK2jyTnXPEK1NQ" crossorigin="anonymous">
</svelte:head>