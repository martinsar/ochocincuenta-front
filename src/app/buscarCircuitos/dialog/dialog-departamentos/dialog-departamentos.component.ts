import { Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Departamento } from 'src/app/_models/departamento';
import { Partido } from 'src/app/_models/partido';
import { Provincia }  from 'src/app/_models/provincia';
import { DialogService } from 'src/app/_services/dialog.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SweetAlertService } from 'src/app/_services/sweet-alert.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-dialog-departamentos',
  templateUrl: './dialog-departamentos.component.html',
  styleUrls: ['./dialog-departamentos.component.css']
})
export class DialogDepartamentosComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  public provinciaSelected: Provincia| undefined;
  public departamentoSelected!: Departamento;

  public provincias: Provincia[] | undefined;
  displayedColumns: string[] = ['provincia', 'dpto','cabecera','cp'];
  dataSourceDeptos = new MatTableDataSource(); 
  constructor(
   // @Inject(MAT_DIALOG_DATA) public data: Partido,
   public dialogRef: MatDialogRef<DialogDepartamentosComponent>,
   private serviceDialog: DialogService,
   private _alertSweetAlert: SweetAlertService,
   private spinner: NgxSpinnerService,
  ) { }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceDeptos.filter = filterValue.trim().toLowerCase();
  }

  listarDepartamentos(id_provincia:number){
    this.spinner.show();
    this.serviceDialog.listarDepartamentos(id_provincia).subscribe({
      next: (data:any[]) => {
        this.departamentoSelected = data[0];
        this.dataSourceDeptos.data =  data;
        this.dataSourceDeptos.sort = this.sort;  
        this.dataSourceDeptos.filterPredicate = function(data: any, filterValue: string) {
          var filterNombreCall =data.nombrecall.trim()
          .toLocaleLowerCase().indexOf(filterValue.trim().toLocaleLowerCase()) >= 0;
          var filterCalle =data.numero.trim()
          .toLocaleLowerCase().indexOf(filterValue.trim().toLocaleLowerCase()) >= 0;
          return (filterNombreCall||filterCalle);
        };
        this.dataSourceDeptos.paginator =this.paginator;
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

  listarAllDepartamentos(){
    this.spinner.show();
    this.serviceDialog.listarAllDepartamentos().subscribe({
      next: (data:any[]) => {
        this.departamentoSelected = data[0];
        this.dataSourceDeptos.data =  data;
        this.dataSourceDeptos.sort = this.sort;  
        
        this.dataSourceDeptos.filterPredicate = function(data: any, filterValue: string) {
          var filterCabecera =data.cabecera.trim()
          .toLocaleLowerCase().indexOf(filterValue.trim().toLocaleLowerCase()) >= 0;
  
          var filterDpto =data.dpto.trim()
          .toLocaleLowerCase().indexOf(filterValue.trim().toLocaleLowerCase()) >= 0;
          return (filterCabecera||filterDpto);
        };
        this.dataSourceDeptos.paginator =this.paginator;
        this.listTodasProvincias();
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
        
      },
      error: (e) => {
        this._alertSweetAlert.errorAlert("Ha ocurrido un error!");
        this.spinner.hide();
      },
      complete: () => {
        //unshift() agrega uno o más elementos al inicio del array,
        this.spinner.hide();
        this.provincias!.unshift(new Provincia('Todos',999999));
        this.provinciaSelected = this.provincias![0];
      } 
  });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeProvincia(provincia:Provincia){
    
    if(provincia.nombre=="Todos"){
      this.listarAllDepartamentos();
    }else{
      this.listarDepartamentos(provincia.id_provincia);
    }
    
  }

  clickRowElement(localidad: Departamento) {
    this.departamentoSelected = localidad;
  }
  
  ngOnInit(): void {
   this.listarAllDepartamentos();
  
  }

}
