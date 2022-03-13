<script>
	import {
		modal
	} from './stores.js';
	let tabIndexFooter=0;
	$: $modal ? tabIndexFooter=-1 : tabIndexFooter=-0;
</script>

<footer class="footer p-5 mt-6">
	<div class="content has-text-centered is-size-6">
		<p>
			<strong class="">Text2quiz</strong> est une application créée par <a
				href="https://eyssette.github.io/" tabindex={tabIndexFooter}>Cédric Eyssette</a>, professeur de philosophie, avec les outils
			suivants :</p>
		<ul class="has-text-left">
			<li><a href="https://svelte.dev/" tabindex={tabIndexFooter}>Svelte</a> (framework JavaScript)</li>
			<li><a href="https://bulma.io/" tabindex={tabIndexFooter}>Bulma</a> (framework CSS)</li>
			<li><a href="https://github.com/SortableJS/Sortable" tabindex={tabIndexFooter}>Sortable</a> (pour les étiquettes à glisser-déposer)</li>
			<li><a href="https://katex.org/" tabindex={tabIndexFooter}>Katex</a> (pour les formules en Latex)</li>
			<li><a href="https://github.com/developit/snarkdown">Snarkdown</a> et <a href="https://github.com/Codecademy/sanitize-markdown">Sanitize markdown</a> (pour le Markdown)</li>
			<li><a href="https://github.com/entronad/crypto-es">Crypto-ES</a> et <a href="https://github.com/feross/buffer">Buffer</a> (pour les liens cryptés)</li>
		</ul>
		<p>Le code est publié sur <a href="https://github.com/eyssette/text2quiz" tabindex={tabIndexFooter}>Github</a>, sous licence
			<a href="https://github.com/eyssette/text2quiz/blob/main/LICENSE" tabindex={tabIndexFooter}>GNU General Public License v3.0</a>.
		</p>
	</div>
</footer>

<style>
	ul li {display:inline-block}
	ul li:before {content:"– "}
</style>