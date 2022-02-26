<script>
	import {
		countCorrectAnswers
	} from './stores.js';
	import {
		shuffleArray
	} from './functions.svelte';
	//import {Sortable} from 'https://unpkg.com/sortablejs?module'
	import {
		Sortable
	} from 'sortablejs';
	import {
		onMount
	} from "svelte";
	export let validate;
	export let quizId;
	export let textAnswers;
	let textAnswersArray = textAnswers.split('|');
	let textAnswersArrayShuffled = shuffleArray(textAnswersArray);
	const title = 'Ordre';
	const subtitle = 'Classez les éléments de cette liste dans le bon ordre :';
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
		if (sortableElement) {
			answer = sortableElement.textContent;
		}
		correctAnswer = textAnswers.replaceAll('|', '');
		if (answer == correctAnswer) {
			countCorrectAnswers.update(n => n + 1)
		}
	}
</script>

<div class="block quiz-QR py-2" id="quiz-q{quizId}">
	<h2 class="title has-text-centered">{title}</h2>
	<div class="box block has-text-centered quiz-sortable" class:quiz-success={validate && answer==correctAnswer} class:quiz-error={validate && answer!=correctAnswer}>
		<p class="has-text-centered block has-text-weight-medium">{subtitle}</p>
		<ul bind:this={sortableElement}>
			{#each textAnswersArrayShuffled as answer}
				<li class="my-3 has-background-light" class:draggable={!validate} id="quiz-q{quizId}-r1">{@html answer}</li>
			{/each}
		</ul>
	</div>
</div>