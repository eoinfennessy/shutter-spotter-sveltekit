<script lang="ts">
  import Header from "$lib/Header.svelte";
	import WelcomeNavigator from "$lib/WelcomeNavigator.svelte";
</script>

<Header>
  <WelcomeNavigator />
</Header>

<div class="columns is-vcentered content">
  <div class="column has-text-centered">
    <img width="300" src="/camera.jpeg" alt="homer" />
  </div>
  <div class="column">
    <h1 class="title">Welcome to ShutterSpotter</h1>
    <p>A location-based social site for photographers</p>
  </div>
</div>
