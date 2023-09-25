<script lang="ts">
	const DEFAULT_GENRE = 'Todos';
	const GENRE_FILTER_ID = 'genre-filter';
	const PAGES_FILTER_ID = 'pages-filter';
	export let selectedGenre: string;
	export let pageRange: number
	export let bookPagesRange: {min: number, max: number};
	export let bookGenres: string[]

</script>

<div class="filters">
	<div class="filter-wrapper">
		<label for={GENRE_FILTER_ID}> Filtrar por género </label>
		<select id={GENRE_FILTER_ID} bind:value={selectedGenre}>
			{#each [DEFAULT_GENRE, ...bookGenres] as genre}
				<option>{genre}</option>
			{/each}
		</select>
	</div>
	<div class="filter-wrapper">
		<label for={PAGES_FILTER_ID}> Filtrar por páginas </label>
		<input type="range" bind:value={pageRange} min={bookPagesRange.min} max={bookPagesRange.max} />
	</div>
</div>

<style>
	.filters {
		display: flex;
		gap: 20px;
	}

	.filter-wrapper {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
</style>
