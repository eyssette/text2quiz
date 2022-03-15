<script>
	import {
		countCorrectAnswers,
		generateCodeResults,
		countPoints,
		countPointsMax
	} from './stores.js';
	import {
		language
	} from './stores.js';
	import sanitizeHTML from './sanitizeHTML.js';
	export let validate;
	export let quizId;
	export let question;
	let textAnswersArray = [];
	let titleArray = [];
	let textAnswerDefaultArray = [];
	textAnswersArray['FR'] = ['Vrai', 'Faux'];
	titleArray['FR'] = 'Vrai ou faux ?';
	textAnswerDefaultArray['FR'] = 'Je ne sais pas';
	textAnswersArray['EN'] = ['True', 'False'];
	titleArray['EN'] = 'True or false ?';
	textAnswerDefaultArray['EN'] = "I don't know";
	let textAnswers;
	let title;
	let textAnswerDefault;
	$: textAnswers = textAnswersArray[$language];
	$: title = titleArray[$language];
	$: textAnswerDefault = textAnswerDefaultArray[$language];

	export let correctAnswer;

	$: if (correctAnswer == 'V') {
		correctAnswer = 1
	};
	$: if (correctAnswer == 'F') {
		correctAnswer = 2
	};

	let answer;
	let disabled = '';
	let answerDefault;
	$: disabled = (validate) ? 'disabled' : '';
	$: if (validate) {
		countPointsMax.update(n => n + 1);
		if (answer > 0 && correctAnswer == answer) {
			countCorrectAnswers.update(n => n + 1);
			countPoints.update(n => n + 1);
		}
	}
</script>

<div class="block quiz-VF py-2" id="quiz-q{quizId}">
	<h2 class="title has-text-centered">{title}</h2>
	<div class="box block" class:quiz-success={validate && correctAnswer==answer && !$generateCodeResults} class:quiz-error={validate && answer>0
		&& correctAnswer!=answer && !$generateCodeResults}>
		<div class="content">{@html sanitizeHTML(question)}</div>
		<div class="control is-size-5 is-size-6-mobile">
			{#each textAnswers as textAnswer, i}
				<label class="radio" class:r-success={validate && correctAnswer==i+1 && answer==i+1 && !$generateCodeResults} class:r-error={validate && correctAnswer!=i+1 && answer==i+1 && !$generateCodeResults} for="quiz-q{quizId}-r{i+1}"><input type="radio" name="quiz-q{quizId}" id="quiz-q{quizId}-r{i+1}" {disabled} bind:group={answer}  value={i+1}>{textAnswer} </label>
			{/each}
			<label class="radio" for="quiz-q{quizId}-r-default"><input type="radio" name="quiz-q{quizId}"  id="quiz-q{quizId}-r-default" {disabled} bind:this={answerDefault} bind:group={answer} value="default" checked>{textAnswerDefault}</label>
		</div>
	</div>
</div>


<style>
	label {
		padding-left: 1.25em
	}
</style>
