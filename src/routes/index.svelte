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
		home
	} from './stores.js';
	import Questions from './Questions.svelte';
	import url from './url.js';
	import {
		checkQuestions
	}
	from './checkQuestions.js';
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
				quiz = encodeURI(data);
				history.replaceState(null, null, '#' + quiz);
			} else {
				quiz = decodeURI(quizEncodageHash);
			}

			if (checkQuestions(quiz)) {
				questionsCode.update(n => quiz);
				previousQuestionsCode.update(n => quiz);
				changeQuestions.update(n => true);
				home.update(n => false);
				//history.replaceState(null, null, ' ');
			} else {
				//home.update(n => true);
			}

		}
	});


	$: if ($url) {
		quizEncodageHash = $url.hash.slice(1);
		quiz = decodeURI(quizEncodageHash);
		if (checkQuestions(quiz)) {
			questionsCode.update(n => quiz);
			previousQuestionsCode.update(n => quiz);
			changeQuestions.update(n => true);
			home.update(n => false);
			//history.replaceState(null, null, ' ');
		} else {
			questionsCode.update(n => '');
			previousQuestionsCode.update(n => '');
			home.update(n => true);
		}

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
	
	</style>