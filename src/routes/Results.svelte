<script>
import { katexify } from './katexify.js';

	import {
		countExpectedAnswers,
		countCorrectAnswers,
		countPoints,
		countPointsMax,
		validation
	} from './stores.js';
	$: percentCorrectAnswers = Math.round(($countCorrectAnswers / $countExpectedAnswers) * 100);
	let plural = '';
	$: if ($countCorrectAnswers > 1) {
		plural = 's';
	}
	const titleButton = 'Valider les réponses et voir les résultats';
	const titleResults = 'Résultats du quiz';
	const titleRefresh = 'Refaire le quiz';
	const textAnswer = 'exercice';
	const textCorrect = 'juste';
	const textFractionBar = 'sur';
	let resultsHidden = 'is-hidden';

	function resultsShow() {
		resultsHidden = '';
		$validation = true;
	}

	function resultsHide() {
		resultsHidden = 'is-hidden';
		window.scrollTo(0, 0);
		$validation = false;
		$countCorrectAnswers = 0;
		$countPoints = 0;
		$countPointsMax = 0;
		plural = '';
	}
</script>


{#if !$validation}
	<section class="section" id="validation">
		<div class="has-text-centered">
			<button class="button is-dark has-background-grey-dark  is-rounded is-size-4 is-size-7-mobile" type="button" on:click={resultsShow}><span class="material-icons mr-2">check </span>{titleButton}</button>
		</div>
	</section>
{/if}

{#if $validation}
	<section class="section {resultsHidden}" id="results">
		<article class="panel is-danger is-size-4 is-size-6-mobile has-text-centered">
			<p class="panel-heading">{titleResults}</p>
			<div class="panel-block columns mt-3 py-5">
				<div class="column"><span id="countCorrectAnswers">{$countCorrectAnswers}</span> <span id="textcountCorrectAnswers">{textAnswer}{plural} {textCorrect}{plural} {textFractionBar} <span id="countExpectedAnswers">{$countExpectedAnswers}</span></span>&nbsp;&nbsp;&nbsp;(<span id="percentCorrectAnswers">{percentCorrectAnswers}</span>%)</div>
				<div class="column"><progress class="progress is-warning" value="{percentCorrectAnswers}" max="100" id="barPercentCorrectAnswers"></progress></div>
			</div>
			<div class="py-5">Points : {$countPoints}&thinsp;/&thinsp;{$countPointsMax} <span class="is-inline-block mx-3">–</span> Note : {Math.round(($countPoints/$countPointsMax)*200)/10}&thinsp;/&thinsp;20</div>
		</article>
		<div class="has-text-centered mt-6">
			<button class="button is-rounded is-size-4 is-size-7-mobile " type="button" id="refreshQuiz" on:click={resultsHide}><span class="material-icons mr-2">refresh </span>{titleRefresh}</button>
		</div>
	</section>
{/if}