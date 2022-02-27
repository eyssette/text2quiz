<script>
	export let helpActive;
	const copyText = 'Copier le code dans le presse-papier';
	let helpText = [];
	helpText[0] = ["Vrai ou faux", "VF || énoncé || V", "On indique si l'énoncé est vrai ou faux avec le dernier élément, qui doit être “V” ou “F”"];
	helpText[1] = ["QCM", "QCM || Question || Réponse A|Réponse B|Réponse C || 1|3", "On peut mettre autant de réponses que l'on souhaite, en les séparant avec une barre verticale (“|”). On indique les réponses justes dans le dernier élément, avec à chaque fois le chiffre qui correspond au numéro de la réponse, en séparant les numéros avec une barre verticale (“|”)"];
	helpText[2] = ["Question / réponse", "QRC || Question || Réponse correcte|Autre réponse correcte", "À la différence du QCM, une seule réponse est possible : on indique la bonne réponse par son numéro"];
	helpText[3] = ["Question à réponse courte", "QRC || Question || Réponse correcte|Autre réponse correcte", "Ce type de question n'affiche pas de proposition de réponses, il faut écrire la réponse. On peut indiquer plusieurs réponses correctes possibles, en les séparant avec une barre verticale (“|”)"];
	helpText[4] = ["Texte à trous", "Trous || Texte avec des {V:trous|trou|trouh}, pas de {V:Latex|Lateq} possible dans les réponses", "On indique un trou à compléter avec des accolades “{}”, on place dans les accolades les différentes propositions, séparées avec une barre verticale (“|”) et on indique la bonne réponse en ajoutant avant : “V:”. On peut mettre autant de trous et autant de propositions que l'on souhaite"];
	helpText[5] = ["Flashcard", "Flashcard || recto || verso", "On écrit une question au recto et une réponse au verso"];
	helpText[6] = ["Grille", "Grille || catégorie 1|catégorie 2 || {énoncé|énoncé}{énoncé|énoncé|énoncé}", "On peut utiliser autant de catégories que l'on veut, mais la grille sera difficilement lisible au-delà de 3. Pour chaque catégorie, on met entre accolades les énoncés qui correspondent à cette catégorie, séparés par une barre verticale (“|”)"];
	helpText[7] = ["Ordre", "Ordre || énoncé 1|énoncé 2|énoncé 3", "On met dans le bon ordre les différents énoncés, séparés par une barre verticale (“|”). Les énoncés seront placés automatiquement dans le désordre dans le quiz"];
	helpText[8] = ["Etiquettes", "Etiquettes || catégorie 1|catégorie 2 || {étiquette 1|étiquette 2}{étiquette 3|étiquette 4|étiquette 5}", "On peut utiliser autant de catégories que l'on veut. Pour chaque catégorie, on met entre accolades les étiquettes qui correspondent à cette catégorie, séparées par une barre verticale (“|”)"];
	helpText[9] = ["Association", "Association || item 1|item 2 || étiquette 1|étiquette 2", "On peut utiliser autant d'items que l'on veut. Pour chaque item, on indique l'étiquette qui correspond à cet élément et on sépare les étiquettes avec une barre verticale (“|”)"];
</script>


<div class:is-hidden={!helpActive}>

	<div class="is-size-6 mt-5">
		On écrit une question sur chaque ligne de texte, avec un code du type suivant :
		<ul class="has-text-centered is-italic mt-2">
			<li>Type de la question || paramètre || paramètre|paramètre & </li>
		</ul>
		<p class="mt-3">Il faut bien respecter la syntaxe, notamment l'espace avant et après les doubles barres verticales.</p>
		<p class="mt-3">
			On peut utiliser du markdown pour mettre en gras (**gras**), en italiques (*italiques*) ou pour insérer une
			image : ![](URL de l'image)
		</p>
		<p class="mt-3">
			On peut aussi insérer une formule Latex : {'$$\\frac{a+b}{c-d}$$'}
		</p>
	</div>

	<table class="table mt-5 mb-4 is-size-6 has-text-centered is-fullwidth">
		<tr>
			<th>n°</th>
			<th>Type de question</th>
			<th>Syntaxe (exemples)</th>
			<th>Explication</th>
		</tr>
		{#each helpText as help, i}
			<tr>
				<td>{i+1}</td>
				<td>{help[0]}</td>
				<td><button class="has-tooltip-bottom has-tooltip-hidden-mobile" aria-haspopup="true" data-tooltip={copyText} on:click={()=>navigator.clipboard.writeText(help[1])}>{help[1]}</button></td>
				<td>{help[2]}</td>
			</tr>
		{/each}
  	</table>
</div>

<style>
	.table td {
		font-size: 0.9em;
	}
	
	.table td:nth-of-type(2) {
		max-width: 50px
	}
	
	.table td:nth-of-type(3) {
		max-width: 20%
	}
	
	.table td:nth-of-type(4) {
		font-size: 0.9em;
		text-align: justify;
	}
		
</style>