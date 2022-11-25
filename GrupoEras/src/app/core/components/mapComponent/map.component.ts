import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { PropiedadComponent } from '../propiedad/propiedad.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  direccion!: string;
  map!: mapboxgl.Map;
  breakpoint!: number;
  @ViewChild('map') mapElement!: ElementRef;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    (mapboxgl as any).accessToken = environment.mapBox.accessToken;
    this.onResize(event);
  }

  ngAfterViewInit() {

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-64.17946316931477, -31.4189733866993],
      zoom: 12,


    });
    this.map.scrollZoom.enable();

    this.map.on('load', () => {
      // Add a new source from our GeoJSON data and
      // set the 'cluster' option to true. GL-JS will
      // add the point_count property to your source data.
      this.map.addSource('earthquakes', {
        type: 'geojson',
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: {
          "type": "FeatureCollection",
          "features": [{
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [
                -64.18246316931477, -31.4789733866993
              ]
            },
          }, {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [
                -64.18146316931477, -31.4189733866993
              ]
            }
          }, {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [
                -64.17546316931477, -31.4189733866993
              ]
            },
          }, {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [
                -64.22946316931477, -31.4189733866993
              ]
            }
          }, {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [
                -64.23946316931477, -31.4189733866993
              ]
            },
          }, {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [
                -64.17946316931477, -31.4089733866993
              ]
            }
          }, {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [
                -64.17946316931477, -31.4489733866993
              ]
            },
          }, {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [
                -64.17946316931477, -31.3889733866993
              ]
            }
          }]
        },

        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      });

      this.map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'earthquakes',
        filter: ['has', 'point_count'],
        paint: {
          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            100,
            '#f1f075',
            750,
            '#f28cb1'
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40
          ]
        }
      });

      this.map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'earthquakes',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        }
      });

      this.map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'earthquakes',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#11b4da',
          'circle-radius': 8,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff'
        },

      });

      // inspect a cluster on click

      // When a click event occurs on a feature in
      // the unclustered-point layer, open a popup at
      // the location of the feature, with
      // description HTML from its properties.
      this.map.on('click', 'unclustered-point', (e: any) => {
        this.openDialog();

      });

      this.map.on('mouseenter', 'clusters', () => {
        this.map.getCanvas().style.cursor = 'pointer';
      });
      this.map.on('mouseleave', 'clusters', () => {
        this.map.getCanvas().style.cursor = '';
      });
    });
    this.crearMarcador(-64.17946316931477, -31.4189733866993);

  }

  crearMarcador(lng: number, lat: number) {
    const marker = new mapboxgl.Marker({
      draggable: false,

    }).setLngLat([lng, lat])
      .addTo(this.map)
  }

  openDialog() {
    const dialogRef = this.dialog.open(PropiedadComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.breakpoint = (window.innerWidth <= 1200) ? 1 : 2;

  }

}
