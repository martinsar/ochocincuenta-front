import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule,} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
/*

import {MatIconModule} from '@angular/material/icon';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';




import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import {MatCheckboxModule} from '@angular/material/checkbox';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';

import {MatMenuModule} from '@angular/material/menu';

import {ClipboardModule} from '@angular/cdk/clipboard';

*/
import {MatDividerModule} from '@angular/material/divider';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; esta poronga rompia todo
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
//import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
//import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({

    imports :[
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatToolbarModule,
    /*
      


        MatSidenavModule,
        MatTabsModule,




        MatExpansionModule,
        MatDatepickerModule,
        MatNativeDateModule,

        MatCheckboxModule,
        MatDialogModule,
        MatSnackBarModule,
        MatSortModule,

        MatMenuModule,

        ClipboardModule,

    */
        MatDividerModule,
    //    BrowserAnimationsModule,
        MatCardModule,
        MatDialogModule,
        MatPaginatorModule,
        MatIconModule,
        MatRadioModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatTooltipModule,
     //   MatProgressSpinnerModule
   //     NgxSpinnerModule,
      ],
    exports:[
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatIconModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatPaginatorModule,
     //   MatProgressSpinnerModule,
        MatDialogModule,
        MatCardModule,
        MatDividerModule,
        MatTooltipModule,
        MatToolbarModule,
      //  NgxSpinnerModule,
      /*
       


        MatSidenavModule,
        MatTabsModule,


        MatExpansionModule,
        MatDatepickerModule,
        MatNativeDateModule,

        MatCheckboxModule,

        MatSnackBarModule,
        MatSortModule,

        MatMenuModule,
        MatSelectModule,
        ClipboardModule
      */
    ]

})

export class MaterialModule{}
