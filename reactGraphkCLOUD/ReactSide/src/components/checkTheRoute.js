import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxDraw from "!@mapbox/mapbox-gl-draw"; // eslint-disable-line import/no-webpack-loader-syntax
import { useStyles } from '../styling.js';
import { useMapBoxStyles } from '../stylingMapBox.js';
import 'mapbox-gl/dist/mapbox-gl.css';
mapboxgl.accessToken = 'pk.eyJ1Ijoib2xsaWUwNDExMTQiLCJhIjoiY2t3OWdvNml1MzBwcjMwcm9tMDN6YmIxdCJ9.id2MXpw8OyHi7zhaSs1svw';
const setCoordinates = [
    [
        129.310127,
        35.556076
    ],
    [
        129.309539,
        35.556303
    ],
    [
        129.309706,
        35.556761
    ],
    [
        129.310471,
        35.557374
    ],
    [
        129.31914,
        35.561561
    ],
    [
        129.319429,
        35.561627
    ],
    [
        129.319413,
        35.561672
    ],
    [
        129.317744,
        35.565098
    ],
    [
        129.317037,
        35.566335
    ],
    [
        129.315287,
        35.568263
    ]
];
const ConstCoordinates = [
    [
        129.3544239789125,
        35.60258784769945
    ],
    [
        129.3576663726996,
        35.59311610806195
    ],
    [
        129.35862708197152,
        35.59018647710941
    ],
    [
        129.35874717063075,
        35.58784269515752
    ],
    [
        129.3577864613589,
        35.58237360378085
    ],
    [
        129.35634539745422,
        35.580517934338914
    ],
    [
        129.3468583934049,
        35.580517934338914
    ],
    [
        129.34644399038274,
        35.580612830490765
    ],
    [
        129.3464245594502,
        35.57879544954302
    ]
];

function CheckTheRoute(props) {
    const classes = useStyles();
    const classesMapBox = useMapBoxStyles();
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(129.3114);
    const [lat, setLat] = useState(35.5384);
    const [zoom, setZoom] = useState(9);
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
       
        updateRoute(ConstCoordinates, "realRoute");
        updateRoute(setCoordinates, "setRoute");
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
        //map.current.on('draw.update', updateRoute);
    });
    useEffect(() => {
        //map.current.on('draw.update', updateRoute);
    });
    // Use the coordinates you drew to make the Map Matching API request
    function updateRoute(params, id) {
        // Set the profile
        const profile = 'driving';
        // Get the coordinates that were drawn on the map
        console.log(draw);
        if (typeof draw !== undefined) {
            const coords = params;
            // Format the coordinates
            const newCoords = coords.join(';');
            // Set the radius for each coordinate pair to 25 meters
            const radius = coords.map(() => 25);
            getMatch(newCoords, radius, profile, id);
        }
    }

    // Make a Map Matching request
    // Make a Map Matching request
    async function getMatch(coordinates, radius, profile, id) {
        // Separate the radiuses with semicolons
        const radiuses = radius.join(';');
        // Create the query
        const query = await fetch(
            `https://api.mapbox.com/matching/v5/mapbox/${profile}/${coordinates}?geometries=geojson&radiuses=${radiuses}&steps=true&access_token=${mapboxgl.accessToken}`,
            { method: 'GET' }
        );
        const response = await query.json();
        // Handle errors
        if (response.code !== 'Ok') {
            alert(
                `${response.code} - ${response.message}.\n\nFor more information: https://docs.mapbox.com/api/navigation/map-matching/#map-matching-api-errors`
            );
            return;
        }
        // Get the coordinates from the response
        const coords = response.matchings[0].geometry;
        // Draw the route on the map
        addRoute(coords, id);
    }
    // Draw the Map Matching route as a new layer on the map
    function addRoute(coords, id) {
        var color;
        if (id=="setRoute"){
            color = "#1338BE";
        }else{
            color = '#03AA46';
        }
        map.current.addLayer({
            id: id,
            type: 'line',
            source: {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    properties: {},
                    geometry: coords
                }
            },
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': color,
                'line-width': 8,
                'line-opacity': 0.8
            }
        });
    }
    // If the user clicks the delete draw button, remove the layer if it exists
    function removeRoute() {
        if (!map.current.getSource('route')) return;
        map.current.removeLayer('route');
        map.current.removeSource('route');
    }
    const draw = new MapboxDraw({
        // Instead of showing all the draw tools, show only the line string and delete tools.
        displayControlsDefault: false,
        controls: {
            line_string: true,
            trash: true
        },
        // Set the draw mode to draw LineStrings by default.
        defaultMode: 'draw_line_string',
        styles: [
            // Style the line_tool
            {
                id: 'trash',
                backgroundImage: `url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiICAgd2lkdGg9IjIwIiAgIGhlaWdodD0iMjAiICAgaWQ9InN2ZzU3MzgiICAgdmVyc2lvbj0iMS4xIiAgIGlua3NjYXBlOnZlcnNpb249IjAuOTErZGV2ZWwrb3N4bWVudSByMTI5MTEiICAgc29kaXBvZGk6ZG9jbmFtZT0idHJhc2guc3ZnIiAgIHZpZXdCb3g9IjAgMCAyMCAyMCI+ICA8ZGVmcyAgICAgaWQ9ImRlZnM1NzQwIiAvPiAgPHNvZGlwb2RpOm5hbWVkdmlldyAgICAgaWQ9ImJhc2UiICAgICBwYWdlY29sb3I9IiNmZmZmZmYiICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIgICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIgICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIiAgICAgaW5rc2NhcGU6em9vbT0iMjIuNjI3NDE3IiAgICAgaW5rc2NhcGU6Y3g9IjEyLjEyODE4NCIgICAgIGlua3NjYXBlOmN5PSI4Ljg0NjEzMDciICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiICAgICBzaG93Z3JpZD0idHJ1ZSIgICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTAzMyIgICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijc1MSIgICAgIGlua3NjYXBlOndpbmRvdy14PSIyMCIgICAgIGlua3NjYXBlOndpbmRvdy15PSIyMyIgICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjAiICAgICBpbmtzY2FwZTpzbmFwLXNtb290aC1ub2Rlcz0idHJ1ZSIgICAgIGlua3NjYXBlOm9iamVjdC1ub2Rlcz0idHJ1ZSI+ICAgIDxpbmtzY2FwZTpncmlkICAgICAgIHR5cGU9Inh5Z3JpZCIgICAgICAgaWQ9ImdyaWQ1NzQ2IiAgICAgICBlbXBzcGFjaW5nPSI1IiAgICAgICB2aXNpYmxlPSJ0cnVlIiAgICAgICBlbmFibGVkPSJ0cnVlIiAgICAgICBzbmFwdmlzaWJsZWdyaWRsaW5lc29ubHk9InRydWUiIC8+ICA8L3NvZGlwb2RpOm5hbWVkdmlldz4gIDxtZXRhZGF0YSAgICAgaWQ9Im1ldGFkYXRhNTc0MyI+ICAgIDxyZGY6UkRGPiAgICAgIDxjYzpXb3JrICAgICAgICAgcmRmOmFib3V0PSIiPiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+ICAgICAgICA8ZGM6dHlwZSAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4gICAgICAgIDxkYzp0aXRsZSAvPiAgICAgIDwvY2M6V29yaz4gICAgPC9yZGY6UkRGPiAgPC9tZXRhZGF0YT4gIDxnICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIgICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiICAgICBpZD0ibGF5ZXIxIiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtMTAzMi4zNjIyKSI+ICAgIDxwYXRoICAgICAgIHN0eWxlPSJjb2xvcjojMDAwMDAwO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7dmlzaWJpbGl0eTp2aXNpYmxlO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MC45OTk5OTk4MjttYXJrZXI6bm9uZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIiAgICAgICBkPSJtIDEwLDEwMzUuNzc0MyBjIC0wLjc4NDkyNTMsOGUtNCAtMS40OTY4Mzc2LDAuNDYwNiAtMS44MjAzMTI1LDEuMTc1OCBsIC0zLjE3OTY4NzUsMCAtMSwxIDAsMSAxMiwwIDAsLTEgLTEsLTEgLTMuMTc5Njg4LDAgYyAtMC4zMjM0NzUsLTAuNzE1MiAtMS4wMzUzODcsLTEuMTc1IC0xLjgyMDMxMiwtMS4xNzU4IHogbSAtNSw0LjU4NzkgMCw3IGMgMCwxIDEsMiAyLDIgbCA2LDAgYyAxLDAgMiwtMSAyLC0yIGwgMCwtNyAtMiwwIDAsNS41IC0xLjUsMCAwLC01LjUgLTMsMCAwLDUuNSAtMS41LDAgMCwtNS41IHoiICAgICAgIGlkPSJyZWN0MjQzOS03IiAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2MiIC8+ICA8L2c+PC9zdmc+)`,
            },
            // Set the line style for the user-input coordinates.
            {
                id: 'gl-draw-line',
                type: 'line',
                filter: ['all', ['==', '$type', 'LineString'], ['!=', 'mode', 'static']],
                layout: {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                paint: {
                    'line-color': '#438EE4',
                    'line-dasharray': [0.2, 2],
                    'line-width': 4,
                    'line-opacity': 0.7
                }
            },
            // Style the vertex point halos.
            {
                id: 'gl-draw-polygon-and-line-vertex-halo-active',
                type: 'circle',
                filter: [
                    'all',
                    ['==', 'meta', 'vertex'],
                    ['==', '$type', 'Point'],
                    ['!=', 'mode', 'static']
                ],
                paint: {
                    'circle-radius': 12,
                    'circle-color': '#FFF'
                }
            },
            // Style the vertex points.
            {
                id: 'gl-draw-polygon-and-line-vertex-active',
                type: 'circle',
                filter: [
                    'all',
                    ['==', 'meta', 'vertex'],
                    ['==', '$type', 'Point'],
                    ['!=', 'mode', 'static']
                ],
                paint: {
                    'circle-radius': 8,
                    'circle-color': '#438EE4'
                }
            }
        ]
    });

    // Add the draw tool to the map.
    return (
        <div>
            <div>
                <div className={classes.MapBoxSidebar}>
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div>
                <div ref={mapContainer} className={classes.MapBoxMapContainer} />
            </div>
        </div>
    );
}

export default CheckTheRoute;