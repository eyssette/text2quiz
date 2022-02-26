<script>
	import {
		countCorrectAnswers,
		changeQuestions
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
	export let categories;
	const title = 'Association';
	const textNotComplete = "Réponse partiellement juste";
	const subtitle = "Associez à chaque élément l'étiquette correspondante";
	const labelsListText = 'Étiquettes à classer';
	let categoriesArray = categories.split('|');
	export let answersByCategoryString;
	export let question = '';
	let answersByCategory = [];
	let answersShuffled = [];
	let answers = [];
	let answersChecked = [];
	let correctAnswers = [];
	let partialCheck = [];
	let checkAnswers = [];

	let zoneInitial;
	let zone = [];
	$: onMount(async function () {
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


	let answersByCategoryArray = [];
	answersByCategoryArray= answersByCategoryString.split('|');
	answersByCategoryArray.forEach(choices);

	$: if ($changeQuestions) {
		answersByCategoryArray= answersByCategoryString.split('|');
		answersByCategory=[];
		answersShuffled=[];
		answersByCategoryArray.forEach(choices);
	}

	answersShuffled = shuffleArray(answersShuffled);

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
				if (answersByCategory[category].includes(answer)) {
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
	}
</script>
<style>
	article {
		border: 1px hsl(0, 0%, 66%) solid;
	}

	.message-header {
		justify-content: center;
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

<div class="block quiz-Grille py-2" id="quiz-q{quizId}">
	<h2 class="title has-text-centered">{title}</h2>
	<div class="box block" class:quiz-success={validate && answersChecked.filter(element=>
		element==true).length==categoriesArray.length} class:quiz-error={validate && checkAnswers.length>0 &&
		answersChecked.filter(element=>element==false).length>0}>
		<p class="has-text-centered block has-text-weight-medium">{subtitle}</p>
		<div class="content">{@html question}</div>
		<div class="columns mt-5">
			<div class="column is-two-fifths">
				{#each categoriesArray as category,i}
					<article class="message has-background-white">
						<div class="message-header has-background-grey-lighter  has-text-dark">{@html category}</div>
						<div class="message-body mt-2 quiz-zone has-background-white" id="quiz-q{quizId}-z{i}" bind:this={zone[i]}></div>
					</article>
				{/each}
			</div>
  			<div class="column ">
				<article class="message  mt-5 zoneInitial">
					<div class="message-header has-background-white has-text-dark">{labelsListText}</div>
					<div class="message-body">
						<div id="quiz-q{quizId}-z0" bind:this={zoneInitial}>
							{#each answersShuffled as answer,i}
								<p class="has-text-justify py-1" class:r-success={validate && checkAnswers.filter(element=>(element[0]==answer && element[2]==true)).length>0} class:r-error={validate  && checkAnswers.length>0 && checkAnswers.filter(element=>(element[0]==answer && element[2]==false)).length>0}  id="quiz-q{quizId}-r{i}" class:draggable={!validate}>{@html answer}</p>
							{/each}
						</div>
					</div>
				</article>
			</div>
			<div class="is-size-5 is-size-6-mobile mt-3 pl-6 is-italic has-text-centered"> {#if answersChecked.filter(element=>element==false).length>0 && checkAnswers.filter(element=>(element[2]==true)).length>0}{showNotComplete}{/if}</div>
		</div>
	</div>
</div>
