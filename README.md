# ShutterSpotter - SvelteKit Frontend

A SvelteKit frontend app for ShutterSpotter, a location-based social app for photographers. The app has been [deployed here](https://shutter-spotter.netlify.app/) (Netlify).

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
