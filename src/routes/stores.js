import {
	writable
} from 'svelte/store';
export const countExpectedAnswers = writable(0);
export const countCorrectAnswers = writable(0);
export const validation = writable(false);
export const questionsCode = writable('');
export const changeQuestions = writable(false);
export const language = writable('FR');
// export const latex = writable(true);