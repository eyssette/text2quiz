<script>
	import { onMount } from 'svelte';
	import {ip} from './stores.js';
	onMount(async () => {
		const ipGET = await fetch('https://httpbin.org/ip', {
			method: 'GET'
		})		
		const ipJSON = await ipGET.json()
		$ip = ipJSON.origin;
	});
</script>