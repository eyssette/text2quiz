const types = [];
const numberItems = [];
types[0] = /^VF\s\|\|\s.+\s\|\|\s(V|F)$/; // VF
numberItems[0] = [3];
types[1] = /^QCM\s\|\|\s.+\s\|\|\s.+/; // QCM
numberItems[1] = [3];
types[2] = /^QR\s\|\|\s.+\s\|\|\s.+/; // QR
numberItems[2] = [3];
types[3] = /^Flashcard\s\|\|\s.+\s\|\|\s.+/; // Flashcard
numberItems[3] = [3];
types[4] = /^QRC\s\|\|\s.+\s\|\|\s.+$/; // QRC
numberItems[4] = [3];
types[5] = /^Trous\s\|\|\s.*\{\{.+\}\}.*/; // Trous
numberItems[5] = [2];
types[6] = /^Grille\s\|\|\s.+\s\|\|\s\{\{.+\}\}.*/; // Grille
numberItems[6] = [3,4];
types[7] = /^Ordre\s\|\|\s.+\|.+/; // Ordre
numberItems[7] = [2, 3];
types[8] = /^Etiquettes\s\|\|\s.+\s\|\|\s\{\{.+\}\}.*/; // Etiquettes
numberItems[8] = [3,4];
types[9] = /^Association\s\|\|\s\{\{.+\}\}.*/; // Association
numberItems[9] = [2, 3];
types[10] = /^$/; // Lignes vides
numberItems[10] = [1];
types[11] = /^Correspondance\s\|\|\s.+\s\|\|\s\{\{.+\}\}.*/; // Correspondance (stricte ou non)
numberItems[11] = [3,4];
types[12] = /^TrousRC\s\|\|\s.*\{\{.+\}\}.*/; // TrousRC
numberItems[12] = [2];

export function regexValid(questionCode) {
	let i = 0;
	let valid=[];
	types.forEach(type => {
		let regex = new RegExp(type);
		let checkType = regex.test(questionCode);
		if (checkType) {
			let separators = questionCode.match(/\s\|\|\s/g);
			let checkNumberItems;
			if (Array.isArray(separators)) {
				checkNumberItems = (separators.length) + 1;
			} else {
				checkNumberItems = 1;
			}
			if (!numberItems[i].includes(checkNumberItems)) {
				checkType = false;
			}
		}
		valid.push(checkType);
		i++;
	});
	if (valid.includes(true)) {
		return true;
	} else {
		return false;
	}
}

export function checkQuestions(toCheck) {
	let chekQuestionsArray = [];
	if (toCheck) {
		let questionsCodeArray = toCheck.split(/\r?\n/);
		if (Array.isArray(questionsCodeArray)) {
			for (let i=0;i<questionsCodeArray.length;i++) {
        		if (regexValid(questionsCodeArray[i])===false) { return false;}
      		}
      return true;
		}
	}
}