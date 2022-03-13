<script>
	import {
		countCorrectAnswers,
		generateCodeResults,
		countPoints,
		countPointsMax
	} from './stores.js';
	import {
		arrayEquals
	} from './functions.js';
	import sanitizeHTML from './sanitizeHTML.js';
	export let validate;
	export let quizId;
	export let question;
	export let textAnswers;
	let textAnswersArray = textAnswers.split('|');
	$ : textAnswersArray = textAnswers.split('|');
	export let correctAnswersString;
	let correctAnswers = correctAnswersString.split('|').map(Number);
	$ : correctAnswers = correctAnswersString.split('|').map(Number);
	const title = 'QCM';
	const textNotComplete = 'Réponse partiellement juste !';
	let answers = [];
	let disabled = '';
	$: disabled = (validate) ? 'disabled' : '';
	$: showNotComplete = (validate) ? textNotComplete : '';
	$: if (validate) {
		countPointsMax.update(n => n + correctAnswers.length);
		let countTemp = 0;
		for (let i=0;i<answers.length;i++){
			if (correctAnswers.includes(answers[i])) {countTemp++} else {countTemp--}
		}
		if (countTemp >= 0) {countPoints.update(n => n + countTemp);}
		if (answers.length > 0 && arrayEquals(answers, correctAnswers)) {
			countCorrectAnswers.update(n => n + 1)
		}
	}
</script>


<div class="block quiz-QCM py-2" id="quiz-q{quizId}">
	<h2 class="title has-text-centered">{title}</h2>
	<div class="box block" class:quiz-success={validate && arrayEquals(answers,correctAnswers) && !$generateCodeResults} class:quiz-error={validate && answers.length>0 && !arrayEquals(answers,correctAnswers) && !$generateCodeResults}>
		<div class="content">{@html sanitizeHTML(question)}</div>
		<div class="control is-size-5 is-size-6-mobile">
			{#each textAnswersArray as textAnswer, i}
				<label class="checkbox" class:r-success={validate && correctAnswers.includes(i+1) && answers.includes(i+1) && !$generateCodeResults} class:r-error={validate && !correctAnswers.includes(i+1) && answers.includes(i+1) && !$generateCodeResults} for="quiz-q{quizId}-r{i+1}"><input type="checkbox" name="quiz-q{quizId}-r{i+1}" id="quiz-q{quizId}-r{i+1}" value={i+1} {disabled}  bind:group={answers}>&nbsp;{@html sanitizeHTML(textAnswer)}</label>
			{/each}
		</div>
		<div class="is-size-5 is-size-6-mobile mt-3 pl-6 is-italic" class:is-invisible={answers.length==0 || arrayEquals(answers,correctAnswers) || correctAnswers.filter(value => answers.includes(value)).length ==0}>&nbsp;{#if validate && !$generateCodeResults}{showNotComplete}{/if}</div>
	</div>
</div>

<style>
	label {
		display: block;
		margin-left: 0.7em !important
	}
</style>