<script>
	import Head from './Head.svelte';
	import HomeBody from './HomeBody.svelte';
	import Menu from './Menu.svelte';
	import Footer from './Footer.svelte';
	import {
		onMount
	} from 'svelte';
	import {
		questionsCode,
		previousQuestionsCode,
		changeQuestions,
		validation,
		home,
		baseURL,
		keyEvaluation,
		darkmode
	} from './stores.js';
	import Questions from './Questions.svelte';
	import url from './url.js';
	import {
		checkQuestions
	}
	from './checkQuestions.js';
	import {cryptedModeKey} from './configEnvironment.js'
	import {
		encrypt,
		decrypt
	} from './crypt.js';
	let validate = '';
	$: if ($validation) {
		validate = 'validate';
	} else {
		validate = '';
	}
	let quizEncodageHash;
	let quiz;
	let mode='open';
	let hashEvaluation=[];
	//	$: if ($changeQuestions) {home.update(n=>false)}

	

	onMount(async () => {
		if ($url) {
			quizEncodageHash = $url.hash.slice(1);
			keyEvaluation.update(n=>'');
			if($url.search.includes('m=1')) {
				quizEncodageHash=decrypt(quizEncodageHash,cryptedModeKey);
				mode='crypted';
				keyEvaluation.update(n=>'');
			}
			if($url.search.includes('m=2')) {
				quizEncodageHash=decrypt(quizEncodageHash,cryptedModeKey);
				hashEvaluation=quizEncodageHash.split('|||');
				keyEvaluation.update(n => hashEvaluation[0]);
				quizEncodageHash=hashEvaluation[1];
				mode='evaluation';
			}
			$baseURL = $url.protocol + '//' + $url.host;
			if (quizEncodageHash.startsWith('http')) {
				const response = await fetch(quizEncodageHash);
				const data = await response.text();
				quiz = encodeURI(data);
				quiz = quiz.replace(/%0A$/,'');
				history.replaceState(null, null, $baseURL+$url.search+'#' + quiz);
			} else {
				quiz = decodeURI(quizEncodageHash);
			}
			if (checkQuestions(quiz)) {
				home.update(n => false);
				questionsCode.update(n => quiz);
				previousQuestionsCode.update(n => quiz);
				changeQuestions.update(n => true);
				//history.replaceState(null, null, ' ');
			}
		}
	});


	$: if ($url) {
		quizEncodageHash = $url.hash.slice(1);
		keyEvaluation.update(n=>'');
			if($url.search.includes('m=1')) {
				quizEncodageHash=decrypt(quizEncodageHash,cryptedModeKey);
				mode='crypted';
				keyEvaluation.update(n=>'');
			}
			if($url.search.includes('m=2')) {
				quizEncodageHash=decrypt(quizEncodageHash,cryptedModeKey);
				hashEvaluation=quizEncodageHash.split('|||');
				keyEvaluation.update(n => hashEvaluation[0]);
				quizEncodageHash=hashEvaluation[1];
				mode='evaluation';
			}
		quiz = decodeURI(quizEncodageHash);
		if (checkQuestions(quiz)) {
			home.update(n => false);
			questionsCode.update(n => quiz);
			previousQuestionsCode.update(n => quiz);
			changeQuestions.update(n => true);
			//history.replaceState(null, null, ' ');
		} else {
			questionsCode.update(n => '');
			previousQuestionsCode.update(n => '');
			home.update(n => true);
		}

	}

</script>


<Head/>

<div class="container is-max-desktop has-background-white-ter px-4 pb-6 is-size-4 is-size-6-mobile {validate}" class:home={$home} id={$darkmode ? 'darkmode' : 'lightmode'}>
	<Menu modeView={mode} />
		<Questions modeView={mode} />
	{#if $home}
		<section class="pt-6">
			<HomeBody />
		</section>
		<Footer />
	{/if}
</div>


<style>
	:global(.quiz-error) {
		border-left: 4px solid hsl(348, 86%, 43%);
	}
	
	:global(.quiz-success) {
		border-left: 4px solid hsl(141, 53%, 31%);
	}
	
	:global(.r-error) {
		text-decoration: line-through hsl(348, 86%, 43%);
		font-weight: 600 !important;
	}
	
	
	:global(.r-success) {
		color: #257942 !important;
		font-weight: 600 !important;
	}
	
	
	:global(input) {
		margin-right: 0.5em !important;
	}

	:global(img) {
		max-height:100%;
		max-width:100%; 
	}
	
	:global(img[alt~="h-100"]) {
   		height:100px!important;
	}

	:global(img[alt~="h-200"]) {
   		height:200px!important;
	}

	:global(img[alt~="h-300"]) {
   		height:300px!important;
	}

	:global(img[alt~="h-400"]) {
   		height:400px!important;
	}

	:global(img[alt~="h-500"]) {
   		height:500px!important;
	}

	:global(img[alt~="center"]) {
   		display:block;
		margin:auto;
	}

	:global(img[alt~="rounded"]) {
		border-radius: 50%;
	}

	:global(img[alt~="float-left"]) {
		float:left;
		margin-right:1em;
		margin-bottom:1em;
	}

	:global(img[alt~="float-right"]) {
		float:right;
		margin-left:1em;
		margin-bottom:1em;
	}

	</style>