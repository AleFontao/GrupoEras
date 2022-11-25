/*Modulos*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

/*Component*/
import { PublicComponent } from './public.component';
import { PrincipalComponent } from './principal/principal.component';



//Declaramos las rutas que se van a usar en la cosntante routes
const routes: Routes = [
    {path: '', component: PublicComponent, children: /*Componente padre*/
        [
            { path: '', redirectTo: 'principal', pathMatch: 'full'},
            { path: 'principal', component: PrincipalComponent},         
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    declarations: [],
    exports: [RouterModule],
    providers: []
})

export class PublicRoutingModule {
    constructor(){}
} 