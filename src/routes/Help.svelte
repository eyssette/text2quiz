<script>
	export let helpActive;
	const copyText = 'Cliquer pour copier le\n code dans le presse-papier';
	const helpText = [];
	helpText[0] = ["Vrai ou faux", "VF || Énoncé || V", "On indique si l'énoncé est vrai ou faux avec le dernier élément, qui doit être V ou F"];
	helpText[1] = ["QCM", "QCM || Question || V:Réponse A | Réponse B | V:Réponse C | Réponse D", "On peut mettre autant de réponses que l'on souhaite, en les séparant avec une barre verticale : |. On indique chaque réponse juste en mettant “V:” avant"];
	helpText[2] = ["Question / réponse", "QR || Question || V:Réponse A | Réponse B | Réponse C", "À la différence du QCM, une seule réponse est possible : on indique la bonne réponse en mettant “V:” avant"];
	helpText[3] = ["Question à réponse courte", "QRC || Question || Réponse correcte | Autre réponse correcte", "Ce type de question n'affiche pas de proposition de réponses, il faut écrire la réponse. On peut indiquer plusieurs réponses correctes possibles, en les séparant avec une barre verticale : |"];
	helpText[4] = ["Texte à trous", "Trous || Texte avec des {{V:trous|trou}}", "On indique un trou à compléter avec une double accolade : {{trou}}} . On peut mettre autant de trous et autant de propositions que l'on souhaite. On place dans les doubles accolades les différentes propositions, séparées avec une barre verticale : | et on indique la bonne réponse en ajoutant avant : V:"];
	helpText[5] = ["Texte à trous avec réponses courtes", "TrousRC || Texte avec des {{trous|vides}}", "On indique un trou à compléter avec une double accolade : {{trou}}} . On peut mettre autant de trous et autant de propositions que l'on souhaite. On place dans les doubles accolades les différentes propositions correctes, séparées avec une barre verticale"];
	helpText[6] = ["Flashcard", "Flashcard || Recto || Verso", "On écrit une question au recto et une réponse au verso"];
	helpText[7] = ["Grille", "Grille || Catégorie 1 | Catégorie 2 || {{Énoncé 1 catégorie 1 | Énoncé 2 catégorie 1}}{{Énoncé 1 catégorie 2 | Énoncé 2 catégorie 2}} || Consigne (facultatif)", "On peut utiliser autant de catégories que l'on veut, mais la grille sera difficilement lisible au-delà de 3. Pour chaque catégorie, on met entre doubles accolades les énoncés qui correspondent à cette catégorie, séparés par une barre verticale : |"];
	helpText[8] = ["Ordre", "Ordre || Énoncé 1 | Énoncé 2 | Énoncé 3 || Consigne (facultatif)", "On met dans le bon ordre les différents énoncés, séparés par une barre verticale : |. Les énoncés seront placés automatiquement dans le désordre dans le quiz"];
	helpText[9] = ["Etiquettes", "Etiquettes || Catégorie 1 | Catégorie 2 || {{Étiquette 1 catégorie 1 | Étiquette 2 catégorie 1}}{{Étiquette 1 catégorie 2 | Étiquette 2 catégorie 1}} || Consigne (facultatif)", "On peut utiliser autant de catégories que l'on veut. Pour chaque catégorie, on met entre doubles accolades : {{ }} les étiquettes qui correspondent à cette catégorie, séparées par une barre verticale : |"];
	helpText[10] = ["Association", "Association || {{Item 1 | Étiquette 1}}{{Item 2 | Étiquette 2}} || Consigne (facultatif)", "On peut utiliser autant d'items que l'on veut. On place dans des doubles accolades {{ }} chaque item et l'étiquette qui corespond, séparés avec une barre verticale : |"];
	helpText[11] = ["Correspondance", "Correspondance || Catégorie || {{Étiquette correspondante 1 | Étiquette correspondante 2}}{{Étiquette 1 hors catégorie | Étiquette 2 hors catégorie}} || Consigne (facultatif)", "On n'utilise ici qu'une seule catégorie et on met entre doubles accolades : {{ }} les étiquettes qui correspondent à catégorie, puis entre doubles accolades les étiquettes qui ne correspondent pas à la catégorie. On sépare les étiquettes avec une barre verticale: |. On peut ajouter l'étiquette ORDRE dans le premier groupement d'étiquettes si on veut que les étiquettes soient placées dans le bon ordre"];
	helpText[12] = ["Correspondance stricte", "Correspondance || Catégorie || {{ORDRE | Étiquette correspondante place 1 | Étiquette correspondante place 2}}{{Étiquette 1 hors catégorie | Étiquette 2 hors catégorie}} || Consigne (facultatif)", "Même syntaxe que pour qu'un exercice de type “Correspondance”, mais les étiquettes doivent être placées dans le bon ordre. Il suffit d'ajouter ORDRE comme première étiquette"];
</script>


<div class:is-hidden={!helpActive}>

	<div class="is-size-6 mt-5">
		<p>On écrit une question par ligne de texte (on peut laisser des lignes vides pour séparer les questions). Il faut bien respecter la syntaxe, notamment l'espace avant et après les doubles barres verticales. On peut en revanche mettre ou ne pas mettre un espace avant ou après une barre verticale simple.</p>
		<p class="mt-1">
			On peut utiliser : <i>du Markdown</i>, notamment pour mettre en gras (**gras**), en italiques (*italiques*) ou pour insérer une image : ![](URL), <i>des formules en Latex</i> : $$formule$$, et <i>des balises HTML</i> notamment pour insérer des vidéos ou faire une mise en page plus précise.
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
				<td><span class="has-tooltip-bottom has-tooltip-hidden-mobile" aria-haspopup="true" data-tooltip={copyText} on:click={()=>navigator.clipboard.writeText(help[1])}>{help[1]}</span></td>
				<td>{help[2]}</td>
			</tr>
		{/each}
  	</table>
</div>

<style>
	.table td {
		font-size: 0.9em;
		vertical-align: middle;
	}
	
	.table td:nth-of-type(4) {
		font-size: 0.9em;
		text-align: justify;
	}

	span[data-tooltip] {
		border-bottom:none;
	}
		
</style>