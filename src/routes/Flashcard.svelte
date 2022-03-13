<script>
	import {
		countCorrectAnswers,
		generateCodeResults,
		countPoints,
		countPointsMax
		}
		from './stores.js';
		import sanitizeHTML from './sanitizeHTML.js';
		export let validate;
		export let quizId;
		export let recto;
		export let verso;
		const textAnswers = ['Réponse juste', 'Réponse partiellement juste', 'Réponse fausse']
		const correctAnswer = 1;
		const title = 'Flashcard';
		const textAnswerDefault = 'Je ne sais pas';
		let answer;
		let disabled = '';
		let answerDefault;
		let flashcard;
		$: disabled = (validate) ? 'disabled' : '';
		$: if (validate) {
			countPointsMax.update(n => n + 1);
			if (answer > 0 && correctAnswer == answer) {
				countCorrectAnswers.update(n => n + 1);
				countPoints.update(n => n + 1);
			}
		}

		function toggleFlashcard() {
			flashcard.classList.toggle('flip');
		}
</script>


<div class="block quiz-Flashcard py-2" id="quiz-q{quizId}">
	<h2 class="title has-text-centered">{title}</h2>
	<div class="box block" class:quiz-success={validate && correctAnswer==answer && !$generateCodeResults} class:quiz-error={validate && answer>0
		&& correctAnswer!=answer && !$generateCodeResults}>
		<div class="card flip has-background-lighter px-5 my-4 has-text-justified" on:click={toggleFlashcard} bind:this={flashcard}>
			<div class="front" class:is-size-1={recto.includes('h1')} class:is-size-2={recto.includes('h2')} class:is-size-3={recto.includes('h3')} class:is-size-4={recto.includes('h4')}>{@html sanitizeHTML(recto)}</div>
			<div class="back">{@html sanitizeHTML(verso)}</div>
		</div>
		<div class="has-text-centered block mt-5">
			<button class="button" type="button" on:click={toggleFlashcard}><span class="material-icons">swap_vert</span>Voir le verso</button>
		</div>
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

	.r-error {
		text-decoration: none;
		color: hsl(348, 86%, 43%);
		font-weight: normal !important;
	}

	.card {
		box-shadow: 0 1px 5px -2px hsla(0, 0%, 0%, 5);
		transform-style: preserve-3d;
		transition: transform 0.75s ease-out;
		overflow: visible;
		height: 250px;
	}

	.card div {
		position: absolute;
		top: 0;
		left: 0;
		padding: 20px;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		top: 0;
		backface-visibility: hidden;
	}

	.flip {
		transform: perspective(500px) rotateY(-180deg);
	}

	.front {
		transform: rotateY(180deg);
		font-size: 1.25em;
	}

	.back {
		transform: rotateY(0deg);
	}
</style>