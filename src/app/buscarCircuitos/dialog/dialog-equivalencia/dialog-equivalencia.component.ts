import { Component, OnInit,Inject,ViewChild } from '@angular/core';
import { SweetAlertService } from 'src/app/_services/sweet-alert.service';
import { NgxSpinnerService } from "ngx-spinner";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalParams } from 'src/app/_models/modalParams';
import { Partido } from 'src/app/_models/partido';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DialogService } from 'src/app/_services/dialog.service';
import { Equivalencia } from 'src/app/_models/equivalencia';
@Component({
  selector: 'app-dialog-equivalencia',
  templateUrl: './dialog-equivalencia.component.html',
  styleUrls: ['./dialog-equivalencia.component.css']
})
export class DialogEquivalenciaComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['tx_nombre','cto','tx_partido','observac'];
  dataSourceEquivalencia = new MatTableDataSource(); 
  public partidoSelected: Partido| undefined;
  public partidos: Partido[] | undefined;

  public equivalenciaSelected!: Equivalencia;

  constructor(
    private _alertSweetAlert: SweetAlertService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: ModalParams,
    private serviceDialog: DialogService,
    public dialogRef: MatDialogRef<DialogEquivalenciaComponent>,
  ) { }

  changePartido(partido:Partido){
    this.listEquivalencias(partido.id);
  }

  listEquivalencias(id_partido:string){
    this.spinner.show();
    this.serviceDialog.listEquivalencias(id_partido).subscribe({
      next: (data:any[]) => {
        this.equivalenciaSelected = data[0];
        this.dataSourceEquivalencia.data =  data;
        this.dataSourceEquivalencia.sort = this.sort;  
        this.dataSourceEquivalencia.filterPredicate = function(data: any, filterValue: string) {
          var filterTx_nombrep =data.tx_nombre.trim()
          .toLocaleLowerCase().indexOf(filterValue.trim().toLocaleLowerCase()) >= 0;
          return filterTx_nombrep;
        };
        this.dataSourceEquivalencia.paginator =this.paginator;
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

  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSourceEquivalencia.filter = filterValue.trim().toLowerCase();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clickElement = function (element: { id_localidad: string; }) {
    document.getElementById(`id_localidad-${element.id_localidad}`)!.classList.remove("truncate-text");
  }

  clickRowElement(equivalencia: Equivalencia) {
    this.equivalenciaSelected = equivalencia;
  }


  ngOnInit(): void {
    this.partidoSelected = this.data.partidoSelected;
    this.partidos = this.data.partidos;
    this.listEquivalencias(this.data.partidoSelected.id);
  }

}
