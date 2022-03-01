<script>
	import snarkdown from 'snarkdown'
	import {
		katexifyString
	} from './katexify';
	import Results from './Results.svelte';
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
	import {
		validation,
		questionsCode,
		changeQuestions,
		countExpectedAnswers,
		countCorrectAnswers,
		modal
	} from './stores.js';
	const title = 'Quiz';
	const subtitle = 'Répondez à toutes les questions et calculez votre score';
	let questions = [];
	let questionsCodeArray = [];
	let questionCodeArray = [];
	let validate = '';
	let latex = true;
	$: if ($questionsCode && $changeQuestions && !$modal) {
		validation.update(n => false);
		questionsCodeArray = $questionsCode.split(/\r?\n/);
	}
	$: if ($questionsCode && $changeQuestions && questionsCodeArray.length > 0) {
		let questionsCodeArrayChanged = [];
		questionsCodeArray.forEach(question => {
			questionCodeArray = question.split(/\s\|\|\s/);
			questionsCodeArrayChanged.push(questionCodeArray);
		})	
		questions = questionsCodeArrayChanged;
	} else {}
	$: countExpectedAnswers.update(n => questions.length);
	$: countCorrectAnswers.update(n => 0);
	$: if ($validation) {
		validate = 'validate';
	} else {
		validate = '';
	}
</script>

{#if $questionsCode && $changeQuestions && questionsCodeArray.length > 0}
<h1 class="title has-text-centered pt-2 is-size-1 has-text-link-dark">{title}</h1>
<h2 class="subtitle has-text-centered has-text-link-dark mt-4">{subtitle}</h2>

<section class="pt-6">
{#each questions as question, i}
	{#if question[0]=='VF'}
		<VF question={latex ? katexifyString(snarkdown(question[1])) : snarkdown(question[1])} quizId={i} correctAnswer={question[2]} validate={$validation}/>
	{/if}
	{#if question[0]=='QCM'}
		<QCM question={latex ? katexifyString(snarkdown(question[1])) : snarkdown(question[1])} quizId={i} textAnswers={latex ? katexifyString(snarkdown(question[2])).replace('<p>','').replace('</p>','') : snarkdown(question[2]).replace('<p>','').replace('</p>','')} validate={$validation} correctAnswersString={question[3]} />
	{/if}
	{#if question[0]=='QR'}
		<QR question={latex ? katexifyString(snarkdown(question[1])) : snarkdown(question[1])} quizId={i} textAnswers={latex ? katexifyString(snarkdown(question[2])).replace('<p>','').replace('</p>','') : snarkdown(question[2]).replace('<p>','').replace('</p>','')} correctAnswerString={question[3]} validate={$validation} />
	{/if}
	{#if question[0]=='Flashcard'}
		<Flashcard quizId={i} recto={latex ? katexifyString(snarkdown(question[1])) : snarkdown(question[1])} verso={latex ? katexifyString(snarkdown(question[2])) : snarkdown(question[2])} validate={$validation}/>
	{/if}
	{#if question[0]=='QRC'}
		<QRC question={latex ? katexifyString(snarkdown(question[1])) : snarkdown(question[1])} quizId={i} textAnswers={question[2]} validate={$validation} />
	{/if}
	{#if question[0]=='Trous'}
		<Trous text={latex ? katexifyString(snarkdown(question[1])).replace('<p>','').replace('</p>','') : snarkdown(question[1]).replace('<p>','').replace('</p>','')} quizId={i} validate={$validation} />
	{/if}
	{#if question[0]=='Grille'}
		<Grille categories={latex ? katexifyString(snarkdown(question[1])).replace('<p>','').replace('</p>','') : snarkdown(question[1]).replace('<p>','').replace('</p>','')} answersByCategoryString={latex ? katexifyString(snarkdown(question[2])).replace('<p>','').replace('</p>','') : snarkdown(question[2]).replace('<p>','').replace('</p>','')} quizId={i} validate={$validation} />
	{/if}
	{#if question[0]=='Ordre'}
		<Ordre quizId={i} textAnswers={latex ? katexifyString(snarkdown(question[1])).replace('<p>','').replace('</p>','') : snarkdown(question[1]).replace('<p>','').replace('</p>','')} subtitle={question[2]} validate={$validation} />
	{/if}
	{#if question[0]=='Etiquettes'}
		<Etiquettes quizId={i} categories={latex ? katexifyString(snarkdown(question[1])).replace('<p>','').replace('</p>','') : snarkdown(question[1]).replace('<p>','').replace('</p>','')} answersByCategoryString={latex ? katexifyString(snarkdown(question[2])).replace('<p>','').replace('</p>','') : snarkdown(question[2]).replace('<p>','').replace('</p>','')} validate={$validation} />
	{/if}
	{#if question[0]=='Association'}
		<Association quizId={i} categories={latex ? katexifyString(snarkdown(question[1])).replace('<p>','').replace('</p>','') : snarkdown(question[1]).replace('<p>','').replace('</p>','')} answersByCategoryString={latex ? katexifyString(snarkdown(question[2])).replace('<p>','').replace('</p>','') : snarkdown(question[2]).replace('<p>','').replace('</p>','')} validate={$validation} question={question[3]} />
	{/if}
{/each}

</section>

<Results />
{/if}