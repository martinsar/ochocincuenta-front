import { NgModule } from "@angular/core";

import { RouterModule } from "@angular/router";
import { LoginComponent } from 'src/app/public/login/login.component';
@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: LoginComponent,
        children: [
          { path: "login", component: LoginComponent },
        ]
      }
    ])
  ],
  providers: [],
  bootstrap: []
})
export class PublicRoutingModule {}


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
