<script>
	import { user } from "../stores";
</script>

<div class="navbar-end">
	<div class="navbar-item">
		<div class="buttons">
			<a href="/user/{$user._id}/dashboard" class="button is-primary">
				<span class="icon">
					<i class="fas fa-camera" />
				</span>
				<strong>Dashboard</strong>
			</a>
			<a href="/user/{$user._id}/photos" class="button is-link">
				<span class="icon">
					<i class="fas fa-images" />
				</span>
				<span>My Photos</span>
			</a>
			<a href="/logout" class="button is-light">
				<span class="icon">
					<i class="fas fa-sign-out-alt" />
				</span>
				<span>Log out</span>
			</a>
		</div>
	</div>
</div>
