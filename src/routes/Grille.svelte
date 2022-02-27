<script>
	import {
		countCorrectAnswers,
		changeQuestions
	} from './stores.js';
	import {
		shuffleArray
	} from './functions.svelte';
	export let validate;
	export let quizId;
	export let categories;
	const title = 'Grille';
	const textNotComplete = "La grille est incomplète";
	let categoriesArray = categories.split('|');
	$: categoriesArray = categories.split('|');
	export let answersByCategoryString;
	let answersByCategory = [];
	let answersShuffled = [];
	let answersShuffledUnique = [];
	let answers = [];
	let answersChecked = [];
	let correctAnswers = [];
	const reg = /\{(.*?)\}/g;

	let res = [],
		tmp;
	while (tmp = reg.exec(answersByCategoryString)) res.push(tmp);
	res.forEach(choices);

	function choices(element) {
		let choicesArray = element[1].split('|');
		answersByCategory.push(choicesArray);
		answersShuffled = shuffleArray(answersShuffled.concat(choicesArray))
		answersShuffledUnique = [...new Set(answersShuffled)]
	}

	$: if ($changeQuestions) {
		res = [],
		tmp;
		answersByCategory=[];
		answersShuffled=[]
		answersShuffledUnique = [];
		correctAnswers = [];
	while (tmp = reg.exec(answersByCategoryString)) res.push(tmp);
	res.forEach(choices);
	}




	$: for (let i = 0; i < answersShuffledUnique.length; i++) {
		let partialCheck = [];
		for (let j = 0; j < categoriesArray.length; j++) {
			if (answersByCategory[j].includes(answersShuffledUnique[i])) {
				partialCheck[j] = true
			} else {
				partialCheck[j] = false
			}
		}
		correctAnswers.push([answersShuffledUnique[i], partialCheck]);
	}

	function checkAnswers(answer, i) {
		let textAnswer = answersShuffledUnique[i]
		let truthValue = [];
		for (let j = 0; j < categoriesArray.length; j++) {
			if (answersByCategory[j].includes(answersShuffledUnique[i])) {
				answers.forEach(choiceAnswer => {
					if (choiceAnswer[0] == answer) {
						if (j == choiceAnswer[1]) {
							truthValue = truthValue.concat([j, true]);
							answersChecked[i] = true;
						} else {
							truthValue = truthValue.concat([j, false]);
							answersChecked[i] = false;
						}
					}
				})
			}
		}
	}
	$: disabled = (validate) ? 'disabled' : '';
	$: showNotComplete = (validate) ? textNotComplete : '';
	$: if (validate) {
		answersShuffledUnique.forEach(checkAnswers);
		if (answers.length > 0 && answersChecked.filter(element => element == true).length == answersShuffledUnique.length && answersChecked.every(element => element == true)) {
			countCorrectAnswers.update(n => n + 1)
		}
	}
</script>


<div class="block quiz-Grille py-2" id="quiz-q{quizId}">
	<h2 class="title has-text-centered">{title}</h2>
	<div class="box block" class:quiz-success={validate && answers.length>0 &&
		answersChecked.filter(element=>element==true).length==answersShuffledUnique.length &&
		answersChecked.every(element=>element==true)} class:quiz-error={(validate && answers.length>0 &&
		answersChecked.includes(false)) || (validate && answersChecked.includes(true) &&
		answersChecked.filter(element=>element==true).length!=answersShuffledUnique.length )}>
		<div class="content">
			<table class="table is-size-5 is-size-7-mobile">
				<thead>
					<tr>
						<th></th>
						{#each categoriesArray as category}
							<th>{@html category}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each answersShuffledUnique as answer,i}
						<tr>
							<td>{@html answer}</td>
							{#each categoriesArray as category,j}
								<td><input class:r-success={validate && correctAnswers[i][1][j]==true} class:r-error={validate && correctAnswers[i][1][j]==false} class="is-checkradio is-circle is-info" type="checkbox" id="quiz-q{quizId}-r{i}-{j}" name="quiz-q{quizId}-r{i}-{j}" {disabled} value='{[answer,j]}' bind:group={answers}><label for="quiz-q{quizId}-r{i}-{j}"></label></td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<div class="is-size-5 is-size-6-mobile mt-3 pl-6 is-italic">&nbsp;{#if validate && answersChecked.length>0 && answersChecked.filter(element=>element==true).length!=answersShuffledUnique.length}{showNotComplete}{/if}</div>
	</div>
</div>

<style>
	table td,
	table th {
		text-align: center !important
	}

	table td:nth-of-type(1) {
		text-align: justify !important
	}

	.r-success {
		color: black !important;
		font-weight: normal !important;
	}

	.r-error {
		font-weight: normal !important;
		text-decoration: none !important;
	}

	.r-success.is-checkradio:checked+label {
		border: hsl(141, 53%, 31%) solid 2px !important;
		border-radius: 50%;
		left: -10px
	}

	.r-error.is-checkradio:checked+label {
		border: hsl(348, 86%, 43%) solid 2px !important;
		border-radius: 50%;
		left: -10px
	}

	.r-success.is-checkradio:checked+label::before,
	.r-error.is-checkradio:checked+label::before {
		border: none;
		margin-left: 0.5em;
		content: "X";
	}

	.r-success.is-checkradio+label::after,
	.r-error.is-checkradio+label::after {
		display: none;
	}
</style>