import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
//import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
//import { LoginComponent } from "./login/login.component";
//import { HomeComponent } from "./home/home.component";
//import { AuthGuard } from "./shared/guard/auth-guard.service";
import { AppComponent } from "src/app/app.component";
import { BuscadorCircuitosComponent } from "src/app/buscarCircuitos/buscador-circuitos/buscador-circuitos.component";
const routes: Routes = [
  //{ path: "login", component: LoginComponent }
  //,

  {
    path: "circuitos",
    loadChildren: () =>
      import("./buscarCircuitos/buscarCircuitos.module").then(m => m.BuscarCircuitosModule),
    canActivate: [
    //  AuthGuard
    ]
  },
  {
    path: "login",
    loadChildren: () =>
      import("./public/public.module").then(m => m.PublicModule),
    canActivate: [
    //  AuthGuard
    ]
  },
  {
    path: "administrador",
    loadChildren: () =>
      import("./admistrador/administrador.module").then(m => m.AdministradorModule),
    canActivate: [
    //  AuthGuard
    ]
  },
  {
    path: '**',
    loadChildren: () =>
      import("./public/public.module").then(m => m.PublicModule),
    canActivate: [
    //  AuthGuard
    ]
  },
 
 // { path: "**", component: PageNotFoundComponent }
 //{ path: "**", component: BuscadorCircuitosComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false, useHash: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
