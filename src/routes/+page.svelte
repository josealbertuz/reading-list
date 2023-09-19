<script lang="ts">
	const DEFAULT_GENRE = 'All';

	export let data;
	let selectedGenre = DEFAULT_GENRE;

	const bookGenres = data.library.reduce<string[]>(
		(genres, book) => [...genres, ...(!genres.includes(book.genre) ? [book.genre] : [])],
		[]
	);

	$: filteredBooks =
		selectedGenre === DEFAULT_GENRE
			? data.library
			: data.library.filter((book) => book.genre === selectedGenre);
</script>

<select bind:value={selectedGenre}>
	{#each [DEFAULT_GENRE, ...bookGenres] as genre}
		<option>{genre}</option>
	{/each}
</select>
<ul class="book-list">
	{#each filteredBooks as book}
		<li class="book-list-item">
			<img src={book.cover} alt={`${book.title}-book-cover`} />
		</li>
	{/each}
</ul>

<style>
	.book-list {
		list-style: none;
		margin: 0px;
		padding: 0px;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(293px, 100%), 1fr));
		gap: 20px;
	}

	.book-list-item {
		height: 100%;
		width: 100%;
		cursor: pointer;
		transition: opacity 200ms ease-out;

		&:hover {
			opacity: 0.5;
		}
		& > img {
			height: 100%;
			width: 100%;
		}
	}
</style>
