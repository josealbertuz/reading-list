import { library } from '$lib/server/books.json';

export const load = () => {
	const bookPages = library.map(({ book }) => book.pages);

	return {
		library: library.map((book) => book.book),
		genres: [...new Set(library.map(({ book }) => book.genre))],
		bookPagesRange: {
			min: Math.min(...bookPages),
			max: Math.max(...bookPages)
		}
	};
};
