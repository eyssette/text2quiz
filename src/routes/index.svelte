<script>
	import Head from './Head.svelte';
	import Menu from './Menu.svelte';
	import Results from './Results.svelte';
	import Footer from './Footer.svelte';
	import {
		validation
	} from './stores.js';
	import Questions from './Questions.svelte';
	const title = 'Quiz';
	const subtitle = 'Répondez à toutes les questions et calculez votre score';
	let validate = '';
	$: if ($validation) {
		validate = 'validate';
	} else {
		validate = '';
	}

	import slocation from "slocation"
	import {
		questionsCode,
		changeQuestions
	} from './stores.js';
	import {
		regexValid
	} from './regexValid.svelte';

	$: if ($slocation) {
		let quizEncodageHash = $slocation.hash.slice(1);
		let quiz = decodeURI(quizEncodageHash);
		navigator.clipboard.writeText('#' + quizEncodageHash);
		if (checkQuestions(quiz)) {
			questionsCode.update(n => quiz) & changeQuestions.update(n => true)
		}
	}


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

<Head/>

<div class="container is-max-desktop has-background-white-ter px-4 pb-6 is-size-4 is-size-6-mobile {validate}">

	<Menu />

	<h1 class="title has-text-centered pt-2 is-size-1 has-text-link-dark">{title}</h1>
	<h2 class="subtitle has-text-centered has-text-link-dark mt-4">{subtitle}</h2>

	<section class="pt-6">
		<Questions />
	</section>

	<Results />

	<Footer />

</div>