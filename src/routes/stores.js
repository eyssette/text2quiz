import {
	writable
} from 'svelte/store';
export const countExpectedAnswers = writable(0);
export const countCorrectAnswers = writable(0);
export const validation = writable(false);
export const questionsCode = writable('');
export const previousQuestionsCode = writable('');
export const changeQuestions = writable(false);
export const language = writable('FR');
export const home = writable(true);
export const modal = writable(false);
export const baseURL = writable('');
export const keyEvaluation = writable('');
export const generateCodeResults = writable(false);
export const countPointsMax = writable(0);
export const countPoints = writable(0);
export const darkmode = writable(false);
export const ip = writable('');
export const userAgent = writable('');