<script>
	import { goto } from "$app/navigation";
	import { shutterSpotterService } from "../services/shutter-spotter-service";

	let firstName = "";
	let lastName = "";
	let email = "";
	let password = "";
	let errorMessage = "";

	async function signup() {
		let success = await shutterSpotterService.signup(firstName, lastName, email, password);
		if (success) {
			goto("/");
		} else {
			errorMessage = "Error Trying to sign up";
		}
	}

	async function signupWithGithub() {
		await shutterSpotterService.signupWithGithub();
	}
</script>

<form on:submit|preventDefault={signup}>
	<div class="field is-horizontal">
		<div class="field-body">
			<div class="field">
				<label for="firstname" class="label">First Name</label>
				<input
					bind:value={firstName}
					class="input"
					id="firstname"
					type="text"
					placeholder="Enter first name"
					name="firstName"
				/>
			</div>
			<div class="field">
				<label for="lastname" class="label">Last Name</label>
				<input
					bind:value={lastName}
					class="input"
					id="lastname"
					type="text"
					placeholder="Enter last name"
					name="lastName"
				/>
			</div>
		</div>
	</div>
	<div class="field">
		<label for="email" class="label">Email</label>
		<input
			bind:value={email}
			class="input"
			id="email"
			type="text"
			placeholder="Enter email"
			name="email"
		/>
	</div>
	<div class="field">
		<label for="password" class="label">Password</label>
		<input
			bind:value={password}
			class="input"
			id="password"
			type="password"
			placeholder="Enter Password"
			name="password"
		/>
	</div>
	<div class="field is-grouped">
		<button class="button is-link">Sign Up</button>
	</div>
</form>

<hr>
<div class="block">
	<button on:click={signupWithGithub} class="button is-black">
		<span class="icon">
			<i class="fab fa-github"></i>
		</span>
		<span>Or Continue with GitHub</span>
	</button>
</div>
