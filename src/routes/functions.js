export function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


const regexSpaceBefore = /^\s+/g;
const regexSpaceAfter = /\s+$/g;

export function removeSpacesBeforeAndAfter(string) {
    return string.replace(regexSpaceBefore,'').replace(regexSpaceAfter,'');
}