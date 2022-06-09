import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule} from '@angular/common';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { MaterialModule } from 'src/app/material.module';

import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { AltaCalleComponent } from './alta-calle/alta-calle.component';
@NgModule({

  imports: [
    CommonModule,
    AdministradorRoutingModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,




  ],
  entryComponents: [
      NgxSpinnerModule,
      CommonModule,
  ],
  exports: [
    RouterModule,

  ],
    declarations: [
    


  
    AltaCalleComponent
  ],

})
export class AdministradorModule { }
