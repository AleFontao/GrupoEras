import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  direccion!: string;
  mapa!: mapboxgl.Map;
  breakpoint!: number;
  @ViewChild('map') mapElement!: ElementRef;

  constructor() { }

  ngOnInit() {
    (mapboxgl as any).accessToken = environment.mapBox.accessToken;
    this.onResize(event);
  }

  ngAfterViewInit() {

    this.mapa = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ -64.17946316931477, -31.4189733866993],
      zoom: 12,

      
    });
    this.mapa.scrollZoom.enable();
    this.crearMarcador(-64.17946316931477, -31.4189733866993);

  }

  crearMarcador(lng: number, lat: number) {
    const marker = new mapboxgl.Marker({
      draggable: false,
      
    }).setLngLat([lng, lat])
      .addTo(this.mapa)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.breakpoint = (window.innerWidth <= 1200) ? 1 : 2;
    
  }

}
