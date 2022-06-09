import { Component, OnInit,ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SweetAlertService } from 'src/app/_services/sweet-alert.service';
import { NgxSpinnerService } from "ngx-spinner";
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CodigoPostal } from 'src/app/_models/codigoPostal';
import { DialogService } from 'src/app/_services/dialog.service';
import { Provincia }  from 'src/app/_models/provincia';
@Component({
  selector: 'app-dialog-codigos-postales',
  templateUrl: './dialog-codigos-postales.component.html',
  styleUrls: ['./dialog-codigos-postales.component.css']
})
export class DialogCodigosPostalesComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;
  public provinciaSelected: Provincia| undefined;
  public codigoPostalSelected!: CodigoPostal;
  public codigos: CodigoPostal[] | undefined;
  public provincias: Provincia[] | undefined;
  displayedColumns: string[] = ['cp', 'nombre','pod','provincia'];
  dataSourceCp = new MatTableDataSource(); 
  constructor(
    private _alertSweetAlert: SweetAlertService,
    private spinner: NgxSpinnerService,
    private serviceDialog: DialogService,
    public dialogRef: MatDialogRef<DialogCodigosPostalesComponent>,
  ) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCp.filter = filterValue.trim().toLowerCase();
  }

  listCodigosPostalesPorIdProvincia(id_provincia:number){
    this.spinner.show();
   
    this.serviceDialog.listCodigosPostalesPorIdProvincia(id_provincia).subscribe({
      next: (data:any[]) => {
        this.codigoPostalSelected = data[0];
        this.dataSourceCp.data =  data;
        this.dataSourceCp.sort = this.sort;  
        
        this.dataSourceCp.filterPredicate = function(data: any, filterValue: string) {
          var filterCp =data.cp.trim()
          .toLocaleLowerCase().indexOf(filterValue.trim().toLocaleLowerCase()) >= 0;
          var filterNombre =data.nombre.trim()
          .toLocaleLowerCase().indexOf(filterValue.trim().toLocaleLowerCase()) >= 0;
          return (filterNombre||filterCp);
        };
        this.dataSourceCp.paginator =this.paginator;
      },
      error: (e) =>  {
        this._alertSweetAlert.errorAlert("Ha ocurrido un error!");
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      } 
  });
}

listTodasProvincias(){
  this.spinner.show();
  this.serviceDialog.listTodasProvincias().subscribe({
    next: (data:any[]) => {
      this.provincias = data;
      this.provinciaSelected = data[0];
    },
    error: (e) => {
      this._alertSweetAlert.errorAlert("Ha ocurrido un error!");
      this.spinner.hide();
    },
    complete: () => {
      this.spinner.hide();
    }
});

}

onNoClick(): void {
  this.dialogRef.close();
}

clickRowElement(codigoPostal: CodigoPostal) {
  this.codigoPostalSelected = codigoPostal;
}

changeProvincia(provincia:Provincia){
  this.listCodigosPostalesPorIdProvincia(provincia.id_provincia);
}
  ngOnInit(): void {
    this.listTodasProvincias();
    this.listCodigosPostalesPorIdProvincia(1);
  }

}
