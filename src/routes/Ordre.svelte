<script>
	import {
		countCorrectAnswers,
		generateCodeResults,
		countPoints,
		countPointsMax
	} from './stores.js';
	import {
		shuffleArray
	} from './functions.js';
	import {
		Sortable
	} from 'sortablejs';
	import {
		onMount
	} from "svelte";
	import sanitizeHTML from './sanitizeHTML.js';
	const title = 'Ordre';
	const subtitleDefault = 'Classez les éléments de cette liste dans le bon ordre :';
	export let validate;
	export let quizId;
	export let textAnswers;
	export let subtitle
	$: if (!subtitle || subtitle=='') {subtitle=subtitleDefault}
	let textAnswersArray = textAnswers.split('|');
	$: textAnswersArray = textAnswers.split('|');
	let textAnswersArrayShuffled = shuffleArray(textAnswersArray);
	$: textAnswersArrayShuffled = shuffleArray(textAnswersArray);
	let disabled = '';
	let sortableElement;
	let correctAnswer;
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
		countPointsMax.update(n => n + 1);
		if (sortableElement) {
			answer = sortableElement.textContent;
		}
		correctAnswer = textAnswers.replaceAll('|', '');
		if (answer == correctAnswer) {
			countCorrectAnswers.update(n => n + 1)
			countPoints.update(n => n + 1);
		}
	}
</script>

<div class="block quiz-Ordre py-2" id="quiz-q{quizId}">
	<h2 class="title has-text-centered">{title}</h2>
	<div class="box block has-text-centered quiz-sortable" class:quiz-success={validate && answer==correctAnswer  && !$generateCodeResults} class:quiz-error={validate && answer!=correctAnswer  && !$generateCodeResults}>
		<p class="has-text-centered block has-text-weight-medium">{@html sanitizeHTML(subtitle)}</p>
		<ul bind:this={sortableElement}>
			{#each textAnswersArrayShuffled as answer}
				<li class="my-3 has-background-light" class:draggable={!validate} id="quiz-q{quizId}-r1">{@html sanitizeHTML(answer)}</li>
			{/each}
		</ul>
	</div>
</div>