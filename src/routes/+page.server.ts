import { library } from '$lib/server/books.json';

export const load = () => {
	return {
		library: library.map((book) => book.book)
	};
};
