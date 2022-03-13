<script>
import {keyEvaluation,
countExpectedAnswers,
countCorrectAnswers,
generateCodeResults,
countPoints,
countPointsMax,
validation}
from './stores.js';
import {
		encrypt,
		decrypt
	} from './crypt.js';

let code;
let results;
const titleRefresh = 'Refaire le quiz';
let codeResultsShow = false;
$ : messageResults=$countCorrectAnswers.toString() + ' ' + $countExpectedAnswers.toString() + ' ' + $countPoints.toString() + ' ' + $countPointsMax.toString();
$: code = encrypt(messageResults, $keyEvaluation);

function generateCode() {
	$validation=true;
	generateCodeResults.update(n=>true);	
	codeResultsShow=true;
}

function refreshQuiz() {
	generateCodeResults.update(n=>false);
	$validation=false;
	$countCorrectAnswers=0;
	window.scrollTo(0, 0);
	codeResultsShow=false;
}

</script>

{#if !codeResultsShow}
<section class="section" id="validation">
	<div class="has-text-centered">
		<button class="button is-dark has-background-grey-dark  is-rounded is-size-4 is-size-7-mobile" type="button" on:click={generateCode}><span class="material-icons mr-2">check </span>Générer un code des résultats à transmettre à l'enseignant</button>
	</div>
</section>

{:else}
<section class="section" id="results">
	<article class="panel is-danger is-size-4 is-size-6-mobile has-text-centered">
		<p class="panel-heading">Code à transmettre</p>
		<!-- <div class="panel-block py-6"> -->
			<div class="has-text-centered my-5">{code}</div>
			<div class="has-text-centered my-5 is-size-4">Attention ce code est unique, vous ne pouvez pas copier le code de quelqu'un d'autre, ou donner ce code à quelqu'un d'autre</div>
		<!-- </div> -->
	</article>
</section>

<div class="has-text-centered mt-3">
	<button class="button is-rounded is-size-4 is-size-7-mobile " type="button" id="refreshQuiz" on:click={refreshQuiz}><span class="material-icons mr-2">refresh </span>{titleRefresh}</button>
</div>

{/if}