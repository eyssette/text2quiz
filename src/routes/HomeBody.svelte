<script>
	import {
		assign
	} from 'svelte/internal';
	import {
		baseURL
	} from './stores.js';
	import url from './url.js';
</script>


<h1 class="title has-text-centered is-1">Text2quiz</h1>

<div class="box block px-6 py-5 mt-6">
	<div class="content has-text-justified">
		
		<div>Text2quiz est une application de quiz qui permet de transformer du texte en un quiz. Le principe est simple :</div>
		<ol>
			<li>On clique sur l'icône <span class="material-icons"> edit </span> pour éditer son quiz.</li>
			<li>On clique sur l'icône <span class="material-icons">share</span> pour créer un lien vers le quiz afin de le partager.</li>
		</ol>

		<article class="message is-dark">
			<div class="message-body">
				<h4>Avantages :</h4>
				<ul>
					<li>pas de compte à créer</li>
					<li>interface minimaliste pour pouvoir créer rapidement un quiz</li>
				</ul>
			</div>
		</article>

		<h4 class="is-4 has-text-left mt-5 mb-6">Comment ça marche ?</h4>
		<ul>
			<li>Pour écrire son quiz, on doit coder chaque question</li>
			<li>On peut afficher l'aide dans la fenêtre d'édition du quiz, et commencer d'abord par les types de question les plus simples</li>
		</ul>

		<div class="mt-5 mb-6 has-text-centered"><a href="{$baseURL}#VF%20%7C%7C%20Énoncé%20%7C%7C%20V%0AQCM%20%7C%7C%20Question%20%7C%7C%20Réponse%20A%7CRéponse%20B%7CRéponse%20C%20%7C%7C%201%7C3%0AQR%20%7C%7C%20Question%20%7C%7C%20Réponse%20A%7CRéponse%20B%7CRéponse%20C%20%7C%7C%202%0AQRC%20%7C%7C%20Question%20%7C%7C%20Réponse%20correcte%7CAutre%20réponse%20correcte%0ATrous%20%7C%7C%20Texte%20avec%20des%20%7BV:trous%7Ctrou%7D,%20pas%20de%20%7BV:Latex%7CLateq%7CLateqh%7D%20possible%20dans%20les%20réponses%0AFlashcard%20%7C%7C%20Recto%20%7C%7C%20Verso%0AGrille%20%7C%7C%20Catégorie%201%7CCatégorie%202%20%7C%7C%20%7BÉnoncé%201%20catégorie%201%7CÉnoncé%202%20catégorie%201%7D%7BÉnoncé%201%20catégorie%202%7CÉnoncé%202%20catégorie%202%7D%0AOrdre%20%7C%7C%20Énoncé%201%7CÉnoncé%202%7CÉnoncé%203%20%7C%7C%20Consigne%20(facultatif)<br>Par%20défaut%20:%20“Classez%20les%20éléments%20de%20cette%20liste%20dans%20le%20bon%20ordre%20:”%0AEtiquettes%20%7C%7C%20Catégorie%201%7CCatégorie%202%20%7C%7C%20%7BÉtiquette%201%20catégorie%201%7CÉtiquette%202%20catégorie%201%7D%7BÉtiquette%201%20catégorie%202%7CÉtiquette%202%20catégorie%201%7D%0AAssociation%20%7C%7C%20Item%201%7CItem%202%20%7C%7C%20Étiquette%20item%201%7CÉtiquette%20item%202%20%7C%7C%20Énoncé%20(facultatif)">Un exemple de quiz avec tous les types de questions</a></div>

		<article class="message is-info mt-6">
			<div class="message-body">
				<h4 class="is-4 has-text-left">Types de questions possibles</h4>
				<ol>
					<li>Vrai ou faux ?</li>
					<li>QCM</li>
					<li>Question / réponse</li>
					<li>Question à réponse courte</li>
					<li>Texte à trous</li>
					<li>Flashcard</li>
					<li>Grille</li>
					<li>Ordre</li>
					<li>Étiquettes</li>
					<li>Association</li>
				</ol>
			</div>
		</article>	
		
		<div class="is-size-5 mt-6">
			<h4 class="is-4 has-text-left">Usages plus avancés</h4>
			<h5 class="is-5 mt-5">Markdown</h5>
			<div>On peut utiliser la syntaxe Markdown dans les questions pour insérer du texte en gras (**gras**), en italiques (*italiques*), ou pour insérer une image : ![](URL de l'image).</div>
			<h5 class="is-5 mt-5">Latex</h5>
			<div>On peut aussi utiliser des formules mathématiques en Latex, avec la syntaxe suivante : $$formule Latex$$</div>
			<h5 class="is-5 mt-5">HTML</h5>
			<div>On peut également utiliser des balises HTML, notamment pour intégrer des vidéos ou mettre en page de manière plus précise sa question</div>
		</div>
	</div>
</div>