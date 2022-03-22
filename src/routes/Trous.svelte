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
		shuffleArray,
		removeSpacesBeforeAndAfter
	} from './functions.js';
	export let validate;
	export let quizId;
	export let text;
	const title = 'Texte à trous';
	const textNotComplete = 'Réponse partiellement juste !';
	let answer;
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
	
	while (tmp = reg.exec(text)) res.push(tmp);
	res.forEach(fragments);
	for (let i = 0; i < choicesAnswers.length; i++) {
		for (let j = 0; j < choicesAnswers[i].length; j++) {
			textAnswer = removeSpacesBeforeAndAfter(choicesAnswers[i][j]);
			choicesAnswers[i][j] = removeSpacesBeforeAndAfter(textAnswer.replace('V:', ''));
		}
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
		while (tmp = reg.exec(text)) res.push(tmp);
		res.forEach(fragments);
		for (let i = 0; i < choicesAnswers.length; i++) {
			for (let j = 0; j < choicesAnswers[i].length; j++) {
				textAnswer = removeSpacesBeforeAndAfter(choicesAnswers[i][j]);
				choicesAnswers[i][j] = removeSpacesBeforeAndAfter(textAnswer.replace('V:', ''));
			}
			choicesAnswers[i] = shuffleArray(choicesAnswers[i]);
		}
	}
	

	function fragments(item, index) {
		textSplit.push(next.split(item[0]));
		fragment = textSplit[index][0];
		next = textSplit[index][1];
		textFragments.push(fragment);
		if (index == res.length - 1) {
			textFragments.push(next);
		}
		let choiceText = choices(res[index][0])[0];
		let choiceCorrect = choices(res[index][0])[1];
		choicesAnswers.push(choiceText);
		choiceText.forEach(choiceAnswer);
	}
	
	

	function choiceAnswer(element) {
		element = removeSpacesBeforeAndAfter(element);
		if (element.substr(0, 2) == 'V:') {
			element = removeSpacesBeforeAndAfter(element.replace('V:', ''));
			correctAnswers.push(element);
		}
	}

	function choices(textChoices) {
		let textChoicesArray = [];
		let correct = false;
		textChoices = textChoices.replace('{{', '');
		textChoices = textChoices.replace('}}', '');
		textChoicesArray.push(textChoices.split('|'));
		return textChoicesArray;
	}
	$: disabled = (validate) ? 'disabled' : '';
	$: showNotComplete = (validate) ? textNotComplete : '';
	$: if (validate) {
		countPointsMax.update(n=>n+correctAnswers.length);
		let countTemp=0;
		for (let i=0; i<selected.length;i++) {
			if (correctAnswers.includes(selected[i])) {countTemp++} else {if(selected[i] !='default') {countTemp--}}
		}
		if (countTemp >= 0) {countPoints.update(n => n + countTemp);}
	}
	$: if (validate && selected && correctAnswers && arrayEquals(selected, correctAnswers)) {
		countCorrectAnswers.update(n => n + 1)
	}
</script>

<div class="block quiz-Trous py-2" id="quiz-q{quizId}">
	<h2 class="title has-text-centered">{title}</h2>
	<div class="box block" class:quiz-success={validate && selected && correctAnswers &&
		arrayEquals(selected,correctAnswers) && !$generateCodeResults} class:quiz-error={validate && selected && correctAnswers &&
		!arrayEquals(selected,correctAnswers) && selected.filter(value=> value=='default').length !=selected.length && !$generateCodeResults}>
		<div class="content has-text-justified has-text-left-mobile">
			{#each textFragments as textFragment,i}
				{#if i==0}
					{@html sanitizeHTML(textFragments[0])}
					{#if validate && selected[0]!='default'}
						<span class:r-success={validate && correctAnswers[0]==selected[0] && !$generateCodeResults} class:r-error={validate && correctAnswers[0]!=selected[0] && !$generateCodeResults}>{@html sanitizeHTML(selected[0])}</span>
					{:else}
						<span class="select mx-1 is-size-6 is-size-7-mobile" id="quiz-q{quizId}-r0">
							<select name="quiz-q{quizId}-r0" bind:value={selected[0]} {disabled}>
								<option value="default">…</option>
								{#each choicesAnswers[0] as choice,j}
									<option value="{choice}">{@html sanitizeHTML(choice)}</option>
									{@html sanitizeHTML(choice)}
								{/each}
							</select>
						</span>
					{/if}
				{:else if i<textFragments.length-1}
					{@html sanitizeHTML(textFragment)}
					{#if validate && selected[i]!='default'}
						<span class:r-success={validate && correctAnswers[i]==selected[i] && !$generateCodeResults} class:r-error={validate && correctAnswers[i]!=selected[i] && !$generateCodeResults}>{selected[i]}</span>
					{:else}
						<span class="select mx-1 is-size-6 is-size-7-mobile" id="quiz-q{quizId}-r{i+1}">
							<select name="quiz-q{quizId}-r{i+1}" bind:value={selected[i]} {disabled}>
								<option value="default">…</option>
								{#each choicesAnswers[i] as choice,j}
									<option value="{choice}">{@html sanitizeHTML(choice)}</option>
									{@html sanitizeHTML(choice)}
								{/each}
							</select>
						</span>
					{/if}
				{:else if i==textFragments.length-1}
					{@html sanitizeHTML(textFragments[res.length])}
				{/if}
			{/each}
			<div class="is-size-5 is-size-6-mobile mt-5 is-italic has-text-danger has-text-centered" class:is-invisible={!selected || arrayEquals(selected,correctAnswers) || selected.filter(value => value=='default').length ==selected.length || correctAnswers.filter(value => selected.includes(value)).length ==0}>&nbsp;{#if validate && !$generateCodeResults}{showNotComplete}{/if}</div>
		</div>	
	</div>
</div>