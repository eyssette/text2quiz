<script>
	import {
		countCorrectAnswers,
		generateCodeResults,
		countPoints,
		countPointsMax,
		changeQuestions
	} from './stores.js';
	import {
		arrayEquals,
		shuffleArray,
		removeSpacesBeforeAndAfter
	} from './functions.js';
	import sanitizeHTML from './sanitizeHTML.js';
	export let validate;
	export let quizId;
	export let question;
	export let textAnswers;
	let answers = [];
	let textAnswer;
	let textAnswersArray;
	textAnswersArray = textAnswers.split('|');
	let correctAnswers = [];
	for (let i=0;i<textAnswersArray.length;i++) {
		textAnswer = textAnswersArray[i];
		textAnswer = removeSpacesBeforeAndAfter(textAnswer);
		textAnswersArray[i]=textAnswer;
		if (textAnswer.substr(0, 2) == 'V:') {
			textAnswersArray[i] = removeSpacesBeforeAndAfter(textAnswer.replace('V:', ''));
			correctAnswers = [...correctAnswers, textAnswersArray[i]];
		}
	}
	textAnswersArray=shuffleArray(textAnswersArray);


	$: if ($changeQuestions) {
		textAnswersArray = [];
		textAnswersArray = textAnswers.split('|');
		correctAnswers = [];
		for (let i=0;i<textAnswersArray.length;i++) {
			textAnswer = textAnswersArray[i];
			textAnswer = removeSpacesBeforeAndAfter(textAnswer);
			textAnswersArray[i]=textAnswer;
			if (textAnswer.substr(0, 2) == 'V:') {
				textAnswersArray[i] = removeSpacesBeforeAndAfter(textAnswer.replace('V:', ''));
				correctAnswers = [...correctAnswers, textAnswersArray[i]];
			}
		}
		textAnswersArray=shuffleArray(textAnswersArray);
	}

	const title = 'QCM';
	const textNotComplete = 'Réponse partiellement juste !';
	
	let disabled = '';
	$: disabled = (validate) ? 'disabled' : '';
	$: showNotComplete = (validate) ? textNotComplete : '';
	$: if (validate) {
		countPointsMax.update(n => n + correctAnswers.length);
		let countTemp = 0;
		for (let i=0;i<answers.length;i++){
			if (correctAnswers.includes(textAnswersArray[answers[i]])) {countTemp++} else {countTemp--}
		}
		if (countTemp >= 0) {countPoints.update(n => n + countTemp);}

		if (answers.length == correctAnswers.length && answers.filter(element => correctAnswers.includes(textAnswersArray[element])).length == correctAnswers.length) {
			countCorrectAnswers.update(n => n + 1)
		}
	}
</script>


<div class="block quiz-QCM py-2" id="quiz-q{quizId}">
	<h2 class="title has-text-centered">{title}</h2>
	<div class="box block" class:quiz-success={validate && answers.length == correctAnswers.length && answers.filter(element => correctAnswers.includes(textAnswersArray[element])).length == correctAnswers.length && !$generateCodeResults} class:quiz-error={validate && answers.length>0 && (answers.length != correctAnswers.length || answers.filter(element => correctAnswers.includes(textAnswersArray[element])).length != correctAnswers.length) && !$generateCodeResults}>
		<div class="content">{@html sanitizeHTML(question)}</div>
		<div class="control is-size-5 is-size-6-mobile">
			{#each textAnswersArray as textAnswer, i}
					<label class="checkbox" class:r-success={validate && correctAnswers.includes(textAnswer) && answers.includes(i) && !$generateCodeResults} class:r-error={validate && !correctAnswers.includes(textAnswer) && answers.includes(i) && !$generateCodeResults} for="quiz-q{quizId}-r{i}"><input type="checkbox" name="quiz-q{quizId}-r{i}" id="quiz-q{quizId}-r{i}" value={i} {disabled}  bind:group={answers}>&nbsp;{@html sanitizeHTML(textAnswer)}</label>
			{/each}
		</div>
		<div class="is-size-5 is-size-6-mobile mt-3 is-italic has-text-centered has-text-danger" class:is-invisible={answers.length==0 || answers.filter(element => correctAnswers.includes(textAnswersArray[element])).length == correctAnswers.length || answers.filter(element => correctAnswers.includes(textAnswersArray[element])).length ==0}>&nbsp;{#if validate && !$generateCodeResults}{showNotComplete}{/if}</div>
	</div>
</div>

<style>
	label {
		display: block;
		margin-left: 0.7em !important
	}
</style>