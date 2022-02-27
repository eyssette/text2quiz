<script>
const tooltipEdit = 'Changer le contenu de ce quiz';
const tooltipShare = 'Partager ce quiz';
const tooltipHome= "Revenir à la page d'accueil";
const textQuizContent = 'Contenu du quiz';
const textSave = 'Sauvegarder';
const textCancel = 'Annuler';
const urlQuizText = 'Lien vers ce quiz :';
const messageInvalidQuestionsText = '⚠️  Syntaxe incorrecte';
const helpActiveText = "Afficher l'aide";
const helpNotActiveText = "Masquer l'aide";
import {
	questionsCode,
	changeQuestions,
	validation,
	countCorrectAnswers
} from './stores.js';
import {
	regexValid
} from './regexValid.svelte';
import url from './url.js'
import Help from './Help.svelte';
let modalActive = '';
let helpActive = false;
let previousQuestionsCode = '';
let modalShareActive = false;


let messageInvalidQuestions = '';

$: if ($questionsCode && checkQuestions()) {
	messageInvalidQuestions = '';
} else {
	if ($questionsCode != '') {
		messageInvalidQuestions = messageInvalidQuestionsText;
		changeQuestions.update(n => false);
	} else {
		messageInvalidQuestions = '';
	}
}

function modalOn() {
	modalActive = 'is-active';
}

let newUrl;

function modalOffSave() {
	if (checkQuestions()) {
		previousQuestionsCode = $questionsCode;
		modalActive = '';
		messageInvalidQuestions = '';
		newUrl = $url.protocol+'//'+$url.host+'#' + encodeURI($questionsCode);
		history.pushState(newUrl, '', newUrl)
		$changeQuestions = true;
	}
}

function modalOffCancel() {
	modalActive = '';
	$questionsCode = previousQuestionsCode;
	$changeQuestions = true;
}

function checkQuestions() {
	let check = false;
	let chekQuestionsArray = [];
	if ($questionsCode) {
		let questionsCodeArray = $questionsCode.split(/\r?\n/);
		if (Array.isArray(questionsCodeArray)) {
			questionsCodeArray.forEach(question => {
				chekQuestionsArray.push(regexValid(question));
			})
			if (chekQuestionsArray.every(element => element == true)) {
				check = true
			}
		}
	}
	return check;
}

function goHome() {
	newUrl =  $url.protocol+'//'+$url.host;
	history.pushState(newUrl, '', newUrl);
}

let urlQuiz;

function modalShareActivate() {
	$questionsCode && checkQuestions ? urlQuiz = $url.protocol + '//' + $url.host + '#' + encodeURI($questionsCode) : urlQuiz = $url.protocol + '//' + $url.host;
	modalShareActive = !modalShareActive;
}
	
</script>

<style>
.level-right span {
	border: none;
}

.invalidQuestions {
	padding-left: 1em;
}

.modal-card {
	width: 90vw;
	max-width: 900px;
}

input {
	width: 50%;
}
</style>

<nav class="level">
	<div class="level-right">
		<span class="material-icons is-size-3 is-size-5-mobile pt-2 has-tooltip-bottom has-tooltip-hidden-mobile modal-button level-item" data-target="modal" aria-haspopup="true" data-tooltip="{tooltipHome}" on:click={goHome}>home</span>
		<span class="material-icons is-size-3 is-size-5-mobile pt-2 has-tooltip-bottom has-tooltip-hidden-mobile modal-button level-item" data-target="modal" aria-haspopup="true" data-tooltip="{tooltipEdit}" on:click={modalOn}> edit </span>
		<span class="material-icons is-size-3 is-size-5-mobile pt-2 has-tooltip-bottom has-tooltip-hidden-mobile modal-button level-item" data-target="modal2" aria-haspopup="true" data-tooltip="{tooltipShare}" on:click={modalShareActivate}>share</span>
	</div>
</nav>

<div class="modal {modalActive}">
	<div class="modal-background"></div>
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">{tooltipEdit}</p>
			<button class="delete" aria-label="close" on:click={modalOffCancel}></button>
		</header>
		<section class="modal-card-body">
			<textarea class="textarea" placeholder="{textQuizContent}" rows="20" cols="50" id="quizContent" name="quizContent" bind:value={$questionsCode}></textarea>
			<Help {helpActive} />
		</section>
		<footer class="modal-card-foot">
			<button class="button is-success" disabled={!$questionsCode || !checkQuestions()} on:click={modalOffSave}>{textSave}</button>
			<button class="button" on:click={modalOffCancel}>{textCancel}</button>
			<button class="button is-info" on:click={()=> helpActive = !helpActive}>{#if helpActive}{helpNotActiveText}{:else}{helpActiveText}{/if}</button>
			<p class='invalidQuestions has-text-danger is-size-6'> {messageInvalidQuestions}</p>
		</footer>	
	</div>
</div>

<div class="modal" class:is-active={modalShareActive}>
	<div class="modal-background"></div>
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">{tooltipShare}</p>
			<button class="delete" aria-label="close" on:click={()=>(modalShareActive=!modalShareActive)}></button>
		</header>
		<section class="modal-card-body">
			<div class="is-size-5">
				<span>{urlQuizText}</span>
				<input class="input is-small mx-5" type="text" value="{urlQuiz}" readonly />
				<span class="material-icons is-clickable"  on:click={()=>navigator.clipboard.writeText(urlQuiz)}>content_copy</span>
			</div>
		</section>
	</div>
</div>