import { NgModule } from "@angular/core";

import { RouterModule } from "@angular/router";
import { PanelControlComponent } from 'src/app/admistrador/panel-control/panel-control.component';
import { AuthGuardService } from 'src/app/_auth/_guard/auth.guard';
import { Role } from 'src/app/_models/role';
@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild([
      {
        path: "panelControl",
        component: PanelControlComponent,
        canActivate: [AuthGuardService],
	    	data:{ roles: [Role.SUPERUSER] },
        children: [
          { path: "panelControl", component: PanelControlComponent },
        ]
      }
    ])
  ],
  providers: [AuthGuardService],
  bootstrap: []
})
export class AdministradorRoutingModule {}


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
