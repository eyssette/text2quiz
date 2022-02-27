<script>
	import Head from './Head.svelte';
	import HomeBody from './HomeBody.svelte';
	import Menu from './Menu.svelte';
	import Footer from './Footer.svelte';
	import { onMount } from 'svelte';
	import {
		questionsCode,
		changeQuestions,
		validation,
		home
	} from './stores.js';
	import Questions from './Questions.svelte';
	import url from './url.js';
	import {
		regexValid
	} from './regexValid.svelte';
	let validate = '';
	$: if ($validation) {
		validate = 'validate';
	} else {
		validate = '';
	}
	let quizEncodageHash;
	let quiz;

	
//	$: if ($changeQuestions) {home.update(n=>false)}


onMount(async () => {
	if ($url) {
		quizEncodageHash = $url.hash.slice(1);

		if (quizEncodageHash.startsWith('http')) {
			const response = await fetch(quizEncodageHash);
			const data = await response.text();
			console.log (data);
			quiz = decodeURI(data);
		} else {
			quiz = decodeURI(quizEncodageHash);}

			if (checkQuestions(quiz)) {
				questionsCode.update(n => quiz);
				changeQuestions.update(n => true);
				home.update(n => false);
				//history.replaceState(null, null, ' ');
			} else {
				home.update(n => true);
			}
		
	}
});


	function checkQuestions(toCheck) {
		let check = false;
		let chekQuestionsArray = [];
		if (toCheck) {
			let questionsCodeArray = toCheck.split(/\r?\n/);
			if (Array.isArray(questionsCodeArray)) {
				questionsCodeArray.forEach(question => {
					chekQuestionsArray.push(regexValid(question));
				})
				if (chekQuestionsArray.every(element => element == true)) {
					check = true
				}
			}
		}
		return check;
	}
</script>


<Head/>

<div class="container is-max-desktop has-background-white-ter px-4 pb-6 is-size-4 is-size-6-mobile {validate}">

	<Menu />

		<Questions />

	{#if $home}
		<section class="pt-6">
			<HomeBody />
		</section>
	{/if}

	<Footer />

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
	
	</style>