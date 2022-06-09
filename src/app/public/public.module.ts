import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule} from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { MaterialModule } from '../material.module';
import { LoginComponent } from './login/login.component';

import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({

  imports: [
    CommonModule,
    PublicRoutingModule,
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
      LoginComponent,
   


  ],

})
export class PublicModule { }
