<script>
	import Header from '$lib/Header.svelte';
	import SignupForm from '$lib/SignupForm.svelte';
	import WelcomeNavigator from '$lib/WelcomeNavigator.svelte';
</script>

<Header>
  <WelcomeNavigator />
</Header>

<div class="section">
	<div class="box">
		<h1 class="title">Signup</h1>
		<SignupForm />
	</div>
</div>
