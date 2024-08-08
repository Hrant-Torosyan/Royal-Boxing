export const customLoweCase = (word) => {
	word = word.replace("_", " ").toLowerCase();
	word = word.charAt(0).toUpperCase() + word.slice(1);
	return word;
};
