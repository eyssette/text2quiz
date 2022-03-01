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
			<li><a href="https://github.com/SortableJS/Sortable" tabindex={tabIndexFooter}>Sortable</a> (pour la gestion des étiquettes à
				glisser-déposer)</li>
			<li><a href="https://katex.org/" tabindex={tabIndexFooter}>Katex</a> (pour la gestion des formules en Latex).</li>
		</ul>
		<p>Le code est publié sur <a href="https://github.com/eyssette/text2quiz" tabindex={tabIndexFooter}>Github</a>, mais il est sous licence
			<a href="https://commonsclause.com/" tabindex={tabIndexFooter}>Commons Clause</a>, afin d'interdire tout usage commercial.
		</p>
	</div>
</footer>