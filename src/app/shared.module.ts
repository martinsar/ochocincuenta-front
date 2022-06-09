import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({

    imports :[
      FormsModule, //Descomentdo 23-05-2022
      ReactiveFormsModule, //Descomentdo 23-05-2022
      ],
    exports:[

    ]

})

export class SharedModule{}
