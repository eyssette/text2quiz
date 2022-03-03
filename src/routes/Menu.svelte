<script>
	import {
		questionsCode,
		previousQuestionsCode,
		changeQuestions,
		validation,
		countCorrectAnswers,
		home,
		modal
	} from './stores.js';
	import {
		checkQuestions
	} from './checkQuestions.js';
	import url from './url.js';
	import Help from './Help.svelte';
	const tooltipEdit = 'Changer le contenu de ce quiz';
	const tooltipShare = 'Partager ce quiz';
	const tooltipHome = 'Accueil';
	const textQuizContent = 'Contenu du quiz';
	const textSave = 'Sauvegarder';
	const textCancel = 'Annuler';
	const urlQuizText = 'Lien vers ce quiz :';
	const messageInvalidQuestionsText = '⚠&nbsp;&nbsp;Syntaxe incorrecte';
	const helpActiveText = "Afficher l'aide";
	const helpNotActiveText = "Masquer l'aide";

	let modalEditActive = '';
	let helpActive = false;
	let modalShareActive = false;
	let targetMenu = 0;
	let textAreaquestionsCode = '';


	let messageInvalidQuestions = '';

	$: if (textAreaquestionsCode && checkQuestions(textAreaquestionsCode)) {
		messageInvalidQuestions = '';
	} else {
		changeQuestions.update(n => false);
		if (textAreaquestionsCode != '') {
			messageInvalidQuestions = messageInvalidQuestionsText;
		} else {
			messageInvalidQuestions = '';
		}
	}

	function modalEditOn() {
		modalEditActive = 'is-active';
		targetMenu = -1;
		$modal = true;
		$home = false;
		textAreaquestionsCode = $previousQuestionsCode
		$previousQuestionsCode = $questionsCode;
	}



	function modalEditOffSave() {
		if (checkQuestions(textAreaquestionsCode)) {
			$previousQuestionsCode = $questionsCode;
			window.location.assign('#' + encodeURI(textAreaquestionsCode))
			modalEditActive = '';
			messageInvalidQuestions = '';
			$changeQuestions = true;
			$countCorrectAnswers = 0;
			targetMenu = 0;
			$modal = false;
		}
	}

	function modalEditOffCancel() {
		modalEditActive = '';
		$questionsCode = $previousQuestionsCode;
		$changeQuestions = true;
		targetMenu = 0;
		$modal = false;
		if (textAreaquestionsCode == '') {
			home.update(n => true)
		}
	}


	function goHome() {
		questionsCode.update(n => '');
		previousQuestionsCode.update(n => '');
		window.location.assign('');
	}


	let urlQuiz;

	function modalShareActivate() {
		if ($url) {
			$questionsCode && checkQuestions ? urlQuiz = $url.protocol + '//' + $url.host + '#' + encodeURI($questionsCode) : urlQuiz = $url.protocol + '//' + $url.host;
		}
		modalShareActive = !modalShareActive;
		$modal = !$modal;
	}

	function handleKeydown(event) {
		if (event.key === 'Escape') {
			if (modalEditActive == 'is-active') {
				modalEditOffCancel()
			}
			if (modalShareActive) {
				modalShareActive = !modalShareActive;
				$modal = !$modal;
			}
		}
	}
</script>

<svelte:window on:keydown={handleKeydown}/>

<nav class="level pt-2">
	<div class="level-right">
		<a href="#home" class="has-tooltip-bottom has-tooltip-hidden-mobile modal-button level-item" on:click|preventDefault={goHome} tabindex="{targetMenu}" data-target="modal" aria-haspopup="true" data-tooltip="{tooltipHome}"><span class="material-icons is-size-3 is-size-5-mobile">home</span></a>
		<a href="#edit" class="has-tooltip-bottom has-tooltip-hidden-mobile modal-button level-item" on:click|preventDefault={modalEditOn} tabindex="{targetMenu}" data-target="modal" aria-haspopup="true" data-tooltip="{tooltipEdit}"><span class="material-icons is-size-3 is-size-5-mobile">edit </span></a>
		<a href="#share" class="has-tooltip-bottom has-tooltip-hidden-mobile modal-button level-item" on:click|preventDefault={modalShareActivate} tabindex="{targetMenu}" data-target="modal2" aria-haspopup="true" data-tooltip="{tooltipShare}"><span class="material-icons is-size-3 is-size-5-mobile">share</span></a>
	</div>
</nav>

<div class="modal {modalEditActive}">
	<div class="modal-background"  on:click={modalEditOffCancel}></div>
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">{tooltipEdit}</p>
			
		</header>
		<section class="modal-card-body">
			<textarea class="textarea" placeholder="{textQuizContent}" rows="20" cols="50" id="quizContent" name="quizContent" bind:value={textAreaquestionsCode}  tabindex="{targetMenu+1}"></textarea>
			<Help {helpActive} />
		</section>
		<footer class="modal-card-foot">
			<button class="button is-success" disabled={textAreaquestionsCode=='' || !checkQuestions(textAreaquestionsCode)} on:click={modalEditOffSave}>{textSave}</button>
			<button class="button" on:click={modalEditOffCancel}>{textCancel}</button>
			<button class="button is-info" on:click={()=> helpActive = !helpActive}>{#if helpActive}{helpNotActiveText}{:else}{helpActiveText}{/if}</button>
			<p class='invalidQuestions has-text-danger is-size-6'>&nbsp;{@html messageInvalidQuestions}</p>
		</footer>	
	</div>
</div>

<div class="modal" class:is-active={modalShareActive}>
	<div class="modal-background" on:click={()=>(modalShareActive=!modalShareActive)}></div>
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

	button:focus {
		border:2px solid blue !important;
	}
</style>