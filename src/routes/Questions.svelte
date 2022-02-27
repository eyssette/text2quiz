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
		countCorrectAnswers
	} from './stores.js';
	const title = 'Quiz';
	const subtitle = 'Répondez à toutes les questions et calculez votre score';
	let questions = [];
	let questionsCodeArray = [];
	let questionCodeArray = [];
	let validate = '';
	let latex = true;
	let question2 = ['VF', 'Text2quiz est un logiciel très pratique', 'V'];
	let question1 = ['QCM', 'Avec ce logiciel _Text2quiz_ …', "A : On peut créer des quiz rapidement|B : On peut réparer sa trottinette|C : On n'a pas besoin de créer un compte |D : L'interface est minimaliste pour pouvoir être efficace", '1|3|4'];
	// let question3 = ['QR', 'Intitulé de la question', 'Réponse 1|Réponse 2|Réponse 3', '3'];
	//let question2 = ['Flashcard', "# Qu'est-ce que Text2quiz ?", "Text2quiz est une application de quiz qui permet de transformer du texte en un quiz."];
	// let question5 = ['QRC', 'Intitulé de la question', 'réponse'];
	// let question6 = ['Trous', 'Lorem ipsum {V:dolor|dolores|doloreo} sit amet. In officiis qui internos perferendis aut similique {nobis|V:nobus|nobum} est alias {possimus|V:possime}. Aut tempora {Quid|Quia|V:Quis} aut dolor gal'];
	// let question7 = ['Grille', 'Catégorie 1|Catégorie 2', '{Proposition 1|Proposition 2|Proposition 3}{Proposition 4|Proposition 5|Proposition 6|Proposition 7}']
	// let question8 = ['Ordre', 'Réponse 1|Réponse 2|Réponse 3']
	// let question9 = ['Etiquettes', 'Catégorie 1|Catégorie 2', '{etiquette 1|étiquette 2|étiquette 3}{étiquette 4|étiquette 5|étiquette 6}']
	// let question10 = ['Association', 'Catégorie 1|Catégorie 2', 'étiquette 1|étiquette 2', 'Question']
	 // let questionsDefault = [question1,question2, question3,question4,question5,question6,question7,question8,question9,question10];

	 //let questionsDefault = [question1, question2];
	 //questions = questionsDefault;
	$: if ($questionsCode && $changeQuestions) {
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