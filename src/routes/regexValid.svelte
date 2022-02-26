<script context='module'>
	export function regexValid(questionCode) {
		let types = [];
		let valid = [];
		let numberItems = [];
		types[0] = /^VF\s\|\|\s.+\s\|\|\s(V|F)$/; // VF
		numberItems[0] = [3];
		types[1] = /^QCM\s\|\|\s.+\s\|\|\s.+\s\|\|\s.*\d$/; // QCM
		numberItems[1] = [4];
		types[2] = /^QR\s\|\|\s.+\s\|\|\s.+\s\|\|\s\d+$/; // QR
		numberItems[2] = [4];
		types[3] = /^Flashcard\s\|\|\s.+\s\|\|\s.+/; // Flashcard
		numberItems[3] = [3];
		types[4] = /^QRC\s\|\|\s.+\s\|\|\s.+$/; // QRC
		numberItems[4] = [3];
		types[5] = /^Trous\s\|\|\s.*(({V:.+})|({F:.+})).*/; // Trous
		numberItems[5] = [2];
		types[6] = /^Grille\s\|\|\s.+\s\|\|\s{.+}$/; // Grille
		numberItems[6] = [3];
		types[7] = /^Ordre\s\|\|\s.+\|.+/; // Ordre
		numberItems[7] = [2];
		types[8] = /^Etiquettes\s\|\|\s.+\s\|\|\s{.+}$/; // Etiquettes
		numberItems[8] = [3];
		types[9] = /^Association\s\|\|\s.+\|.+\s\|\|\s.+\|.+/; // Association
		numberItems[9] = [3, 4];
		types[10] = /^Texte\s\|\|\s.*\|\|\s/; // Texte
		numberItems[10]= [3];
		let i = 0;
		types.forEach(type => {
			const regex = new RegExp(type);
			let checkType = regex.test(questionCode);
			//console.log('checkType : '+checkType);
			if (checkType) {
				let separators = questionCode.match(/\s\|\|\s/g);
				let checkNumberItems;
				if (Array.isArray(separators)) {
					checkNumberItems = (separators.length) + 1;
				} else {
					checkNumberItems = 1;
				}
				//console.log('checkNumberItems : '+checkNumberItems+'  numberItems['+i+'] : '+numberItems[i]);
				if (!numberItems[i].includes(checkNumberItems)) {
					checkType = false
				}
			}
			valid.push(checkType);
			i++;
		})
		if (valid.includes(true)) {
			return true
		} else {
			return false
		}
	}
</script>