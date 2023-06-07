# ShutterSpotter - SvelteKit Frontend

![ShutterSpotter Frontend](https://github.com/eoinfennessy/shutter-spotter-sveltekit/assets/85010533/e884064c-bae7-42cb-8119-10230dc55474)

A SvelteKit frontend app for ShutterSpotter, a location-based social app for photographers. See [a video demonstration of the app here](https://youtu.be/pJwE0ppTp6k). This app has been [deployed on Netlify here](https://shutter-spotter.netlify.app/).

This app uses APIs from the ShutterSpotter backend ([Github Repo](https://github.com/eoinfennessy/shutter-spotter) | [Deployment on Render](https://shutter-spotter-2.onrender.com/)).

## Developing

Once you've cloned the project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of the app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy the app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
