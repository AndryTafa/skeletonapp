<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<div class="flex main-content" in:fade>
	<h1 class="flex h1">Welcome to this app</h1>
	<br />
	<p class="flex h3">Click the button below to get started</p>
	<br />
	<a class="btn btn-sm variant-ghost-surface" href="/countries">Get started</a>
</div>

<style>
	.main-content {
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 25px;
	}
</style>
