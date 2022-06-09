import { Component, OnInit,Inject, ViewChild } from '@angular/core';
import { SweetAlertService } from 'src/app/_services/sweet-alert.service';
import { NgxSpinnerService } from "ngx-spinner";
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogService } from 'src/app/_services/dialog.service';
import { Provincia } from 'src/app/_models/provincia';
import { Partido } from 'src/app/_models/partido';
import { ModalParams } from 'src/app/_models/modalParams';
import { Osr } from 'src/app/_models/osr';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-dialog-osr',
  templateUrl: './dialog-osr.component.html',
  styleUrls: ['./dialog-osr.component.css']
})
export class DialogOsrComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['nof','nombre','cp','pod','provincia'];
  dataSourceOsr = new MatTableDataSource();
  public provincias: Provincia[] | undefined;
  //public provinciaSelected: Provincia| undefined;
  public osrSelected!: Osr;
  public calle!: string;
  public formBuscador!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalParams,
    private _alertSweetAlert: SweetAlertService,
    private spinner: NgxSpinnerService,
    private serviceDialog: DialogService,
    public dialogRef: MatDialogRef<DialogOsrComponent>,
    private formBuilder: FormBuilder
  ) { }

    
  changeTipoBusqueda(tipoBusqueda: string) {
    let provincia: Provincia;
    provincia = this.formBuscador.get('provinciaSelected')!.value;
    this.listOsr(provincia.id_provincia);
    
  
 
}
  filtroNofONombre(){
    this.dataSourceOsr.filterPredicate = function(data: any, filterValue: string) {
      var filterNof =data.nof.trim()
      .toLocaleLowerCase().indexOf(filterValue.trim().toLocaleLowerCase()) >= 0;

      var filterNombre =data.nombre.trim()
      .toLocaleLowerCase().indexOf(filterValue.trim().toLocaleLowerCase()) >= 0;
      return (filterNof||filterNombre);
  };
  }

  filtroCodPostalOPartido(){
    this.dataSourceOsr.filterPredicate = function(data: any, filterValue: string) {
      var filterCp =data.cp.trim()
      .toLocaleLowerCase().indexOf(filterValue.trim().toLocaleLowerCase()) >= 0;

      var filterPod =data.pod.trim()
      .toLocaleLowerCase().indexOf(filterValue.trim().toLocaleLowerCase()) >= 0;
      return (filterCp||filterPod);
  };
  }

  listOsr(id_provincia?:number){
    this.spinner.show();
    this.serviceDialog.listOsr(id_provincia).subscribe({
      next: (data:any[]) => {
        this.osrSelected = data[0];
        this.dataSourceOsr.data =  data;
        this.dataSourceOsr.sort = this.sort;  
      
     /////////////////////

        
     switch(this.formBuscador.get('tipoBusqueda')!.value) {
      case "1":
        this.filtroNofONombre();
        this.dataSourceOsr.data =  data;
        break;
      case "2":
        this.filtroCodPostalOPartido();
        this.dataSourceOsr.data =  data;
        break;
    
      default:
       // this.filtroAleatorio()
       
    }







     ///////////////////////
      this.dataSourceOsr.paginator =this.paginator;
      },
      error: (e) =>{
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

  changeProvincia(provincia:Provincia){
    this.listOsr(provincia.id_provincia);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceOsr.filter = filterValue.trim().toLowerCase();
  }

  listTodasProvincias(){
    this.serviceDialog.listTodasProvincias().subscribe({
      next: (data:any[]) => {
        this.provincias = data;
     //   this.provinciaSelected = data[0];
        this.formBuscador.get('provinciaSelected')?.setValue(data[0]);
      },
      error: (e) => {
        this._alertSweetAlert.errorAlert("Ha ocurrido un error!");
        this.spinner.hide();
      },
      complete: () => {
      }
  });
  
  }

  clickRowElement(osr: Osr) {
    this.osrSelected = osr;
  }

  ngOnInit(): void {
    this.formBuscador = this!.formBuilder.group({
      calle: ['', null],
      provinciaSelected: ['', [Validators.required]],
      tipoBusqueda: ['', [Validators.required]],
    
    });
    this.formBuscador.get('tipoBusqueda')?.setValue('1');
    this.listTodasProvincias();
    this.listOsr();
  }

}
