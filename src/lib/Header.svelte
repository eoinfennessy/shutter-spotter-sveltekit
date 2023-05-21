<nav class="navbar is-light is-spaced" aria-label="main navigation" style="z-index: 5000;">
	<div class="container">
		<div class="navbar-brand">
			<a class="navbar-item" href="/">
				<i
					style="font-size: 48px; color: hsl(171, 100%, 41%); margin-right: 5px"
					class="fas fa-camera-retro fa-3x"
				/>
				<h1 class="title" style="font-family: courier, sans-serif;">ShutterSpotter</h1>
			</a>

			<a
				role="button"
				class="navbar-burger"
				aria-label="menu"
				aria-expanded="false"
				data-target="navbarBasicExample"
			>
				<span aria-hidden="true" />
				<span aria-hidden="true" />
				<span aria-hidden="true" />
			</a>
		</div>

		<div id="navbarBasicExample" class="navbar-menu">
			<div class="navbar-start">
				<a href="/" class="navbar-item"> Home </a>

				<a href="/about" class="navbar-item"> About </a>

				<div class="navbar-item has-dropdown is-hoverable">
					<p class="navbar-link">More</p>

					<div class="navbar-dropdown">
						<a href="/about" class="navbar-item"> About </a>
						<a href="https://www.linkedin.com/in/eoin-f/" class="navbar-item"> Contact </a>
						<hr class="navbar-divider" />
						<a
							href="https://github.com/eoinfennessy/shutter-spotter-sveltekit/issues"
							class="navbar-item"
						>
							Report an issue
						</a>
					</div>
				</div>
			</div>

			<slot />
      
		</div>
	</div>
</nav>
