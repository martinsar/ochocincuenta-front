import { NgModule } from "@angular/core";

import { RouterModule } from "@angular/router";
import { BuscadorCircuitosComponent } from './buscador-circuitos/buscador-circuitos.component';
import { AuthGuardService } from 'src/app/_auth/_guard/auth.guard';
import { Role } from 'src/app/_models/role';
@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild([
      {
        path: "buscarCircuitos",
        component: BuscadorCircuitosComponent,
        canActivate: [AuthGuardService],
	    	data:{ roles: [Role.SUPERVISOR, Role.USUARIO,Role.ADMIN] },
        children: [
          { path: "buscadorCircuitos", component: BuscadorCircuitosComponent },
        ]
      }
    ])
  ],
  providers: [AuthGuardService],
  bootstrap: []
})
export class BuscarCircuitosRoutingModule {}


/*
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
//import { AuthGuard } from '../_guards';
import { BuscadorCircuitosComponent } from './buscador-circuitos/buscador-circuitos.component';
const routes: Routes = [
    {
        path: 'buscadorCircuito',
        component: BuscadorCircuitosComponent
      }

];


@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule],
  declarations: []
})

export class BuscarCircuitosRoutingModule { }
*/
