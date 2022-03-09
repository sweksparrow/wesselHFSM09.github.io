
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
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

const geojson = L.geoJson(null,{
pointToLayer: function (feature, latlng) {
return L.circleMarker(latlng, geojsonMarkerOptions);}})

geojson.addTo(map);

fetch("https://raw.githubusercontent.com/sweksparrow/wesselfocke/master/data/campingalmere.geojson")
.then(response => response.json())
.then(data => {
geojson.addData(data);})
.catch( error => alert(error))



//Maplibre

const maplibre = new maplibregl.Map({
    container: 'maplibre',
    style: 'https://demotiles.maplibre.org/style.json', // stylesheet location
    center: [-81.5617078, 28.3824072], // starting position [lng, lat]
    zoom: 5 // starting zoom
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


//Turf




