# Indoor map of Nappuccino

The indoor map uses [Mapbox](https://github.com/mapbox/mapbox-gl-js) with the indoor plugin [MapGL Indoor Plugin](https://github.com/map-gl-indoor/map-gl-indoor).

To test the map in dev mod, run the following commands:

```cmd
npm install
npx vite
```

To a servable form of the map (html, js) that can be used on a web server, run:

```cmd
npm install
npx vite build
```

Be careful: The current build settings has the following setting `target: 'esnext'` which makes it incompatible with old browsers.
