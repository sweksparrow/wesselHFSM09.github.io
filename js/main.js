

//Maps
    //Leaflet

        const RDnew = new L.Proj.CRS('EPSG:28992', '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs',
        {     transformation: L.Transformation(-1, -1, 0, 0),
            resolutions: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420],
            origin: [-285401.920, 903401.920],
            bounds: L.bounds([-285401.920, 903401.920], [595401.920, 22598.080])
        });


        const map = L.map('map', {
            crs: RDnew,
            zoom: 7, //Zoom scale RD new
            center: [52.357, 5.237] //webmercator coördinaten
        });


        const pdokachtergrondkaart = new L.TileLayer('https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/standaard/EPSG:28992/{z}/{x}/{y}.png', {
            minZoom: 0,
            maxZoom: 13,
            attribution: 'Kaartgegevens: © <a href="http://www.cbs.nl">CBS</a>, <a href="http://www.kadaster.nl">Kadaster</a>, <a href="http://openstreetmap.org">OpenStreetMap</a><span class="printhide">-auteurs (<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>).</span>'
        });
        pdokachtergrondkaart.addTo(map);      


        const hash = new L.Hash(map);
            let woonplaats = L.marker([52.37056867, 5.21867752]).addTo(map);
            let huis1 = L.marker([52.3665725, 5.2508973]).addTo(map);
            let huis2 = L.marker([52.3345988, 5.2324505]).addTo(map);
            let oudhuis1 = L.marker([52.33438835, 5.2169567]).addTo(map);
            let oudhuis2 = L.marker([52.3339408, 5.2345102]).addTo(map);
            let popup = "Dit is mijn woonplaats";
            let popup2 = "Hier woon ik nu";
            let popup3 = "Hier woonde ik vroeger";
            woonplaats.bindPopup(popup);
            huis1.bindPopup(popup2);
            huis2.bindPopup(popup2);
            oudhuis1.bindPopup(popup3);
            oudhuis2.bindPopup(popup3);


        let circle =  L.circle([52.35306223, 5.22863388], 3000, {
            color: 'pink',
            fillColor: '#f03',
            fillOpacity: 0.5
        }).addTo(map);


        let polygon = L.polygon([[
            [52.37056867, 5.21867752], 
            [52.3665725, 5.2508973],
            [52.3339408, 5.2345102],
            [52.3345988, 5.2324505],
            [52.33438835, 5.2169567]]])
        .addTo(map);


        // ADD a WMS layer
        const cbs = L.tileLayer.wms('https://geodata.nationaalgeoregister.nl/ahn3/wms', {
            'layers': 'ahn3_5m_dtm',
            'styles': 'ahn3:ahn3_5m_detail',
            'srs': 'EPSG:28992',
            'format': 'image/png',
            'opacity': '0.5',
            'transparent': true
        }).addTo(map);

        // Lagen aan en uit zetten
        window.toggle = false;{
        }

        function toggleWMS() {
            if(!toggle) {
              map.removeLayer(cbs);

            } else {
              map.addLayer(cbs);

            }
            toggle = !toggle;
          }


        const myGeojson = {
            "type": "FeatureCollection",
            "features": [
            {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
        [
                    [5.263609886169434,52.344804542009435],
                    [5.264489650726318,52.34387381690694],
                    [5.2635884284973145,52.34363785531701],
                    [5.269145965576172,52.33765974165073],
                    [5.274596214294434,52.33940344162438],
                    [5.271248817443848,52.343336347008346],
                    [5.270025730133057,52.342903744539406],
                    [5.268759727478027,52.34422775693069],
                    [5.266828536987305,52.343716509320245],
                    [5.265326499938965,52.34534199406028],
                    [5.263609886169434,52.344804542009435]
                ]]}}]}

        // ADD the geoJSON Layer
        L.geoJSON(myGeojson).addTo(map);

        //create a empty geojson layer

        const geojsonMarkerOptions = {
            radius: 8,
            fillColor: "cyan",
            color: "darkgreen",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };

        const geojson = L.geoJson(null,{
        pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);}})

        geojson.addTo(map);

        fetch("https://raw.githubusercontent.com/sweksparrow/wesselfocke/master/data/punten.geojson")
        .then(response => response.json())
        .then(data => {
        geojson.addData(data);})
        .catch( error => alert(error))

        //GeoJson uitzetten
        window.toggle = false;{
        }

        function togglePoints() {
            if(!toggle) {
              map.removeLayer(geojson);
            } else {
              map.addLayer(geojson);
            }
            toggle = !toggle;
          }


    //Maplibre

        const maplibre = new maplibregl.Map({
            container: 'maplibre',
            style: 'https://demotiles.maplibre.org/style.json', // stylesheet location
            center: [5.263609886169434,52.344804542009435], // starting position [lng, lat]
            zoom: 5 // starting zoom
        });

        maplibre.on('load', function () {
            maplibre.addSource('route', {
            'type': 'geojson',
            'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
            'type': 'LineString',
            'coordinates': [
                [
                    5.25146484375,
                    52.348763181988105
                  ],
                  [
                    4.54833984375,
                    50.51342652633956
                  ],
                  [
                    4.76806640625,
                    51.45400691005982
                  ],
                  [
                    6.240234374999999,
                    51.39920565355378
                  ],
                  [
                    6.04248046875,
                    50.41551870402678
                  ],
                  [
                    6.591796875,
                    50.41551870402678
                  ],
                  [
                    7.14111328125,
                    51.15178610143037
                  ],
                  [
                    8.76708984375,
                    51.09662294502995
                  ],
                  [
                    9.0966796875,
                    50.233151832472245
                  ],
                  [
                    8.19580078125,
                    52.40241887397332
                  ],
                  [
                    7.03125,
                    51.05520733858494
                  ],
                  [
                    8.942871093749998,
                    50.98609893339354
                  ],
                  [
                    9.25048828125,
                    50.162824333817284
                  ],
                  [
                    9.84375,
                    50.190967765585604
                  ],
                  [
                    9.667968749999998,
                    52.335339071889386
                  ],
                  [
                    9.9755859375,
                    50.14874640066278
                  ],
                  [
                    10.634765625,
                    50.162824333817284
                  ],
                  [
                    10.30517578125,
                    52.281601868071434
                  ],
                  [
                    10.810546875,
                    50.162824333817284
                  ],
                  [
                    11.35986328125,
                    50.162824333817284
                  ],
                  [
                    11.3818359375,
                    52.07950600379697
                  ],
                  [
                    13.33740234375,
                    52.02545860348814
                  ],
                  [
                    13.205566406249998,
                    50.20503326494332
                  ],
                  [
                    11.57958984375,
                    50.17689812200107
                  ]
            ]
            }
            }
            });
            maplibre.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': {
            'line-join': 'round',
            'line-cap': 'round'
            },
            'paint': {
            'line-color': '#FFFFFF',
            'line-width': 8
            }
            });
            });



    //Cesium

        Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5NDZjZWEyMS0zOWMyLTRiNjUtYmJlNi05MmJjZDZmMzcxYzEiLCJpZCI6ODQ5NDcsImlhdCI6MTY0NjY4ODQ3NH0.aZIlkHwIVcvSz-iYFHqIOMPlhQPOyl7jyumdOBdSBs8';

        // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
        const viewer = new Cesium.Viewer('cesiumContainer', {
            terrainProvider: Cesium.createWorldTerrain()
        });    
        // Add Cesium OSM Buildings, a global 3D buildings layer.
        const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());   
        // Fly the camera to San Francisco at the given longitude, latitude, and height.
        viewer.camera.flyTo({
            destination : Cesium.Cartesian3.fromDegrees(2.779866995187583, 48.86634734600105, 300),
            orientation : {
                heading : Cesium.Math.toRadians(0.0),
                pitch : Cesium.Math.toRadians(-15.0),
            }
        });


//Interactive

        const geoJsonLayerAlmere = L.geoJSON().addTo(map)

        function zoomin(){
            map.setView( [52.3665725, 5.2508973], 12)


        fetch('https://geodata.nationaalgeoregister.nl/locatieserver/lookup?fl=*&id=')
        .then(response => response.json())
        .then(data =>{
            const wkt = data.response.docs[0].geometrie_ll

            const geojsondataAlmere = Terraformer.wktToGeoJSON(wkt)  
            console.log(geojsondataAlmere)  
            geoJsonLayerAlmere.addData(geojsondataAlmere);

            const naam = data.response.docs[0].gemeentenaam

            const titel = document.getElementById('interactivetitle')
            titel.style.color = 'white'
            titel.append(naam)
        })}


        const arrayVanPlaatsnamen = ['Amsterdam', 'Almere', 'Lelystad', 'Hoofddorp', 'Nieuw Vennep']

        for (let index = 0; index < arrayVanPlaatsnamen.length; index++) {
            const woonplaats = arrayVanPlaatsnamen[index];

        const node = document.createElement("button");

        node.className = "button";
        node.id = woonplaats ;
        const textnode = document.createTextNode(woonplaats);
        node.appendChild(textnode);

        document.getElementById("container1").appendChild(node);

        node.addEventListener('click', function (){
            console.log(node.id)

            
            fetch('https://geodata.nationaalgeoregister.nl/locatieserver/free?bq=type:woonplaats&q=' + node.id)
            .then(response => response.json())
            .then(data =>{
                let id = data.response.docs[0].id

                fetch('https://geodata.nationaalgeoregister.nl/locatieserver/lookup?fl=*&id=' + id)
                .then(response => response.json())
                .then(data =>{
                    const wkt = data.response.docs[0].geometrie_ll
        
                    const geojsondataAlmere = Terraformer.wktToGeoJSON(wkt)  
                    var center = Terraformer.wktToGeoJSON(data.response.docs[0].centroide_ll)  
                    geoJsonLayerAlmere.addData(geojsondataAlmere);
                    map.setView( center.coordinates.reverse(), 4)
        
                })
            
            
            })


        })}

//WMS uit eigen server
        const eigenServer = L.tileLayer.wms('http://localhost:8001/geoserver/hsfm09/wms', {
            'layers': 'hsfm09:bevolkingskernenin2011',
            'styles': 'hsfm09:stijltje',
            'srs': 'EPSG:28992',
            'format': 'image/png',
            'opacity': '0.6',
            'transparent': true,
        }).addTo(map);

        //?service=WMS&version=1.1.0&request=GetMap&layers=hsfm09:bevolkingskernenin2011&
        //styles=&bbox=634.5732789819012,306594.5543000576,284300.0254094796,636981.7698870846&width=659&
        //height=768&srs=EPSG:28992&format=application/openlayers        
