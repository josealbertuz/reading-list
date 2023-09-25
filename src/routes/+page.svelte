<script lang="ts">
	import BookFilters from '$lib/components/BookFilters.svelte';
	import TBRBooks from '$lib/components/TBRBooks.svelte';
	import type { Book } from '$lib/models/book.js';

	const DEFAULT_GENRE = 'Todos';
	export let data;

	let selectedGenre = DEFAULT_GENRE;
	let pageRange = data.bookPagesRange.max;
	let tbrBooks: Book[] = [];

	$: filteredBooks = data.library.filter((book) => {
		if (selectedGenre === DEFAULT_GENRE) return book.pages <= pageRange;

		return book.genre === selectedGenre && book.pages <= pageRange;
	});

	$: bookIsInTbr = (bookToFind: Book) =>
		Boolean(tbrBooks.find((book) => book.ISBN === bookToFind.ISBN));


	const addToTBR = (newBook: Book) => {
		if (bookIsInTbr(newBook)) return;
		tbrBooks = [...tbrBooks, newBook];
	};

	const removeFromTBR = (ISBN: string) => {
		tbrBooks = tbrBooks.filter((book) => book.ISBN !== ISBN);
	};

</script>

<div class="lists-container">
	<div class={tbrBooks.length ? 'book-list-container' : undefined}>
		<h1>{filteredBooks.length} libros disponibles</h1>
		<h2>{tbrBooks.length} libros en la lista de lectura</h2>
		<BookFilters
			bind:selectedGenre
			bind:pageRange
			bookGenres={data.genres}
			bookPagesRange={data.bookPagesRange}
		/>
		<ul class="book-list">
			{#each filteredBooks as book}
				<li class="book-list-item">
					<button on:click={() => addToTBR(book)} disabled={bookIsInTbr(book)}>
						<img src={book.cover} alt={`${book.title}-book-cover`} />
					</button>
				</li>
			{/each}
		</ul>
	</div>
	{#if tbrBooks.length}
		<TBRBooks books={tbrBooks} onRemoveClick={removeFromTBR} />
	{/if}
</div>

<style>
	.lists-container {
		display: flex;
		width: 100%;
		gap: 20px;

		@media(max-width: 1000px) {
			flex-direction: column;
		}
	}

	.book-list-container {
		width: 80%;

		@media(max-width: 1000px) {
			width: 100%;
		}
	}

	.book-list {
		list-style: none;
		margin: 0px;
		padding: 0px;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
		gap: 20px;
	}

	.book-list-item {
		& > button {
			cursor: pointer;
			height: 100%;
			width: 100%;
			border: none;
			background-color: transparent;
			padding: 0px;
			aspect-ratio: 6 / 9;
			transition: opacity 200ms ease-out;
			&:not(:disabled):hover {
				opacity: 0.5;
			}

			&:disabled {
				filter: grayscale(100%);
				opacity: 0.5;
				cursor: not-allowed;
			}
		}
	}
	img {
		height: 100%;
		width: 100%;
	}
</style>
