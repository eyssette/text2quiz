<script>
	import {
		countCorrectAnswers,
		generateCodeResults,
		countPoints,
		countPointsMax
	} from './stores.js';
	import {
		shuffleArray,
		removeSpacesBeforeAndAfter
	} from './functions.js';
	import {
		Sortable
	} from 'sortablejs';
	import {
		onMount
	} from "svelte";
	import sanitizeHTML from './sanitizeHTML.js';
	const title = 'Ordre';
	const subtitle = 'Classez les éléments dans le bon ordre';
	export let validate;
	export let quizId;
	export let textAnswers;
	export let question;
	let textAnswersArray = textAnswers.split('|');
	let correctAnswerArray=[];
	let correctAnswerString;
	$: textAnswersArray = textAnswers.split('|');
	$: for (let i=0;i<textAnswersArray.length;i++) {
		textAnswersArray[i]= removeSpacesBeforeAndAfter(textAnswersArray[i]);
		correctAnswerArray[i] = textAnswersArray[i];
	}
	let textAnswersArrayShuffled = shuffleArray(textAnswersArray);
	$: textAnswersArrayShuffled = shuffleArray(textAnswersArray);
	let disabled = '';
	let sortableElement;
	let answer;

	$: onMount(async function () {

		Sortable.create(sortableElement, {
			group: {
				name: 'sortableElement',
				put: true,
			},
			draggable: ".draggable",
			animation: 200
		});
	});
	$: disabled = (validate) ? 'disabled' : '';
	$: if (validate) {
		countPointsMax.update(n => n + textAnswersArray.length);
		if (sortableElement) {	
			answer = sortableElement.textContent;
		}
		correctAnswerString = correctAnswerArray.join('');
		//correctAnswer = textAnswers.replaceAll('|', '');
		if (answer.replaceAll("'","&#39;").replaceAll('"',"&quot;") == correctAnswerString) {
			countCorrectAnswers.update(n => n + 1)
			countPoints.update(n => n + textAnswersArray.length);
		}
	}
</script>

<div class="block quiz-Ordre py-2" id="quiz-q{quizId}">
	<h2 class="title has-text-centered">{title}</h2>
	<div class="box block quiz-sortable" class:quiz-success={validate && answer.replaceAll("'","&#39;").replaceAll('"',"&quot;")==correctAnswerString  && !$generateCodeResults} class:quiz-error={validate && answer.replaceAll("'","&#39;").replaceAll('"',"&quot;")!=correctAnswerString  && !$generateCodeResults}>
		<p class="has-text-centered block has-text-weight-medium">{subtitle}</p>
		<div class="content">{@html sanitizeHTML(question)}</div>
		<ul class="is-flex is-flex-direction-column" bind:this={sortableElement}>
			{#each textAnswersArrayShuffled as answer}
				<li class="my-3 py-3 px-6  has-background-light" class:draggable={!validate} id="quiz-q{quizId}-r1">{@html sanitizeHTML(answer)}</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	li {width:fit-content; display:block; margin:auto; border-radius:13px;}
</style>