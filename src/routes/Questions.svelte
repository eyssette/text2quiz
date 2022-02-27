<script>
	import {
		katexifyString
	} from './katexify';
	import Texte from './Texte.svelte';
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
	//import {MarkdownIt} from 'https://cdnjs.cloudflare.com/ajax/libs/markdown-it/12.0.4/markdown-it.min.js';
	import MarkdownIt from 'markdown-it';
	const md = new MarkdownIt();
	let questions = [];
	let questionsCodeArray = [];
	let questionCodeArray = [];
	let validate = '';
	let latex = true;
	//let textInitial=['Texte',"Le principe","[Text2quiz](https://text2quiz.vercel.app/) est une application de quiz qui permet de transformer du texte en un quiz \n ### Comment ça marche ? \n On clique sur l'icône ✏️ pour éditer son quiz, et sur l'icône 🔗 pour créer un lien vers le quiz afin de partager"];
	let question1 = ['VF', 'Intitulé de la question', 'V'];
	let question2 = ['QCM', 'Intitulé de la question', 'A : Réponse 1|B : Réponse 2|C : Réponse 3|D : Réponse 4', '1|2'];
	let question3 = ['QR', 'Intitulé de la question', 'Réponse 1|Réponse 2|Réponse 3', '3'];
	let question4 = ['Flashcard', "# Lorem ipsum dolor sit amet ?", "Lorem ipsum dolor sit amet. In officiis qui internos perferendis aut similique nobis est alias possimus. Aut tempora Quis aut dolor galisum est molestiae repudiandae hic quia rerum sed corrupti alias. Id molestiae rerum nam magnam quos non consequatur blanditiis et ipsam commodi &"];
	let question5 = ['QRC', 'Intitulé de la question', 'réponse'];
	let question6 = ['Trous', 'Lorem ipsum {V:dolor|dolores|doloreo} sit amet. In officiis qui internos perferendis aut similique {nobis|V:nobus|nobum} est alias {possimus|V:possime}. Aut tempora {Quid|Quia|V:Quis} aut dolor gal'];
	let question7 = ['Grille', 'Catégorie 1|Catégorie 2', '{Proposition 1|Proposition 2|Proposition 3}{Proposition 4|Proposition 5|Proposition 6|Proposition 7}']
	let question8 = ['Ordre', 'Réponse 1|Réponse 2|Réponse 3']
	let question9 = ['Etiquettes', 'Catégorie 1|Catégorie 2', '{etiquette 1|étiquette 2|étiquette 3}{étiquette 4|étiquette 5|étiquette 6}']
	let question10 = ['Association', 'Catégorie 1|Catégorie 2', 'étiquette 1|étiquette 2', 'Question']
	let questionsDefault = [question1,question2,question3,question4,question5,question6,question7,question8,question9,question10];
	//questionsDefault.forEach(question =>{question.forEach(function(element, index) {this[index] = katexifyString(element);}, question);});
	questions = questionsDefault;
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
		//	if (latex) {
		//		questionsCodeArrayChanged.forEach(question =>{question.forEach(function(element, index) {
		//  this[index] = katexifyString(md.render(element));}, question);})
		//	} else {
		//	}		
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

{#each questions as question, i}
	{#if question[0]=='Texte'}
		<Texte title={question[1]} content={latex ? katexifyString(md.render(question[2])) : md.render(question[2])} />
	{/if}
	{#if question[0]=='VF'}
		<VF question={latex ? katexifyString(md.render(question[1])) : md.render(question[1])} quizId={i} correctAnswer={question[2]} validate={$validation}/>
	{/if}
	{#if question[0]=='QCM'}
		<QCM question={latex ? katexifyString(md.render(question[1])) : md.render(question[1])} quizId={i} textAnswers={latex ? katexifyString(md.render(question[2])).replace('<p>','').replace('</p>','') : md.render(question[2]).replace('<p>','').replace('</p>','')} validate={$validation} correctAnswersString={question[3]} />
	{/if}
	{#if question[0]=='QR'}
		<QR question={latex ? katexifyString(md.render(question[1])) : md.render(question[1])} quizId={i} textAnswers={latex ? katexifyString(md.render(question[2])).replace('<p>','').replace('</p>','') : md.render(question[2]).replace('<p>','').replace('</p>','')} correctAnswerString={question[3]} validate={$validation} />
	{/if}
	{#if question[0]=='Flashcard'}
		<Flashcard quizId={i} recto={latex ? katexifyString(md.render(question[1])) : md.render(question[1])} verso={latex ? katexifyString(md.render(question[2])) : md.render(question[2])} validate={$validation}/>
	{/if}
	{#if question[0]=='QRC'}
		<QRC question={latex ? katexifyString(md.render(question[1])) : md.render(question[1])} quizId={i} textAnswers={question[2]} validate={$validation} />
	{/if}
	{#if question[0]=='Trous'}
		<Trous text={latex ? katexifyString(md.render(question[1])).replace('<p>','').replace('</p>','') : md.render(question[1]).replace('<p>','').replace('</p>','')} quizId={i} validate={$validation} />
	{/if}
	{#if question[0]=='Grille'}
		<Grille categories={latex ? katexifyString(md.render(question[1])).replace('<p>','').replace('</p>','') : md.render(question[1]).replace('<p>','').replace('</p>','')} answersByCategoryString={latex ? katexifyString(md.render(question[2])).replace('<p>','').replace('</p>','') : md.render(question[2]).replace('<p>','').replace('</p>','')} quizId={i} validate={$validation} />
	{/if}
	{#if question[0]=='Ordre'}
		<Ordre quizId={i} textAnswers={latex ? katexifyString(md.render(question[1])).replace('<p>','').replace('</p>','') : md.render(question[1]).replace('<p>','').replace('</p>','')} validate={$validation} />
	{/if}
	{#if question[0]=='Etiquettes'}
		<Etiquettes quizId={i} categories={latex ? katexifyString(md.render(question[1])).replace('<p>','').replace('</p>','') : md.render(question[1]).replace('<p>','').replace('</p>','')} answersByCategoryString={latex ? katexifyString(md.render(question[2])).replace('<p>','').replace('</p>','') : md.render(question[2]).replace('<p>','').replace('</p>','')} validate={$validation} />
	{/if}
	{#if question[0]=='Association'}
		<Association quizId={i} categories={latex ? katexifyString(md.render(question[1])).replace('<p>','').replace('</p>','') : md.render(question[1]).replace('<p>','').replace('</p>','')} answersByCategoryString={latex ? katexifyString(md.render(question[2])).replace('<p>','').replace('</p>','') : md.render(question[2]).replace('<p>','').replace('</p>','')} validate={$validation} question={question[3]} />
	{/if}
{/each}