import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { PublicRoutingModule } from './public-routing.module';
import { AptitudeCardComponent } from '../core/components/aptitude-card/nosotros-card.component';
import { CertificationCardComponent } from '../core/components/certification-card/certification-card.component';
import { PrincipalComponent } from './principal/principal.component';
import { MapComponent } from '../core/components/mapComponent/map.component';


@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    PublicRoutingModule,
    MatFormFieldModule,
    MatInputModule 
  ],
  declarations: [
    PublicComponent,
    AptitudeCardComponent,
    CertificationCardComponent,
    PrincipalComponent,
    MapComponent
  ]
})
export class PublicModule { }
