<script>
	import { baseURL
	} from "./stores.js";
	import url from "./url.js";

	function gotoURL(urlString){
		window.location.assign(urlString);
		window.scrollTo(0, 0);
	}

</script>

<h1 class="title has-text-centered is-1">Text2quiz</h1>

<div class="box block px-6 py-5 mt-6">
	<div class="content has-text-justified">
		<div>
			Text2quiz est un outil en ligne, libre et gratuit, qui permet de créer automatiquement un quiz à partir d'un simple fichier texte. Le principe est simple :
		</div>
		<ol>
			<li>
				On clique sur l'icône <span class="material-icons"> edit </span>
				pour éditer son quiz.
			</li>
			<li>
				On clique sur l'icône <span class="material-icons">share</span> pour
				créer un lien vers le quiz afin de le partager.
			</li>
		</ol>

		<article class="message is-dark">
			<div class="message-body">
				<h4>Avantages :</h4>
				<ul>
					<li>Pas de compte à créer</li>
					<li>
						Pas de cookies, pas de données enregistrées
						: totalement compatible avec le RGPD
					</li>
					<li>
						Interface simple pour pouvoir créer rapidement un quiz
					</li>
				</ul>
			</div>
		</article>

		<h4 class="is-4 has-text-left mt-6 mb-5">Comment ça marche ?</h4>
		<ul>
			<li>Pour écrire son quiz, on doit coder chaque question en respectant une syntaxe simple</li>
			<li>
				On peut afficher l'aide dans la fenêtre d'édition du quiz, et
				commencer d'abord par les types de question les plus simples
			</li>
		</ul>

		<article class="message is-info mt-6">
			<div class="message-body">
				<h4 class="is-4 has-text-left">Types de questions possibles</h4>
				<ol>
					<li>Vrai ou faux ?</li>
					<li>QCM</li>
					<li>Question / réponse</li>
					<li>Question à réponse courte</li>
					<li>Texte à trous</li>
					<li>Texte à trous avec réponses courtes</li>
					<li>Flashcard</li>
					<li>Grille</li>
					<li>Ordre</li>
					<li>Étiquettes</li>
					<li>Association</li>
					<li>Correspondance</li>
					<li>Correspondance stricte</li>
				</ol>
			</div>
		</article>

		<h4 class="is-4 has-text-left mt-6 mb-5">Exemples de quiz</h4>
		<ul class="mt-5 mb-6">
			<li><a
				href="#example" on:click|preventDefault={gotoURL($baseURL+"?v=1.0#VF%20%7C%7C%20Énoncé%20%7C%7C%20V%0AQCM%20%7C%7C%20Question%20%7C%7C%20V:Réponse%20A%7CRéponse%20B%7CV:Réponse%20C%7CRéponse%20D%0AQR%20%7C%7C%20Question%20%7C%7C%20V:Réponse%20A%7CRéponse%20B%7CRéponse%20C%0AQRC%20%7C%7C%20Question%20%7C%7C%20Réponse%20correcte%7CAutre%20réponse%20correcte%0ATrous%20%7C%7C%20Texte%20avec%20des%20%7B%7BV:trous%7Ctrou%7D%7D,%20pas%20de%20%7B%7BV:Latex%7CLateq%7CLateqh%7D%7D%20possible%20dans%20les%20réponses%0ATrousRC%20%7C%7C%20Texte%20avec%20des%20%7B%7Btrous%7Cvides%7D%7D.%20La%20taille%20du%20trou%20est%20proportionnelle%20à%20la%20%7B%7Btaille%7D%7D%20de%20la%20réponse.%0AFlashcard%20%7C%7C%20Recto%20%7C%7C%20Verso%0AGrille%20%7C%7C%20Catégorie%201%7CCatégorie%202%20%7C%7C%20%7B%7BÉnoncé%201%20catégorie%201%7CÉnoncé%202%20catégorie%201%7D%7D%7B%7BÉnoncé%201%20catégorie%202%7CÉnoncé%202%20catégorie%202%7D%7D%20%7C%7C%20Consigne%20plus%20précise%20(facultatif)%0AOrdre%20%7C%7C%20Énoncé%201%7CÉnoncé%202%7CÉnoncé%203%20%7C%7C%20Consigne%20plus%20précise%20(facultatif)%0AEtiquettes%20%7C%7C%20Catégorie%201%7CCatégorie%202%20%7C%7C%20%7B%7BÉtiquette%201%20catégorie%201%7CÉtiquette%202%20catégorie%201%7D%7D%7B%7BÉtiquette%201%20catégorie%202%7CÉtiquette%202%20catégorie%202%7D%7D%20%7C%7C%20Consigne%20plus%20précise%20(facultatif)%0AAssociation%20%7C%7C%20%7B%7BItem%201%7CÉtiquette%201%7D%7D%7B%7BItem%202%7CÉtiquette%202%7D%7D%20%7C%7C%20Consigne%20plus%20précise%20(facultatif)%0ACorrespondance%20%7C%7C%20Catégorie%20%7C%7C%20%7B%7BÉtiquette%20correspondante%201%7CÉtiquette%20correspondante%202%7D%7D%7B%7BÉtiquette%20hors%20catégorie%201%7CÉtiquette%20hors%20catégorie%202%7D%7D%20%7C%7C%20Consigne%20plus%20précise%20(facultatif)%0ACorrespondance%20%7C%7C%20Catégorie%20%7C%7C%20%7B%7BORDRE%7CÉtiquette%20correspondante%20place%201%7CÉtiquette%20correspondante%20place%202%7D%7D%7B%7BÉtiquette%20hors%20catégorie%201%7CÉtiquette%20hors%20catégorie%202%7D%7D%20%7C%7C%20Consigne%20plus%20précise%20(facultatif)")}
				>Un quiz avec tous les types de questions</a
			></li>
			<li><a href="https://eyssette.github.io/quiz/">Répertoire de quiz créés avec Text2quiz</a></li>
		</ul>

		<h4 class="is-4 has-text-left mt-6 mb-5">Partager son quiz</h4>
		<ul>
			<li>
				<i>Mode ordinaire</i> : plutôt destiné au partage avec ses collègues. Le lien permet l'édition du quiz.
			</li>
			<li>
				<i>Mode crypté</i> : plutôt pour les élèves, pour de l'autoévaluation. Les réponses ne s'affichent pas dans le lien du quiz, le quiz n'est pas éditable et l'ordre des exercices est aléatoire.
			</li>
			<li>
				<i>Mode évaluation</i> : pour pouvoir noter les élèves. Même principe que pour le mode crypté, mais le résultat du quiz ne s'affiche pas. À la place, un code est généré que l'élève
				doit transmettre à l'enseignant·e.
			</li>
		</ul>

		<h4 class="is-4 has-text-left mt-6 mb-5">Mode évaluation : récupérer les résultats des élèves</h4>
		<ul>
			<li>On copie la liste des codes transmis par les élèves, par exemple à l'aide d'un formulaire via l'ENT.</li>
			<li>On clique sur l'icône <span class="material-icons">no_encryption</span> pour coller cette liste et décrypter les résultats.</li>
		</ul>

		<h4 class="is-4 has-text-left mt-6">Usages plus avancés</h4>
		<div class="is-size-5 is-size-6-mobile">
			<h5 class="is-5 mt-5">Markdown</h5>
			<div>
				On peut utiliser la syntaxe Markdown dans les questions, par
				exemple pour insérer du texte en gras (**gras**), en italiques
				(*italiques*), ou pour insérer une image : ![](URL_Image). On peut contrôler la hauteur de l'image (h-100 à h-500) et le placement (center) ainsi : ![h-500 center](URL_Image)
			</div>
			<h5 class="is-5 mt-5">Latex</h5>
			<div>
				On peut aussi utiliser des formules mathématiques en Latex, avec
				la syntaxe suivante : $$formule Latex$$
			</div>
			<h5 class="is-5 mt-5">HTML</h5>
			<div>
				On peut également utiliser des balises HTML, notamment pour
				intégrer des vidéos ou mettre en page de manière plus précise sa
				question
			</div>
			<h5 class="is-5 mt-5">Fichiers externes</h5>
			<div>
				On peut écrire son quiz dans un fichier texte qu'on héberge sur
				internet. Text2quiz peut lire ce fichier si on met l'URL dans le
				lien ainsi : https://text2quiz.vercel.app/#URL
			</div>
		</div>
	</div>
</div>
