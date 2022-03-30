export let cryptedModeKey = ''
if (process.env.NODE_ENV == 'development') {
	cryptedModeKey = import.meta.env.VITE_CRYPTED_MODE_KEY;
} else {
	cryptedModeKey = process.env.VITE_CRYPTED_MODE_KEY;
}