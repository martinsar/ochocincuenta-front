import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule} from '@angular/common';

import { BuscarCircuitosRoutingModule } from './buscarCircuitos-routing.module';
import { MaterialModule } from '../material.module';
import { BuscadorCircuitosComponent } from './buscador-circuitos/buscador-circuitos.component';
import { DialogVerCirccuitosComponent } from './dialog/circuitos/dialog-ver-circuitos.component';
import { DialogDepartamentosComponent } from './dialog/dialog-departamentos/dialog-departamentos.component';
import { DialogLocalidadesComponent } from './dialog/dialog-localidades/dialog-localidades.component';
import { DialogCodigosPostalesComponent } from './dialog/dialog-codigos-postales/dialog-codigos-postales.component';
import { DialogEquivalenciaComponent } from './dialog/dialog-equivalencia/dialog-equivalencia.component';
import { DialogOsrComponent } from './dialog/dialog-osr/dialog-osr.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { DialogCruceComponent } from './dialog/dialog-cruce/dialog-cruce.component';
import { DialogModificarTramoComponent } from './dialog/dialog-modificar-tramo/dialog-modificar-tramo.component';
import { DialogCrearCalleComponent } from './dialog/dialog-crear-calle/dialog-crear-calle.component';
import { AutocompletePartidosComponent } from 'src/app/_shared/components/autocomplete-partidos/autocomplete-partidos.component';
import { SharedModule }  from 'src/app/_shared/components/shared.module';
@NgModule({

  imports: [
    CommonModule,
    BuscarCircuitosRoutingModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,


  
    SharedModule,

  ],
  entryComponents: [
      DialogVerCirccuitosComponent,
      DialogDepartamentosComponent,
      DialogLocalidadesComponent,
      DialogEquivalenciaComponent,
      DialogCodigosPostalesComponent,
      DialogOsrComponent,
      NgxSpinnerModule,
      CommonModule,
  ],
  exports: [
    RouterModule,

  ],
    declarations: [
      DialogVerCirccuitosComponent,
      DialogDepartamentosComponent,
      DialogLocalidadesComponent,
      DialogEquivalenciaComponent,
      DialogCodigosPostalesComponent,
      DialogOsrComponent,
      BuscadorCircuitosComponent,
      DialogCruceComponent,
      DialogModificarTramoComponent,
      DialogCrearCalleComponent,
    
    


  ],

})
export class BuscarCircuitosModule { }
