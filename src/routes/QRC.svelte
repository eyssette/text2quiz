<script>
	import {
		countCorrectAnswers,
		generateCodeResults,
		countPoints,
		countPointsMax,
		changeQuestions
	} from './stores.js';
	import {
		removeSpacesBeforeAndAfter
	} from './functions.js'
	import sanitizeHTML from './sanitizeHTML.js';
	export let validate;
	export let quizId;
	export let question;
	export let textAnswers;
	let textAnswersArray
	textAnswersArray = textAnswers.split('|');
	let textAnswer;

	for (let i=0; i<textAnswersArray.length;i++) {
		textAnswer = textAnswersArray[i];
		textAnswer = removeSpacesBeforeAndAfter(textAnswer);
		textAnswersArray[i] = textAnswer
	}

	$: if ($changeQuestions) {
		textAnswersArray = textAnswers.split('|');
		for (let i=0; i<textAnswersArray.length;i++) {
			textAnswer = textAnswersArray[i];
			textAnswer = removeSpacesBeforeAndAfter(textAnswer);
			textAnswersArray[i] = textAnswer
		}
	}

	const title = 'Réponse courte';
	let answer;
	let disabled = '';
	let answerDefault;
	$: disabled = (validate) ? 'disabled' : '';
	$: if (validate) {
		countPointsMax.update(n => n + 1);
		if (answer && textAnswersArray.includes(removeSpacesBeforeAndAfter(answer))) {
			countCorrectAnswers.update(n => n + 1);
			countPoints.update(n => n + 1);
		}
	}
</script>

<div class="block quiz-QRC py-2" id="quiz-q{quizId}">
	<h2 class="title has-text-centered">{title}</h2>
	<div class="box block" class:quiz-success={validate && answer && textAnswersArray.includes(removeSpacesBeforeAndAfter(answer)) && !$generateCodeResults} class:quiz-error={validate && answer && !textAnswersArray.includes(removeSpacesBeforeAndAfter(answer)) && !$generateCodeResults}>
		<div class="content">{@html sanitizeHTML(question)}</div>
		<div class="control is-size-5 is-size-6-mobile">
			{#if !validate || !answer}
				<input class="input" type="text" placeholder="Réponse" id="quiz-q{quizId}-r1" name="quiz-q{quizId}" bind:value={answer} {disabled} >{:else}<span class:r-success={validate && answer && textAnswersArray.includes(removeSpacesBeforeAndAfter(answer)) && !$generateCodeResults} class:r-error={validate && answer && !textAnswersArray.includes(removeSpacesBeforeAndAfter(answer)) && !$generateCodeResults}>{answer}</span>
			{/if}
		</div>
	</div>
</div>