<script>
	import {marked} from 'marked';
	import {
		katexifyString
	} from './katexify';
	import Results from './Results.svelte';
	import CodeResults from './CodeResults.svelte';
	import VF from './VF.svelte';
	import QCM from './QCM.svelte';
	import QR from './QR.svelte';
	import Flashcard from './Flashcard.svelte';
	import QRC from './QRC.svelte';
	import Trous from './Trous.svelte';
	import Grille from './Grille.svelte';
	import Ordre from './Ordre.svelte';
	import Etiquettes from './Etiquettes.svelte';
	import Association from './Association.svelte';
	import Correspondance from './Correspondance.svelte';
	import TrousRC from './TrousRC.svelte';
	import {
		validation,
		questionsCode,
		changeQuestions,
		countExpectedAnswers,
		countCorrectAnswers,
		modal,
		keyEvaluation
	} from './stores.js';
	import { shuffleArray } from './functions.js';
	export let modeView;
	const title = 'Quiz';
	const subtitle = 'Répondez aux questions et calculez votre score';
	const textPoints = '1 point par réponse juste. Dans chaque exercice, une réponse fausse annule une réponse juste.';
	let questions = [];
	let questionsCodeArray = [];
	let questionCodeArray = [];
	let validate = '';
	let latex = true;
	$: if ($questionsCode && $changeQuestions && !$modal) {
		validation.update(n => false);
		$questionsCode = $questionsCode.replace(/(\r|\n)(\r|\n)*/,'\n');
		questionsCodeArray = $questionsCode.split(/\r?\n/);
	}
	$: if ($questionsCode && $changeQuestions && questionsCodeArray.length > 0) {
		let questionsCodeArrayChanged = [];
		questionsCodeArray.forEach(question => {
			questionCodeArray = question.split(/\s\|\|\s/);
			questionsCodeArrayChanged.push(questionCodeArray);
		})
		if (modeView=='crypted' || modeView=='evaluation') {
			questions = shuffleArray(questionsCodeArrayChanged);
		} else {questions = questionsCodeArrayChanged;}
	} else {}
	$: countExpectedAnswers.update(n => questions.filter(element => element !='').length);
	$: countCorrectAnswers.update(n => 0);
	$: if ($validation) {
		validate = 'validate';
	} else {
		validate = '';
	}

	marked.setOptions({pedantic: true});

	function format1(string) {
		/* string = latex ? katexifyString(marked.parse(string)) : marked.parse(string); */
		string = latex ? marked.parse(katexifyString(string)) : marked.parse(string);
		return string;
	}
	function format2(string) {
		/* string = latex ? katexifyString(marked.parse(string)).replace('<p>','').replace('</p>','') : marked.parse(string).replace('<p>','').replace('</p>',''); */
		string = latex ? marked.parse(katexifyString(string)).replace('<p>','').replace('</p>','') : marked.parse(string).replace('<p>','').replace('</p>','');
		return string;
	}

</script>

{#if $questionsCode && $changeQuestions && questionsCodeArray.length > 0}
<h1 class="title has-text-centered pt-2 is-size-1 has-text-link-dark">{title}</h1>
<h2 class="subtitle has-text-centered has-text-link-dark mt-4">{subtitle}</h2>

<h3 class="subtitle has-text-centered mb-6 is-size-6">{textPoints}</h3>


<section class="pt-6" id="section-quiz">
{#each questions as question, i}
	{#if question[0]=='VF'}
		<VF question={format1(question[1])} quizId={i} correctAnswer={question[2]} validate={$validation}/>
	{/if}
	{#if question[0]=='QCM'}
		<QCM question={format1(question[1])} quizId={i} textAnswers={format2(question[2])} validate={$validation} />
	{/if}
	{#if question[0]=='QR'}
		<QR question={format1(question[1])} quizId={i} textAnswers={format2(question[2])} validate={$validation} />
	{/if}
	{#if question[0]=='Flashcard'}
		<Flashcard quizId={i} recto={format1(question[1])} verso={format1(question[2])} validate={$validation}/>
	{/if}
	{#if question[0]=='QRC'}
		<QRC question={format1(question[1])} quizId={i} textAnswers={question[2]} validate={$validation} />
	{/if}
	{#if question[0]=='Trous'}
		<Trous text={format2(question[1])} quizId={i} validate={$validation} />
	{/if}
	{#if question[0]=='Grille'}
		<Grille categories={format2(question[1])} answersByCategoryString={format2(question[2])} question={question[3] ? format1(question[3]): question[3]} quizId={i} validate={$validation} />
	{/if}
	{#if question[0]=='Ordre'}
		<Ordre quizId={i} textAnswers={format2(question[1])} question={question[2] ? format1(question[2]) : question[2]} validate={$validation} />
	{/if}
	{#if question[0]=='Etiquettes'}
		<Etiquettes quizId={i} categories={format2(question[1])} answersByCategoryString={format2(question[2])} validate={$validation} question={question[3] ? format1(question[3]) : question[3]} />
	{/if}
	{#if question[0]=='Association'}
		<Association quizId={i} answers={format2(question[1])}  validate={$validation} question={question[2] ? format1(question[2]) : question[2]} />
	{/if}
	{#if question[0]=='Correspondance'}
		<Correspondance quizId={i} category={format1(question[1])} answers={format2(question[2])} validate={$validation} question={question[3] ? format1(question[3]) : question[3]} />
	{/if}
	{#if question[0]=='TrousRC'}
		<TrousRC text={format2(question[1])} quizId={i} validate={$validation} />
	{/if}
{/each}

</section>

{#if $keyEvaluation==''}
<Results />
{:else}
<CodeResults />
{/if}
{/if}