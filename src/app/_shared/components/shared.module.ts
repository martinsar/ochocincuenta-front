import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule} from '@angular/common';

import { MaterialModule } from 'src/app/material.module';

import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { AutocompletePartidosComponent } from "src/app/_shared/components/autocomplete-partidos/autocomplete-partidos.component";
import { AutocompleteLocalidadesComponent } from './autocomplete-localidades/autocomplete-localidades.component';


@NgModule({
	imports: [
		CommonModule,
		
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
  	 AutocompletePartidosComponent
	],
	  declarations: [
		AutocompletePartidosComponent,
  AutocompleteLocalidadesComponent
  
  
	
	
	],
})
export class SharedModule {}
