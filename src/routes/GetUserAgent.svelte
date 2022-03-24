<script>
	import { onMount } from 'svelte';
	import {userAgent} from './stores.js';
	onMount(async () => {
		const userAgentGET = await fetch('https://httpbin.org/user-agent', {
			method: 'GET'
		})		
		const userAgentJSON = await userAgentGET.json()
		$userAgent = JSON.stringify(userAgentJSON);
	});
</script>