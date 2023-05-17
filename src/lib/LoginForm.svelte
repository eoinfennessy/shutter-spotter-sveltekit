<script>
	import { goto } from '$app/navigation';
	import { shutterSpotterService } from '../services/shutter-spotter-service';
	import { user } from '../stores';
	import { page } from '$app/stores';

	let email = "";
	let password = "";
  let errorMessage = ""

  async function login() {
		const success = await shutterSpotterService.login(email, password);
		if (success) {
			goto(`/user/${$user._id}/dashboard`);
		} else {
			email = "";
			password = "";
			errorMessage = "Invalid Credentials";
		}
	}

	async function loginWithGithub() {
		goto(`https://github.com/login/oauth/authorize?client_id=c5fd3ee59927414f8114&redirect_uri=${$page.url.origin}/login/github`)
	}
</script>

<form class="block" on:submit|preventDefault={login}>
	<div class="field">
		<label class="label" for="email">Email</label>
		<input
			bind:value={email}
			class="input"
			id="email"
			name="email"
			placeholder="Enter email"
			type="text"
		/>
	</div>
	<div class="field">
		<label class="label" for="password">Password</label>
		<input
			bind:value={password}
			class="input"
			id="password"
			name="password"
			placeholder="Enter Password"
			type="password"
		/>
	</div>
	<div class="field is-grouped">
		<button class="button is-link">Log In</button>
	</div>
</form>

<hr>
<div class="block">
	<button on:click={loginWithGithub} class="button is-black">
		<span class="icon">
			<i class="fab fa-github"></i>
		</span>
		<span>Or Login with GitHub</span>
	</button>
</div>

{#if errorMessage}
  <div class="message is-danger">
    <div class="message-body">
      <strong>Error:</strong> {errorMessage}
    </div>
  </div>
{/if}