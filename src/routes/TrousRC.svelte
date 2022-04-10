<script>
	import {
		countCorrectAnswers,
		generateCodeResults,
		countPoints,
		countPointsMax,
		changeQuestions
	} from './stores.js';
	import sanitizeHTML from './sanitizeHTML.js';
	import {
		arrayEquals,
		removeSpacesBeforeAndAfter
	} from './functions.js';
	export let validate;
	export let quizId;
	export let text;
	const title = 'Texte à trous avec réponses courtes';
	const textNotComplete = 'Réponse partiellement juste !';
	let answer = [];
	let disabled = '';
	const reg = /\{\{(.*?)\}\}/g;
	let res = [],
		tmp;
	let fragment;
	let next= text;
	let textSplit = [];
	let textFragments = [];
	let selected = [];
	let correctAnswers = [];
	let choicesAnswers = [];
	let textAnswer;
	let choiceText = [];
	let maxCharChoices=0;
	let maxCharChoicesArray= [];
	
	while (tmp = reg.exec(text)) res.push(tmp);
	for(let i=0 ; i < res.length ; i++ ){
		fragments(res[i],i);
	}
	for (let i = 0; i < choicesAnswers.length; i++) {
		maxCharChoices = 0;
		for (let j = 0; j < choicesAnswers[i].length; j++) {
			choicesAnswers[i][j] = removeSpacesBeforeAndAfter(choicesAnswers[i][j]);
			maxCharChoices < choicesAnswers[i][j].length ? maxCharChoices = choicesAnswers[i][j].length : maxCharChoices = maxCharChoices;
		}
		maxCharChoicesArray[i] = maxCharChoices;
	}

	
	$: if ($changeQuestions) {
		next = text
		res = [],
			tmp;
		fragment = []
		textSplit = [];
		textFragments = [];
		correctAnswers = [];
		choicesAnswers = [];
		choiceText = [];
		maxCharChoices=0;
		maxCharChoicesArray= [];
		while (tmp = reg.exec(text)) res.push(tmp);
		for(let i=0 ; i < res.length ;i++ ){
			fragments(res[i],i);
		}
		for (let i = 0; i < choicesAnswers.length; i++) {
			maxCharChoices = 0;
			for (let j = 0; j < choicesAnswers[i].length; j++) {
				choicesAnswers[i][j] = removeSpacesBeforeAndAfter(choicesAnswers[i][j]);
				maxCharChoices < choicesAnswers[i][j].length ? maxCharChoices = choicesAnswers[i][j].length : maxCharChoices = maxCharChoices;
			}
			maxCharChoicesArray[i] = maxCharChoices;
		}
	}
	

	function fragments(item, index) {
		let toSplit = next.split(item[0]);
		let first = toSplit[0]
		let rest = toSplit.slice(1).join(item[0]);
		textSplit.push(first)
		fragment = first;
		next = rest;
		textFragments.push(fragment)
		if (index == res.length - 1) {
			textFragments.push(next)
		}
		choiceText = choices(res[index][0])[0];
		let choiceCorrect = choices(res[index][0])[1];
		choicesAnswers.push(choiceText)
	}
	
	

	function choiceAnswer(element) {
		element = removeSpacesBeforeAndAfter(element);
		// correctAnswers = [...correctAnswers, element]
		correctAnswers.push(element)
	}

	function choices(textChoices) {
		let textChoicesArray = [];
		let correct = false;
		textChoices = textChoices.replace('{{', '');
		textChoices = textChoices.replace('}}', '');
		// textChoicesArray = [...textChoicesArray, textChoices.split('|')]
		textChoicesArray.push(textChoices.split('|'))
		return textChoicesArray;
	}

	function testAnswer(element,index) {
		return choicesAnswers[index].includes(element ? removeSpacesBeforeAndAfter(element.replaceAll("'","&#39;").replaceAll('"',"&quot;")) : element);
	}

	$: disabled = (validate) ? 'disabled' : '';
	$: showNotComplete = (validate) ? textNotComplete : '';
	$: if (validate) {
		countPointsMax.update(n=>n+choicesAnswers.length);
		let countTemp=0;
		for (let i=0; i<choicesAnswers.length;i++) {
			if (testAnswer(answer[i],i)) {countTemp++} else {if(answer[i] &&answer[i]!='') {countTemp--}}
		}
		if (countTemp >= 0) {countPoints.update(n => n + countTemp);}
	}
	$: if (validate && answer.filter(testAnswer).length == choicesAnswers.length) {
		countCorrectAnswers.update(n => n + 1)
	}
</script>

<div class="block quiz-Trous py-2" id="quiz-q{quizId}">
	<h2 class="title has-text-centered">{title}</h2>
	<div class="box block" class:quiz-success={validate && answer.filter(testAnswer).length == choicesAnswers.length && !$generateCodeResults} class:quiz-error={validate & answer.filter(testAnswer).length != choicesAnswers.length && answer.length>0 && answer.filter(element => removeSpacesBeforeAndAfter(element)!='').length>0 && !$generateCodeResults}>
		<div class="content has-text-justified has-text-left-mobile">
			{#each textFragments as textFragment,i}
				{#if i==0}
					{@html sanitizeHTML(textFragments[0])}
						{#if !validate || !answer[0] || removeSpacesBeforeAndAfter(answer[0])==''}
							<input class="input mx-1" type="text" placeholder="" id="quiz-q{quizId}-r0" size="{maxCharChoicesArray[0]}" name="quiz-q{quizId}"  bind:value={answer[0]} {disabled} >{:else}<span class:r-success={validate && answer[0] && choicesAnswers[0].includes(removeSpacesBeforeAndAfter(answer[0].replaceAll("'","&#39;").replaceAll('"',"&quot;"))) && !$generateCodeResults} class:r-error={validate && answer[0] && !choicesAnswers[0].includes(removeSpacesBeforeAndAfter(answer[0].replaceAll("'","&#39;").replaceAll('"',"&quot;"))) && !$generateCodeResults}>{answer[0]}</span>
						{/if}
				{:else if i<textFragments.length-1}
					{@html sanitizeHTML(textFragment)}
						{#if !validate || !answer[i] || removeSpacesBeforeAndAfter(answer[i])==''}
							<input class="input mx-1" type="text" placeholder="" id="quiz-q{quizId}-r{i}" size="{maxCharChoicesArray[i]}" name="quiz-q{quizId}" bind:value={answer[i]} {disabled} >{:else}<span class:r-success={validate && answer[i] && choicesAnswers[i].includes(removeSpacesBeforeAndAfter(answer[i].replaceAll("'","&#39;").replaceAll('"',"&quot;"))) && !$generateCodeResults} class:r-error={validate && answer[i] && !choicesAnswers[i].includes(removeSpacesBeforeAndAfter(answer[i].replaceAll("'","&#39;").replaceAll('"',"&quot;"))) && !$generateCodeResults}>{answer[i]}</span>
						{/if}
				{:else if i==textFragments.length-1}
					{@html sanitizeHTML(textFragments[res.length])}
				{/if}
			{/each}
			<div class="is-size-5 is-size-6-mobile mt-5 is-italic has-text-danger has-text-centered" class:is-invisible={ answer.length==0 || answer.filter(element => removeSpacesBeforeAndAfter(element)!='').length == 0 || answer.filter(testAnswer).length == choicesAnswers.length || answer.filter(testAnswer).length == 0}>&nbsp;{#if validate && !$generateCodeResults}{showNotComplete}{/if}</div>
		</div>	
	</div>
</div>

<style>
	input {width:auto}
</style>