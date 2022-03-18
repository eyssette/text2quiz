<script>
	import {
		countCorrectAnswers,
		generateCodeResults,
		countPoints,
		countPointsMax,
		changeQuestions
	} from './stores.js';
	import sanitizeHTML from './sanitizeHTML.js';
	import {
		shuffleArray,
		removeSpacesBeforeAndAfter
	} from './functions';
	export let validate;
	export let quizId;
	export let question;
	export let textAnswers;
	let textAnswersArray;
	let correctAnswer;
	const title = 'Question / Réponse';
	const textAnswerDefault = 'Je ne sais pas';
	let answer;
	let textAnswer;
	let disabled = '';
	let answerDefault;

	textAnswersArray = textAnswers.split('|');
	for (let i=0;i<textAnswersArray.length;i++) {
		textAnswer = textAnswersArray[i];
		textAnswer = removeSpacesBeforeAndAfter(textAnswer);
		textAnswersArray[i]=textAnswer;
		if (textAnswer.substr(0, 2) == 'V:') {
			textAnswersArray[i] = removeSpacesBeforeAndAfter(textAnswer.replace('V:', ''));
			correctAnswer = textAnswersArray[i];
		}
	}
	textAnswersArray=shuffleArray(textAnswersArray);

	$: if ($changeQuestions) {
		textAnswersArray = [];
		textAnswersArray = textAnswers.split('|');
		correctAnswer = '';
		for (let i=0;i<textAnswersArray.length;i++) {
			textAnswer = textAnswersArray[i];
			textAnswer = removeSpacesBeforeAndAfter(textAnswer);
			textAnswersArray[i]=textAnswer;
			if (textAnswer.substr(0, 2) == 'V:') {
				textAnswersArray[i] = removeSpacesBeforeAndAfter(textAnswer.replace('V:', ''));
				correctAnswer = textAnswersArray[i];
			}
		}
		textAnswersArray=shuffleArray(textAnswersArray);
	}


	$: disabled = (validate) ? 'disabled' : '';
	$: if (validate) {
		countPointsMax.update(n => n + 1);
		if (correctAnswer == textAnswersArray[answer]) {
			countCorrectAnswers.update(n => n + 1)
			countPoints.update(n => n + 1);
		}
	}
</script>


<div class="block quiz-QR py-2" id="quiz-q{quizId}">
	<h2 class="title has-text-centered">{title}</h2>
	<div class="box block" class:quiz-success={validate && correctAnswer == textAnswersArray[answer] && !$generateCodeResults} class:quiz-error={validate && answer >=0 && correctAnswer != textAnswersArray[answer] && !$generateCodeResults}>
		<div class="content">{@html sanitizeHTML(question)}</div>
		<div class="control is-size-5 is-size-6-mobile">
			{#each textAnswersArray as textAnswer, i}
				<label class="radio" class:r-success={validate && correctAnswer==textAnswersArray[i] && answer==i && !$generateCodeResults} class:r-error={validate && correctAnswer!=textAnswersArray[i] && answer==i && !$generateCodeResults} for="quiz-q{quizId}-r{i}"><input type="radio" name="quiz-q{quizId}" id="quiz-q{quizId}-r{i}" {disabled} bind:group={answer}  value={i}>{@html sanitizeHTML(textAnswer)} </label>
			{/each}
			<label class="radio" for="quiz-q{quizId}-r-default"><input type="radio" name="quiz-q{quizId}" id="quiz-q{quizId}-r-default" {disabled} bind:this={answerDefault} bind:group={answer} value="default" checked>{textAnswerDefault}</label>
		</div>
	</div>
</div>

<style>
	label {
		display: block;
		margin-left: 0.7em !important
	}
</style>