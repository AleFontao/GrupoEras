import { Component, HostListener, OnInit } from '@angular/core';
import { Worker, Workers } from 'src/app/core/models/worker';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  title = 'GrupoEras';
  showFiller = false;
  screenSize = false;
  workers: Worker[] = Workers;
  ngOnInit() {
    this.onResize();

    
  }


  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenSize = (window.innerWidth <= 900) ? true : false;
  }

}
