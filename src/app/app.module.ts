import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BuscarCircuitosModule } from './buscarCircuitos/buscarCircuitos.module';
import { PublicModule } from './public/public.module';
import { AdministradorModule }  from './admistrador/administrador.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SharedModule }  from './shared.module';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
//import { NgxSpinnerModule } from "ngx-spinner";
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LOCALE_ID } from '@angular/core';



import { MatPaginatorIntl } from '@angular/material/paginator';
import { getDutchPaginatorIntl } from 'src/app/dutch-paginator-intl';
import { HeaderComponent } from 'src/app/_shared/header/header.component';
import {  HTTP_INTERCEPTORS  } from '@angular/common/http';
import { InterceptService } from 'src/app/_interceptor/intercept.service';
import {  HttpErrorInterceptor} from 'src/app/_interceptor/intercept.error.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
   
    ],
   imports: [
    BrowserModule,
    AppRoutingModule,
  //  FormsModule, //Descomentdo 23-05-2022
  //  ReactiveFormsModule, //Descomentdo 23-05-2022
    ReactiveFormsModule,//??
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    HttpClientModule,
    
  //   NgxSpinnerModule,
  //  MatSelectModule,


    //   BuscarCircuitosModule,
   
   
  ],
  exports:[
    MaterialModule,
    SharedModule,
   
  ],

  providers: [
    BuscarCircuitosModule,
    PublicModule,
    AdministradorModule,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: LOCALE_ID, useValue: 'es-Ar' },
    { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
