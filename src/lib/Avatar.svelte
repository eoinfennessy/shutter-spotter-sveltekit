<script lang="ts">
	export let src: string;
  export let size = "is-96x96";
</script>

<div class="block">
	<figure class="image {size}">
		<img class="is-rounded has-background-light" {src} alt="Avatar" />
	</figure>
</div>
