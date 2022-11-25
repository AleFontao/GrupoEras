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
  checked = false;
  workers: Worker[] = Workers;
  ngOnInit() {
    this.onResize();

    
  }


  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenSize = (window.innerWidth <= 900) ? true : false;
  }

  darkMode(){
    if( this.checked ) {
      document.documentElement.style.setProperty('--color1', '#E6E6EA');
      document.documentElement.style.setProperty('--color2', '#F4F4F8');
      document.documentElement.style.setProperty('--color3', '#F88935');
      document.documentElement.style.setProperty('--color4', '#0A2F63');
      this.checked = !this.checked;
    }else{
      document.documentElement.style.setProperty('--color1', '#262626');
      document.documentElement.style.setProperty('--color2', '#262626');
      document.documentElement.style.setProperty('--color3', '#F88935');
      document.documentElement.style.setProperty('--color4', '#F4F4F8');
      this.checked = !this.checked;
    }
    
  }

}
