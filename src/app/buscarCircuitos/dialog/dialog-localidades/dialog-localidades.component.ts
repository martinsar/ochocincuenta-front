import { Component, OnInit,Inject,ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Partido } from 'src/app/_models/partido';
import { DialogService } from 'src/app/_services/dialog.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ModalParams } from 'src/app/_models/modalParams';
import { SweetAlertService } from 'src/app/_services/sweet-alert.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Localidad } from 'src/app/_models/localidad'
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-dialog-localidades',
  templateUrl: './dialog-localidades.component.html',
  styleUrls: ['./dialog-localidades.component.css']
})
export class DialogLocalidadesComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['circuito','nombre','ing','localidad','partido','observac'];
  dataSourceLocalidades = new MatTableDataSource<Localidad>(); 
  public localidadSelected!: Localidad;
 // public partidoSelected: Partido| undefined;
  public partidos: Partido[] | undefined;
  public formBuscador!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalParams,
    private serviceDialog: DialogService,
    public dialogRef: MatDialogRef<DialogLocalidadesComponent>,
    private _alertSweetAlert: SweetAlertService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder
  ) { }

  applyFilter(event: Event) {
    
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceLocalidades.filter = filterValue.trim().toLowerCase();
  }

  clickRowElement(localidad: Localidad) {
    this.localidadSelected = localidad;
  }

  listLocalidadesPorSeccion(nombreSeccion:string,idCircuitoSelected?:string){
    this.spinner.show();
    this.serviceDialog.listLocalidadesPorSeccion(nombreSeccion,idCircuitoSelected).subscribe({
      next: (data:any[]) => {
        this.dataSourceLocalidades.data =  data;
        this.localidadSelected = data[0];
      this.dataSourceLocalidades.sort = this.sort;  
      
      this.dataSourceLocalidades.filterPredicate = function(data: any, filterValue: string) {
        var filterCircuito =data.circuito.trim()
        .toLocaleLowerCase().indexOf(filterValue.trim().toLocaleLowerCase()) >= 0;

        var filterNombre =data.nombre.trim()
        .toLocaleLowerCase().indexOf(filterValue.trim().toLocaleLowerCase()) >= 0;
        return (filterCircuito||filterNombre);
      };
      this.dataSourceLocalidades.paginator =this.paginator;
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



  changePartido(partido:Partido){
    this.listLocalidadesPorSeccion(partido.detalle_seccion);
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  clickElement = function (element: { id_localidad: string; }) {
 
    document.getElementById(`id_localidad-${element.id_localidad}`)!.classList.remove("truncate-text");
  }



  ngOnInit(): void {
    this.formBuscador = this!.formBuilder.group({
      busqueda: ['', null],
      partidoSelected: ['', [Validators.required]],
     
    });
    this.formBuscador.get('partidoSelected')?.setValue(this.data.partidoSelected);
    this.formBuscador.get('busqueda')?.setValue(this.data.tramoSelected?.circuito);
 
    this.partidos = this.data.partidos;
    this.listLocalidadesPorSeccion(this.data.partidoSelected.detalle_seccion,this.data.tramoSelected?.circuito);
    
    
 
  }

}
