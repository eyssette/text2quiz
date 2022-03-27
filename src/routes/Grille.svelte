<script>
	import {
		countCorrectAnswers,
		changeQuestions,
		generateCodeResults,
		countPoints,
		countPointsMax
	} from './stores.js';
	import {
		shuffleArray,
		removeSpacesBeforeAndAfter
	} from './functions.js';
	import sanitizeHTML from './sanitizeHTML.js';
	export let validate;
	export let quizId;
	export let categories;
	export let question = '';
	const title = 'Grille';
	const textNotComplete = "La grille est incomplète";
	let categoriesArray = categories.split('|');
	categoriesArray = categories.split('|');
	export let answersByCategoryString;
	let answersByCategory = [];
	let answersShuffled = [];
	let answersShuffledUnique = [];
	let answers = [];
	let answersChecked = [];
	let correctAnswers = [];
	let text;
	const reg = /\{\{(.*?)\}\}/g;

	let res = [],
		tmp;
	while (tmp = reg.exec(answersByCategoryString)) res.push(tmp);
	res.forEach(choices);

	for (let i=0;i<categoriesArray.length; i++) {
		text=categoriesArray[i];
		text = removeSpacesBeforeAndAfter(text);
		categoriesArray[i] = text;
	}

	function choices(element) {
		let choicesArray = element[1].split('|');
		for (let i=0;i<choicesArray.length;i++) {
			text = choicesArray[i];
			text = removeSpacesBeforeAndAfter(text);
			choicesArray[i] = text;
		}
		answersByCategory.push(choicesArray);
		answersShuffled = shuffleArray(answersShuffled.concat(choicesArray))
		answersShuffledUnique = [...new Set(answersShuffled)]
	}

	$: if ($changeQuestions) {
		categoriesArray = categories.split('|');
		for (let i=0;i<categoriesArray.length; i++) {
			text=categoriesArray[i];
			text = removeSpacesBeforeAndAfter(text);
			categoriesArray[i] = text;
		}
		res = [],
			tmp;
		answersByCategory = [];
		answersShuffled = []
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
		correctAnswers = [...correctAnswers, [answersShuffledUnique[i], partialCheck]]
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
		countPointsMax.update(n=>n+correctAnswers.length);
		answersChecked=[];
		answersShuffledUnique.forEach(checkAnswers);
		let countTemp=0;
		for (let i=0;i<answers.length;i++) {
			let titleAnswer = answers[i][0];
			let columnChecked = answers[i][1];
			let partialCheck = correctAnswers.filter(element=>element.includes(titleAnswer));
			let columnValues =partialCheck[0][1];
			if (columnValues[columnChecked]) {countTemp++} else {countTemp--}
		}
		if (countTemp >= 0) {countPoints.update(n => n + countTemp);}

		if (answers.length > 0 && answersChecked.filter(element => element == true).length == answersShuffledUnique.length && answersChecked.every(element => element == true && answersChecked.filter(element => element == false).length == 0)) {
			countCorrectAnswers.update(n => n + 1)
		}
	}
</script>


<div class="block quiz-Grille py-2" id="quiz-q{quizId}">
	<h2 class="title has-text-centered">{title}</h2>
	<div class="box block" class:quiz-success={validate && answers.length>0 &&
		answersChecked.filter(element=>element==true).length==answersShuffledUnique.length &&
		answersChecked.every(element=>element==true) && !$generateCodeResults} class:quiz-error={(validate && answers.length>0 &&
		answersChecked.includes(false) && !$generateCodeResults) || (validate && answersChecked.includes(true) &&
		answersChecked.filter(element=>element==true).length!=answersShuffledUnique.length  && !$generateCodeResults)}>
		<div class="content">
			<div class="mt-4 mb-5">{@html sanitizeHTML(question)}</div>
			<table class="table is-size-5 is-size-7-mobile">
				<thead>
					<tr>
						<th></th>
						{#each categoriesArray as category}
							<th>{@html sanitizeHTML(category)}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each answersShuffledUnique as answer,i}
						<tr>
							<td>{@html sanitizeHTML(answer)}</td>
							{#each categoriesArray as category,j}
								<td><input class:r-success={validate && correctAnswers[i][1][j]==true&& !$generateCodeResults} class:r-error={validate && correctAnswers[i][1][j]==false && !$generateCodeResults} class="is-checkradio is-circle is-info" type="checkbox" id="quiz-q{quizId}-r{i}-{j}" name="quiz-q{quizId}-r{i}-{j}" {disabled} value='{[answer,j]}' bind:group={answers}><label for="quiz-q{quizId}-r{i}-{j}"></label></td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<div class="is-size-5 is-size-6-mobile mt-3 is-italic has-text-centered has-text-danger">&nbsp;{#if validate && answersChecked.length>0 && answersChecked.filter(element=>element==true).length!=answersShuffledUnique.length && !$generateCodeResults}{showNotComplete}{/if}</div>
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