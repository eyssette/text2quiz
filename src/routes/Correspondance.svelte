<script>
	import {
		countCorrectAnswers,
		changeQuestions,
		generateCodeResults,
		countPoints,
		countPointsMax
	} from './stores.js';
	import {
arrayEquals,
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
	export let validate;
	export let quizId;
	export let category;
	export let question='';
	const textNotComplete = "Réponse partiellement juste";
	const labelsListText = 'Étiquettes à sélectionner';
	export let answers;
	$: categoryText = removeSpacesBeforeAndAfter(category);
	let answersByCategoryString = '';
	let answersByCategory = [];
	let answersShuffled = [];
	let answersChecked = [];
	let partialCheck = [];
	let checkAnswers = [];
	let zoneInitial;
	let zone1;
	let orderStrict=false;
	const titleBaseText = 'Correspondance';
	const titleOrderText = ' stricte'
	let title;
	$: orderStrict ? title = titleBaseText+titleOrderText : title = titleBaseText;
	const subtitleBaseText = "Retrouvez les étiquettes qui correspondent";
	const subtitleOrderText = " et placez les dans l'ordre";
	let subtitle;
	$: orderStrict ? subtitle = subtitleBaseText+subtitleOrderText : subtitle = subtitleBaseText;

	onMount(async function () {
		Sortable.create(zoneInitial, {
			group: {
				name: 'etiquettes',
				pull: true,
				draggable: ".draggable",
			},
			draggable: ".draggable",
			animation: 200
		});
			Sortable.create(zone1, {
				group: {
					name: 'etiquettes',
					pull: true,
				},
				draggable: ".draggable",
				animation: 200
			});
	});

	$: afterUpdate(async function () {
		Sortable.create(zoneInitial, {
			group: {
				name: 'etiquettes',
				pull: true,
				draggable: ".draggable",
			},
			draggable: ".draggable",
			animation: 200
		});
			Sortable.create(zone1, {
				group: {
					name: 'etiquettes',
					pull: true,
				},
				draggable: ".draggable",
				animation: 200
			});
	});

	if (answers.match(/ORDRE\s*\|/)) {
		answersByCategoryString=answers.replace(/ORDRE\s*\|/,'');
		orderStrict=true;
	} else {
		answersByCategoryString=answers;
		orderStrict=false;
	}

	
	const reg = /\{\{(.*?)\}\}/g;
	let res = [],
		tmp;
	while (tmp = reg.exec(answersByCategoryString)) res.push(tmp);
	res.forEach(choices);



	$: if ($changeQuestions) {
		if (answers.match(/ORDRE\s*\|/)) {
		answersByCategoryString=answers.replace(/ORDRE\s*\|/,'');
		orderStrict=true;
	} else {
		answersByCategoryString=answers;
		orderStrict=false;
	}
	answersByCategory=[]
	answersShuffled=[]
	let res = [],
		tmp;
	while (tmp = reg.exec(answersByCategoryString)) res.push(tmp);
	res.forEach(choices);
	}

	function choices(element) {
		let choicesArray = element[1].split('|');
		for (let i=0;i<choicesArray.length;i++) {
			choicesArray[i] = removeSpacesBeforeAndAfter(choicesArray[i]);
		}
		answersByCategory = [...answersByCategory, choicesArray];
		answersShuffled = shuffleArray(answersShuffled.concat(choicesArray))
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
	let answersZone1 = [];
	$: disabled = (validate) ? 'disabled' : '';
	$: showNotComplete = (validate) ? textNotComplete : '';
	$: if (validate) {
		countPointsMax.update(n=>n+answersByCategory[0].length);
		
		if (zoneInitial) {
			answersZoneInitial = childrenTexts(zoneInitial);
		}
		let answersZone1;
		answersChecked = [];
		checkAnswers = [];
		answersZone1=childrenTexts(zone1);
		

		for (let i = 0;i<answersZone1.length;i++){
			partialCheck = [];
			if (answersByCategory[0].includes(answersZone1[i].replaceAll("'","&#39;").replaceAll('"',"&quot;"))) {
					partialCheck[i] = true
				} else {
					partialCheck[i] = false
				}
				checkAnswers.push([answersZone1[i], partialCheck[i], answersZone1[i] == answersByCategory[0][i] ? true : false]);
			}

		if (orderStrict) {
			if (arrayEquals(answersZone1,answersByCategory[0])) {
				countCorrectAnswers.update(n => n + 1)
			}
		} else {
			if (checkAnswers.filter(element=>element[1]==true).length == answersByCategory[0].length && checkAnswers.filter(element=>element[1]==false).length==0) {
				countCorrectAnswers.update(n => n + 1)
			}
		}
		
		let countTemp = 0;
		for (let i=0;i<checkAnswers.length;i++) {
			if (orderStrict) {
				if (checkAnswers[i][1]==true && checkAnswers[i][2]==true) {countTemp++} else {countTemp--}
			} else {
				if (checkAnswers[i][1]==true) {countTemp++} else {countTemp--}
			}
			
		}
		if (countTemp >= 0) {countPoints.update(n => n + countTemp);}




	
	}

</script>


{#if orderStrict}
<div class="block quiz-Etiquettes py-2" id="quiz-q{quizId}">
	<h2 class="title has-text-centered">{title}</h2>
		<div class="box block" class:quiz-success={validate && orderStrict && checkAnswers.filter(element=>element[1]==true && element[2]==true).length == answersByCategory[0].length && checkAnswers.filter(element=>element[1]==false || element[2]==false).length==0 && !$generateCodeResults} class:quiz-error={validate && orderStrict && checkAnswers.length>0 &&
		(checkAnswers.filter(element=>element[1]==false || element[2]==false).length>0 || checkAnswers.filter(element=>element[1]==true).length != answersByCategory[0].length) && !$generateCodeResults}>
		<p class="has-text-centered block has-text-weight-medium">{subtitle}</p>
		<div class="content">{@html sanitizeHTML(question)}</div>
		<div class="columns is-mobile mt-5">
			<div class="column column is-half">
				<article class="message has-background-white">
					<div class="message-header has-background-grey-lighter  has-text-dark">{@html sanitizeHTML(categoryText)}</div>
					<div class="message-body mt-2 quiz-zone has-background-white" id="quiz-q{quizId}-z1" bind:this={zone1}></div>
				</article>
			</div>
  			<div class="column">
				<article class="message  zoneInitial">
					<div class="message-header has-background-white has-text-dark">{labelsListText}</div>
					<div class="message-body">
						<div id="quiz-q{quizId}-z0" bind:this={zoneInitial}>
							{#each answersShuffled as answer,i}
									<p class="has-text-justified py-1" class:r-success={validate && orderStrict && checkAnswers.filter(element=>(element[0].replaceAll("'","&#39;").replaceAll('"',"&quot;")==answer && element[1]==true && element[2]==true)).length>0 && !$generateCodeResults} class:r-error={validate && orderStrict && checkAnswers.filter(element=>(element[0].replaceAll("'","&#39;").replaceAll('"',"&quot;")==answer && element[1]==false)).length>0 && !$generateCodeResults} class:r-partial-success={validate && orderStrict && checkAnswers.filter(element=>(element[0].replaceAll("'","&#39;").replaceAll('"',"&quot;")==answer && element[1]==true && element[2]==false)).length>0 && !$generateCodeResults}  id="quiz-q{quizId}-r{i}" class:draggable={!validate}>{@html sanitizeHTML(answer)}</p>
							{/each}
						</div>
					</div>
				</article>
			</div>
		</div>
		<div class="is-size-5 is-size-6-mobile mt-3 is-italic has-text-centered has-text-danger">&nbsp;{#if checkAnswers.filter(element=>element[1]==true).length != answersByCategory[0].length && checkAnswers.filter(element=>(element[1]==true)).length>0 && !$generateCodeResults}{showNotComplete}{/if}</div>
	</div>
</div>
{:else}
<div class="block quiz-Etiquettes py-2" id="quiz-q{quizId}">
	<h2 class="title has-text-centered">{title}</h2>
		<div class="box block" class:quiz-success={validate && !orderStrict && checkAnswers.filter(element=>element[1]==true).length == answersByCategory[0].length && checkAnswers.filter(element=>element[1]==false).length==0 && !$generateCodeResults} class:quiz-error={validate && !orderStrict && checkAnswers.length>0 &&
		(checkAnswers.filter(element=>element[1]==false).length>0 || checkAnswers.filter(element=>element[1]==true).length != answersByCategory[0].length) && !$generateCodeResults}>
		<p class="has-text-centered block has-text-weight-medium">{subtitle}</p>
		<div class="content">{@html sanitizeHTML(question)}</div>
		<div class="columns is-mobile mt-5">
			<div class="column column is-half">
				<article class="message has-background-white">
					<div class="message-header has-background-grey-lighter  has-text-dark">{@html sanitizeHTML(categoryText)}</div>
					<div class="message-body mt-2 quiz-zone has-background-white" id="quiz-q{quizId}-z1" bind:this={zone1}></div>
				</article>
			</div>
  			<div class="column">
				<article class="message  zoneInitial">
					<div class="message-header has-background-white has-text-dark">{labelsListText}</div>
					<div class="message-body">
						<div id="quiz-q{quizId}-z0" bind:this={zoneInitial}>
							{#each answersShuffled as answer,i}
									<p class="has-text-justified py-1" class:r-success={validate && !orderStrict && checkAnswers.filter(element=>(element[0].replaceAll("'","&#39;").replaceAll('"',"&quot;")==answer && element[1]==true)).length>0 && !$generateCodeResults} class:r-error={validate && !orderStrict && checkAnswers.filter(element=>(element[0].replaceAll("'","&#39;").replaceAll('"',"&quot;")==answer && element[1]==false)).length>0 && !$generateCodeResults}  id="quiz-q{quizId}-r{i}" class:draggable={!validate}>{@html sanitizeHTML(answer)}</p>
							{/each}
						</div>
					</div>
				</article>
			</div>
		</div>
		<div class="is-size-5 is-size-6-mobile mt-3 is-italic has-text-centered has-text-danger">&nbsp;{#if checkAnswers.filter(element=>element[1]==true).length != answersByCategory[0].length && checkAnswers.filter(element=>(element[1]==true)).length>0 && !$generateCodeResults}{showNotComplete}{/if}</div>
	</div>
</div>
{/if}


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

	.r-partial-success {
		border: 1px solid orange!important;
	}

</style>