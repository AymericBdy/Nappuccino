import { Map as MapboxMap, Popup, NavigationControl } from 'mapbox-gl';

import accessToken from './mapbox-access-token';
import { addIndoorTo, IndoorControl, IndoorMap, MapboxMapWithIndoor } from '../src/index';

import 'mapbox-gl/dist/mapbox-gl.css';
import './style.css';

import MapboxGeocoder, { Result } from '@mapbox/mapbox-gl-geocoder';
import centroid from '@turf/centroid';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

const app = document.querySelector<HTMLDivElement>('#app')!

const map = new MapboxMap({
    container: app,
    zoom: 18,
    center: [-1.5491565, 47.2488069],
    // style: 'mapbox://styles/mapbox/streets-v10',
    style: 'mapbox://styles/mickael-fontes/cl0bcxzc8000215me61bis66g',
    accessToken,
    hash: true
}) as MapboxMapWithIndoor;

/**
 * Indoor specific
 */

addIndoorTo(map);

// Retrieve the geojson from the path and add the map
const geojson = await (await fetch('maps/bat_d.geojson')).json();
map.indoor.addMap(IndoorMap.fromGeojson(geojson));

const geojson2 = await (await fetch('maps/bat_e.geojson')).json();
map.indoor.addMap(IndoorMap.fromGeojson(geojson2));


// Add the specific control
map.addControl(new IndoorControl());

const all_geojson: any[] = [geojson, geojson2]

// map.on('styledata', function () {
//     map.setLayoutProperty('poi-indoor-entrance', 'icon-allow-overlap', true);
// });

map.on('dblclick', function () {
    console.log('Liste des images');
    console.log(map.listImages());
    console.log('Layer poi-label');
    console.log(map.getLayer('poi-label'));
    console.log('Tous les layers');
    console.log(map.getStyle().layers)
})


// Add search controls to the map.
const customGeocoder = new MapboxGeocoder({
    localGeocoderOnly: true,
    localGeocoder: (query: string): Result[] => {
        const matchingFeatures = [];
        for (var geo of all_geojson) {
            for (let i = 0; i < geo.features.length; i++) {
                const feature = geo.features[i];
                if (feature.properties.name
                    && feature.properties.name
                        .toLowerCase()
                        .search(query.toLowerCase()) !== -1
                ) {
                    feature['place_name'] = feature.properties.name;
                    feature['place_name'] = feature['place_name'] + ' batiment ' + String(i);
                    feature['center'] = centroid(feature).geometry.coordinates;
                    feature['place_type'] = ['park'];
                    console.log(feature);
                    matchingFeatures.push(feature);
                }
            }
        }
        return matchingFeatures;
    },
    accessToken,
    zoom: 20,
    placeholder: 'Enter search e.g. Room',
    marker: false
});
customGeocoder.on('result', (geocoder: any) => {
    if (geocoder.result.properties && geocoder.result.properties.level) {
        map.indoor.setLevel(parseInt(geocoder.result.properties.level));
    }
});



map.on('click', 'poi-indoor-entrance', (e: any) => {
    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.description;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
});

// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'poi-indoor-entrance', () => {
    map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'poi-indoor-entrance', () => {
    map.getCanvas().style.cursor = '';
});

// Add zoom and rotation controls to the map.
map.addControl(new NavigationControl(), 'bottom-right');

map.addControl(customGeocoder, 'top-left');