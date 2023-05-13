<script lang="ts">
	import type { CurrentWeather } from "$src/services/shutter-spotter-types";

	export let weather: CurrentWeather;
</script>

<div class="box">
	<div class="columns">
		<div class="column is-narrow">
			<h3 class="title is-5">Current Weather</h3>
			<p class="subtitle">
				{weather.current.weather[0].description}
			</p>
			<p>Temperature: {weather.current.temp} °C</p>
			<p>Wind Speed: {weather.current.wind_speed * 3.6} km/h</p>
			<p>Wind Direction: {weather.current.wind_deg}</p>
			<!-- TODO: Verify this works -->
			<p>Rain: {weather.current.rain ? weather.current.rain["1h"] : 0} mm/h</p>
			<p>Humidity: {weather.current.humidity} %</p>
			<p>Humidity: {weather.current.pressure} hPa</p>
			<p>Visibility: {weather.current.visibility / 1000} km</p>
			<p>Sunrise: {new Date(weather.current.sunrise * 1000).toLocaleTimeString()}</p>
			<p>Sunset: {new Date(weather.current.sunset * 1000).toLocaleTimeString()}</p>
		</div>
		<div class="column is-narrow">
			<img
				class="image"
				src="https://openweathermap.org/img/wn/{weather.current.weather[0].icon}@2x.png"
				alt={weather.current.weather[0].description}
			/>
		</div>
	</div>
</div>
