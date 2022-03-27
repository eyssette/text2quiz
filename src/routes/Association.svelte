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
	import {
		Sortable
	} from 'sortablejs';
	import {
		onMount,
		afterUpdate
	} from 'svelte';
	import sanitizeHTML from './sanitizeHTML.js';
	import {
		regexValid
	} from './checkQuestions.js';
	export let validate;
	export let quizId;
	export let answers;
	export let question = '';
	const title = 'Association';
	const textNotComplete = "Réponse partiellement juste";
	const subtitle = "Associez à chaque élément l'étiquette correspondante";
	const labelsListText = 'Étiquettes à classer';

	let categoriesArray = []
	let answersByCategory = [];
	let answersByCategoryArray = [];
	let answersShuffled = [];
	let answersChecked = [];
	let correctAnswers = [];
	let partialCheck = [];
	let checkAnswers = [];

	const reg = /\{\{(.*?)\}\}/g;
	let res = [],
		tmp;
	while (tmp = reg.exec(answers)) res.push(tmp);
	for (let i = 0; i < res.length; i++) {
		let associationString = res[i][1];
		let associationArray = associationString.split('|')
		categoriesArray = [...categoriesArray, associationArray[0]]
		answersByCategoryArray = [...answersByCategoryArray, associationArray[1]]
	}

	for (let i=0;i<categoriesArray.length; i++) {
		categoriesArray[i] = removeSpacesBeforeAndAfter(categoriesArray[i]);
	}
	for (let i=0;i<answersByCategoryArray.length; i++) {
		answersByCategoryArray[i] = removeSpacesBeforeAndAfter(answersByCategoryArray[i]);
	}

	let zoneInitial;
	let zone = [];

	onMount(async function () {
		Sortable.create(zoneInitial, {
			group: {
				name: 'etiquettes',
				pull: true,
			},
			draggable: ".draggable",
			animation: 200
		});
		for (let i = 0; i < categoriesArray.length; i++) {
			Sortable.create(zone[i], {
				group: {
					name: 'etiquettes',
					pull: true,
					put: function (to) {
						return to.el.children.length < 1;
					}
				},
				draggable: ".draggable",
				animation: 200
			});
		}
	});

	$: afterUpdate(async function () {
		Sortable.create(zoneInitial, {
			group: {
				name: 'etiquettes',
				pull: true,
			},
			draggable: ".draggable",
			animation: 200
		});
		for (let i = 0; i < categoriesArray.length; i++) {
			Sortable.create(zone[i], {
				group: {
					name: 'etiquettes',
					pull: true,
					put: function (to) {
						return to.el.children.length < 1;
					}
				},
				draggable: ".draggable",
				animation: 200
			});
		}
	});

	answersByCategoryArray.forEach(choices);

	$: if ($changeQuestions) {
		answersByCategory = [];
		answersByCategoryArray = [];
		answersShuffled = [];
		categoriesArray = [];
		const reg = /\{\{(.*?)\}\}/g;
		let res = [],
			tmp;
		while (tmp = reg.exec(answers)) res.push(tmp);
		for (let i = 0; i < res.length; i++) {
			let associationString = res[i][1];
			let associationArray = associationString.split('|')
			categoriesArray = [...categoriesArray, associationArray[0]]
			answersByCategoryArray = [...answersByCategoryArray, associationArray[1]]
		}
		for (let i=0;i<categoriesArray.length; i++) {
		categoriesArray[i] = removeSpacesBeforeAndAfter(categoriesArray[i]);
		}
		for (let i=0;i<answersByCategoryArray.length; i++) {
		answersByCategoryArray[i] = removeSpacesBeforeAndAfter(answersByCategoryArray[i]);
		}

		answersByCategoryArray.forEach(choices);

	}

	$: answersShuffled = shuffleArray(answersShuffled);

	function choices(element) {
		answersByCategory.push([element]);
		answersShuffled = answersShuffled.concat(element)
	}


	function childrenTexts(item) {
		let arr = [];
		if (item) {
			let c = item.childNodes;
			c.forEach(element => {
				arr.push(element.innerHTML);
			})
		}
		return arr
	}
	let answersZoneInitial;
	let answersZone = [];
	$: disabled = (validate) ? 'disabled' : '';
	$: showNotComplete = (validate) ? textNotComplete : '';
	$: if (validate) {
		countPointsMax.update(n => n + answersShuffled.length);
		if (zoneInitial) {
			answersZoneInitial = childrenTexts(zoneInitial);
		}
		answersZone = [];
		correctAnswers = [];
		answersChecked = [];
		checkAnswers = [];
		for (let i = 0; i < categoriesArray.length; i++) {
			if (zone[i]) {
				answersZone.push(childrenTexts(zone[i]));
			}
		}

		let category = 0;
		answersZone.forEach(zone => {
			zone.forEach(answer => {
				partialCheck = [];
				let i = 0;
				if (answersByCategory[category].includes(answer.replaceAll("'","&#39;").replaceAll('"',"&quot;"))) {
					partialCheck[i] = true
				} else {
					partialCheck[i] = false
				}
				checkAnswers.push([answer, category, partialCheck[i]]);
				i++;
			})
			category++;
		})
		for (let i = 0; i < categoriesArray.length; i++) {
			let checkAnswersByCategory = checkAnswers.filter(element => (element[1] == i) && (element[2] == true));
			if (checkAnswersByCategory.length == answersByCategory[i].length) {
				answersChecked[i] = true
			} else {
				answersChecked[i] = false
			}
		}
		if (answersChecked.filter(element => element == true).length == categoriesArray.length) {
			countCorrectAnswers.update(n => n + 1)
		}

		let countTemp = 0;
		for (let i = 0; i < checkAnswers.length; i++) {
			if (checkAnswers[i].includes(true)) {
				countTemp++
			} else {
				countTemp--
			}
		}
		if (countTemp >= 0) {
			countPoints.update(n => n + countTemp);
		}

	}
</script>

<div class="block quiz-Association py-2" id="quiz-q{quizId}">
	<h2 class="title has-text-centered">{title}</h2>
	<div class="box block" class:quiz-success={validate && answersChecked.filter(element=>
		element==true).length==categoriesArray.length && !$generateCodeResults} class:quiz-error={validate &&
		checkAnswers.length>0 &&
		answersChecked.filter(element=>element==false).length>0 && !$generateCodeResults}>
		<p class="has-text-centered block has-text-weight-medium">{subtitle}</p>
		<div class="content">{@html sanitizeHTML(question)}</div>

		{#if categoriesArray.length>5}
		<div class="mt-5 ">
			<div class="columns is-multiline ">
				{#each categoriesArray as category,i}
					<div class="column is-half">
						<article class="message has-background-white m-2">
							<div class="message-header has-background-grey-lighter  has-text-dark">{@html sanitizeHTML(category)}</div>
							<div class="message-body mt-2 quiz-zone has-background-white" id="quiz-q{quizId}-z{i}" bind:this={zone[i]}></div>
						</article>
					</div>
				{/each}
			</div>
			<div class="columns is-mobile">
				<div class="column is-10 is-offset-1 ">
					<article class="message  mt-5 zoneInitial">
						<div class="message-header has-background-white has-text-dark">{labelsListText}</div>
						<div class="message-body">
							<div id="quiz-q{quizId}-z0" bind:this={zoneInitial}>
								{#each answersShuffled as answer,i}
									<p class="has-text-justified py-1" class:r-success={validate && checkAnswers.filter(element=>(element[0].replaceAll("'","&#39;").replaceAll('"',"&quot;")==answer && element[2]==true)).length>0 && !$generateCodeResults} class:r-error={validate  && checkAnswers.length>0 && checkAnswers.filter(element=>(element[0].replaceAll("'","&#39;").replaceAll('"',"&quot;")==answer && element[2]==false)).length>0 && !$generateCodeResults}  id="quiz-q{quizId}-r{i}" class:draggable={!validate}>{@html answer}</p>
								{/each}
							</div>
						</div>
					</article>
				</div>
			</div>
			<div class="is-size-5 is-size-6-mobile mt-3 is-italic has-text-centered has-text-danger">&nbsp;{#if answersChecked.filter(element=>element==false).length>0 && checkAnswers.filter(element=>(element[2]==true)).length>0 && !$generateCodeResults}{showNotComplete}{/if}</div>
		</div>

		{:else}
			<div class="columns mt-5">
				<div class="column is-two-fifths">
					{#each categoriesArray as category,i}
						<article class="message has-background-white">
							<div class="message-header has-background-grey-lighter  has-text-dark">{@html sanitizeHTML(category)}</div>
							<div class="message-body mt-2 quiz-zone has-background-white" id="quiz-q{quizId}-z{i}" bind:this={zone[i]}></div>
						</article>
					{/each}
				</div>
				<div class="column">
					<article class="message  mt-5 zoneInitial">
						<div class="message-header has-background-white has-text-dark">{labelsListText}</div>
						<div class="message-body">
							<div id="quiz-q{quizId}-z0" bind:this={zoneInitial}>
								{#each answersShuffled as answer,i}
									<p class="has-text-justified py-1" class:r-success={validate && checkAnswers.filter(element=>(element[0].replaceAll("'","&#39;").replaceAll('"',"&quot;")==answer && element[2]==true)).length>0 && !$generateCodeResults} class:r-error={validate  && checkAnswers.length>0 && checkAnswers.filter(element=>(element[0].replaceAll("'","&#39;").replaceAll('"',"&quot;")==answer && element[2]==false)).length>0 && !$generateCodeResults}  id="quiz-q{quizId}-r{i}" class:draggable={!validate}>{@html answer}</p>
								{/each}
							</div>
						</div>
					</article>
				</div>
			</div>
			<div class="is-size-5 is-size-6-mobile mt-3 is-italic has-text-centered has-text-danger">&nbsp;{#if answersChecked.filter(element=>element==false).length>0 && checkAnswers.filter(element=>(element[2]==true)).length>0 && !$generateCodeResults}{showNotComplete}{/if}</div>
		{/if}



	</div>
</div>


<style>
	article {
		border: 1px hsl(0, 0%, 66%) solid;
	}

	.message-header {
		display:block;
		background-color: hsl(200, 15%, 96%);
		border-bottom: 1px hsl(0, 0%, 66%) solid;
	}

	.zoneInitial .message-body {
		border: 1px hsl(0, 0%, 96%) solid;
		border-width: 0px
	}

	article p {
		margin-bottom: 0.65em;
		border: 2px dotted hsl(0, 0%, 76%);
		border-radius: 13px;
		padding: 1em 2em;
	}

	.zoneInitial .message-body {
		text-align: center;
		background-color: hsl(200, 10%, 96%);
	}

	.zoneInitial p {
		text-align: justify;
		border: 1px solid hsl(0, 0%, 80%);
		background-color: white;
	}

	.zoneInitial p:nth-of-type(1) {
		margin-top: 0.5em !important;
	}

	.r-success {
		color: black !important;
		font-weight: normal !important;
	}

	.r-error {
		font-weight: normal !important;
		text-decoration: none !important;
	}

	.r-success {
		border-color: #257942
	}

	.r-error {
		border-color: hsl(348, 86%, 43%)
	}
</style>