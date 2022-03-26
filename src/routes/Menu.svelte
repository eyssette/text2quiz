<script>
	import {
		questionsCode,
		previousQuestionsCode,
		changeQuestions,
		validation,
		countCorrectAnswers,
		countPoints,
		countPointsMax,
		home,
		modal,
		baseURL,
		darkmode
	} from './stores.js';
	import {
		checkQuestions
	} from './checkQuestions.js';
	import {cryptedModeKey} from './configEnvironment.js'
	import {
		encrypt,
		decrypt
	} from './crypt.js';
	import url from './url.js';
	import Help from './Help.svelte';
	export let modeView;

	const tooltipEditHome = 'Créer un quiz';
	const tooltipEdit = 'Modifier le quiz';
	const tooltipEditModalTitle = 'Édition du quiz'; 
	const tooltipShare = 'Lien de partage';
	const tooltipHome = 'Accueil';
	const tooltipDecrypt = 'Décrypter les résultats'
	const textQuizContent = 'Contenu du quiz';
	const textSave = 'Sauvegarder';
	const textCancel = 'Annuler';
	const urlQuizText = 'Lien vers ce quiz :';
	const messageInvalidQuestionsText = '⚠&nbsp;&nbsp;Syntaxe incorrecte';
	const helpActiveText = "Afficher l'aide";
	const helpNotActiveText = "Masquer l'aide";
	const textCodeToDecrypt = 'Copier ici (un par ligne) les codes des résultats de vos élèves'
	const textDecrypt='Décrypter';
	const textDecryptAgain="Décrypter d'autres codes";
	const tooltipLightMode = 'Mode clair';
	const tooltipDarkMode = 'Mode sombre';

	let tooltipDarkOrLightMode;
	$: $darkmode ? tooltipDarkOrLightMode = tooltipLightMode : tooltipDarkOrLightMode = tooltipDarkMode;

	let modalEditActive = '';
	let helpActive = false;
	let modalShareActive = false;
	let modalDecryptActive = false;
	let targetMenu = 0;
	let textAreaquestionsCode = '';
	let textAreaCodesToDecrypt='';
	let messageInvalidQuestions = '';

	let keyUser='';

	let codesDecrypted=[];
	let codes=[];
	let hasDuplicates = false;

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
		$validation=false;
		$countCorrectAnswers = 0;
		$countPoints = 0;
		$countPointsMax = 0;
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
			window.location.assign($baseURL+'?v=1.0#' + encodeURI(textAreaquestionsCode))
			modalEditActive = '';
			messageInvalidQuestions = '';
			$changeQuestions = true;
			$countCorrectAnswers = 0;
			$countPoints = 0;
			$countPointsMax = 0;
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
		if (modeView=='open') {
		window.location.assign('#');
		} else {
		window.location.assign($baseURL);
		}
	}


	let urlQuiz;
	let urlQuizOpen;
	let urlQuizCrypted;
	let urlQuizEvaluation;
	let mode='open';

	function modalShareActivate() {
		if ($url) {
			$questionsCode && checkQuestions ? urlQuizOpen = $url.protocol + '//' + $url.host + '?v=1.0#' + encodeURI($questionsCode) : urlQuizOpen = $url.protocol + '//' + $url.host;
			urlQuiz = urlQuizOpen;
		}
		modalShareActive = !modalShareActive;
		$modal = !$modal;
		targetMenu = -1;
	}

	function modalShareDesactivate() {
		modalShareActive = !modalShareActive;
		$modal = !$modal;
		targetMenu = 0;
	}

	function handleKeydown(event) {
		if (event.key === 'Escape') {
			if (modalEditActive == 'is-active') {
				modalEditOffCancel()
			}
			if (modalShareActive) {
				modalShareDesactivate();
			}
			if (modalDecryptActive) {
				modalDecryptDesactivate()
			}
		}
	}
	const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const passwordLength = 6;
	let keyEvaluation = "";
	for (let i = 0; i <= passwordLength; i++) {
		let randomNumber = Math.floor(Math.random() * chars.length);
		keyEvaluation += chars.substring(randomNumber, randomNumber + 1);
	}


	function modeOpen() {
		urlQuiz=urlQuizOpen;
	}

	function modeCrypted() {
		if ($url) {
			$questionsCode && checkQuestions ? urlQuiz = $url.protocol + '//' + $url.host + '?m=1&v=1.0#' + encrypt(encodeURI($questionsCode),cryptedModeKey) : urlQuiz = $url.protocol + '//' + $url.host;
		}
	}


	function modeEvaluation() {
		if ($url) {
			if (keyEvaluation=='') {urlQuiz='ATTENTION, le mode évaluation nécessite un mot de passe'} else {
			$questionsCode && checkQuestions ? urlQuiz = $url.protocol + '//' + $url.host + '?m=2&v=1.0#' + encrypt(keyEvaluation+'|||'+encodeURI($questionsCode),cryptedModeKey) : urlQuiz = $url.protocol + '//' + $url.host;
			}
		}
	}

	function modalDecryptActivate() {
		modalDecryptActive = !modalDecryptActive;
		$modal = !$modal;
		targetMenu = -1;
	}

	function arrayHasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

	function decryptCodes() {
		codes = textAreaCodesToDecrypt.split('\n');
		for (let i=0;i<codes.length;i++) {
			codesDecrypted= [...codesDecrypted, decrypt(codes[i],keyUser) ? decrypt(codes[i],keyUser) : "Erreur"]
		}
		if (arrayHasDuplicates(codesDecrypted)){hasDuplicates=true}
	}

	function modalDecryptDesactivate() {
		modalDecryptActive = !modalDecryptActive;
		$modal = !$modal;
		targetMenu = 0;
	}

	function decryptCodesAgain () {
		codes=[];
		codesDecrypted=[];
		hasDuplicates=false;
	}

	function lightOrDarkMode() {
		$darkmode = !$darkmode;
		window.document.body.classList.toggle('dark-mode')
	}

</script>

<svelte:window on:keydown={handleKeydown}/>

<nav class="level is-mobile pt-2">
	
	<div class="level-left">
		<a href="#home" class="has-tooltip-bottom has-tooltip-hidden-mobile modal-button level-item" on:click|preventDefault={goHome} tabindex="{targetMenu}" data-target="modal" aria-haspopup="true" data-tooltip="{tooltipHome}"><span class="material-icons is-size-3">home</span></a>
		{#if modeView=='open'}
		<a href="#edit" class="has-tooltip-bottom has-tooltip-hidden-mobile modal-button level-item" on:click|preventDefault={modalEditOn} tabindex="{targetMenu}" data-target="modal" aria-haspopup="true" data-tooltip="{$home ? tooltipEditHome : tooltipEdit}"><span class="material-icons is-size-3">edit </span></a>
		<a href="#share" class="has-tooltip-bottom has-tooltip-hidden-mobile modal-button level-item" on:click|preventDefault={modalShareActivate} tabindex="{targetMenu}" data-target="modal2" aria-haspopup="true" data-tooltip="{tooltipShare}"><span class="material-icons is-size-3">share</span></a>
		<a href="#decrypt" class="has-tooltip-bottom has-tooltip-hidden-mobile modal-button level-item" on:click|preventDefault={modalDecryptActivate} tabindex="{targetMenu}" data-target="modal3" aria-haspopup="true" data-tooltip="{tooltipDecrypt}"><span class="material-icons is size-3">no_encryption</span></a>
		{/if}
	</div>
	<div class="level-right">
		<a href="#lightOrDarkMode" class="has-tooltip-bottom has-tooltip-hidden-mobile modal-button level-item mr-3" on:click|preventDefault={lightOrDarkMode} tabindex="{targetMenu}" data-target="modal3" aria-haspopup="true" data-tooltip="{tooltipDarkOrLightMode}"><span class="material-icons is size-3">{#if $darkmode}light_mode{:else}dark_mode{/if}</span></a>
	</div>
</nav>
{#if modeView=='open'}

<div class="modal {modalEditActive}">
	<div class="modal-background"  on:click={modalEditOffCancel}></div>
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">{tooltipEditModalTitle}</p>
			
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
	<div class="modal-background" on:click={modalShareDesactivate}></div>
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">{tooltipShare}</p>
			<button class="delete" aria-label="close" on:click={modalShareDesactivate}></button>
		</header>
		<section class="modal-card-body">


			<div class="is-size-6 mt-1">
				<span>{urlQuizText}</span>
				<input class="input is-small mx-5" type="text" value="{urlQuiz}" readonly />
				<span class="material-icons is-clickable"
					on:click={()=>navigator.clipboard.writeText(urlQuiz)}>content_copy</span>
			</div>

			<div class="control mt-5">
				Mode de partage :
				<label class="radio">
					<input type="radio" bind:group={mode} value="open" checked on:click={modeOpen} >
					Mode ordinaire
				</label>
				<label class="radio">
					<input type="radio" bind:group={mode} value="crypted" on:click={modeCrypted} >
					Mode crypté
				</label>
				<label class="radio">
					<input type="radio" bind:group={mode} value="evaluation" on:click={modeEvaluation} >
					Mode évaluation {#if mode=='evaluation'}/ mot de passe :<input type="text" bind:value={keyEvaluation} on:input={modeEvaluation}>{/if}
				</label>
				  
			</div>
			<p class="is-size-6 mt-5">Il est recommandé de conserver pour vous-même une copie du lien en mode ordinaire. Si vous n'avez accès qu'au lien en mode crypté ou évaluation, vous ne pourrez plus éditer votre quiz.</p>
			<article class="message is-dark  mt-5">
				<div class="message-body">
			<div class="is-size-6">
				<ul>
					<li class="mt-3">
						<i>Mode ordinaire</i> : plutôt destiné au partage avec ses collègues, car le lien permet l'édition du quiz.
					</li>
					<li class="mt-3">
						<i>Mode crypté</i> : plutôt pour les élèves, pour de l'autoévaluation : les réponses ne s'affichent pas dans le lien du quiz et le quiz n'est pas éditable.
					</li>
					<li class="mt-3">
						<i>Mode évaluation</i> : comme dans le mode crypté, le lien est crypté et le quiz n'est pas éditable, mais la différence est que le résultat du quiz ne s'affiche pas. À la place, un code est généré que l'élève doit transmettre à l'enseignant·e. Ce code contient de manière cryptée le résultat de l'élève et permet l'évaluation du quiz.
					</li>
				</ul>
			</div>
				</div>
			</article>

		</section>
	</div>
</div>


<div class="modal" class:is-active={modalDecryptActive} id="decrypt">
	<div class="modal-background" on:click={modalDecryptDesactivate}></div>
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">{tooltipDecrypt}</p>
			<button class="delete" aria-label="close" on:click={modalDecryptDesactivate}></button>
		</header>
		<section class="modal-card-body">
			<div class="is-size-6 mt-1">Votre mot de passe : <input type="text" bind:value={keyUser} class="ml-3"></div>
			{#if codesDecrypted.length==0}
				<textarea class="textarea mt-5" placeholder="{textCodeToDecrypt}" rows="20" cols="50" id="quizContent" name="quizContent" bind:value={textAreaCodesToDecrypt}  tabindex="{targetMenu+1}"></textarea>
			{:else}
				<table class="table is-size-6 mx-auto my-5 is-fullwidth">
					<tr><th>Code</th><th>Résultat</th></tr>
					{#each codesDecrypted as codeDecrypted, i}
					<tr><td>{codes[i]}</td><td>{codeDecrypted}</td></tr>
					{/each}
				</table>
				<div class="mt-3 is-size-6"><b>Le résultat est toujours de la forme suivante :</b><br>Hash de l'adresse IP / Hash du navigateur / Nombre d'exercices réussis / Nombre d'exercices au total / Nombre de points / Nombre de points possibles au total<br><br>Le hash de l'adresse IP et le hash du navigateur permettent d'identifier (de manière approximative) l'ordinateur et le navigateur utilisés pour faire le quiz, mais sous une forme cryptée pour ne pas enregistrer de donnée personnelle</div>
				{#if hasDuplicates}
				<div class="mt-3 is-size-6 has-text-danger">Attention, il y a des codes identiques dans cette liste, alors qu'il ne devrait y avoir que des codes uniques !</div>
				{/if}
			{/if}
		</section>
		<footer class="modal-card-foot">
			{#if codesDecrypted.length==0}
				<button class="button is-success" disabled={textAreaCodesToDecrypt=='' || keyUser==''} on:click={decryptCodes}>{textDecrypt}</button>
			{:else}
			<button class="button is-success" on:click={decryptCodesAgain}>{textDecryptAgain}</button>
			{/if}
			<button class="button" on:click={modalDecryptDesactivate}>{textCancel}</button>
		</footer>	
	</div>
</div>

{/if}


<style>
	.level-left span, .level-right span {
		border: none;
	}

	.invalidQuestions {
		padding-left: 1em;
	}

	.modal-card {
		width: 90vw;
		max-width: 900px;
	}


	input[type=text]{
		max-width:50%;
	}

	button:focus {
		border:2px solid blue !important;
	}

	#decrypt table td {
		word-break: break-all;
	}
</style>