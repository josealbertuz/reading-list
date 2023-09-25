<script lang="ts">
	import type { Book } from '$lib/models/book';

	export let books: Book[];
	export let onRemoveClick: (ISBN: string) => void
</script>

<div class="tbr-container">
	<h1>Lista de lectura</h1>
	<ul>
		{#each books as book}
			<li>
				<button on:click={() => onRemoveClick(book.ISBN)}>x</button>
				<img src={book.cover} alt={`${book.title}-book-cover`} />
			</li>
		{/each}
	</ul>
</div>

<style>
	.tbr-container {
		border: 1px solid black;
		border-radius: 5px;
		padding: 10px;
		height: fit-content;
		flex: 1;
	}

	ul {
		list-style: none;
		margin: 0px;
		padding: 0px;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(150px, 100%), 1fr));
		gap: 20px;
	}

	li {
		position: relative;
		height: 100%;
		width: 100%;
	}

	button {
		position: absolute;
		top: -5px;
		right: -5px;
	}

	img {
		height: 100%;
		width: 100%;
	}
</style>
