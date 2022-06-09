import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Circuito } from 'src/app/_models/circuito';
import { Partido } from 'src/app/_models/partido';
import { DialogService } from 'src/app/_services/dialog.service';
import { ModalParams } from 'src/app/_models/modalParams';
import { SweetAlertService } from 'src/app/_services/sweet-alert.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-dialog-ver-pasaje',
  templateUrl: './dialog-ver-circuitos.component.html',
  styleUrls: ['./dialog-ver-circuitos.component.scss']
})
export class DialogVerCirccuitosComponent implements OnInit {
  public circuitos: Circuito[] | undefined;
  public partidoSelected: Partido | undefined;
  constructor(
    private serviceDialog: DialogService,
    public dialogRef: MatDialogRef<DialogVerCirccuitosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalParams,
    private _alertSweetAlert: SweetAlertService,
    private spinner: NgxSpinnerService,
  
     ) { }


   changePartidos(partido: Partido) {
    
      this.listarCircuitosPorSeccion(partido.id);
   }


  listarCircuitosPorSeccion(seccionId: string){
    this.spinner.show();
    this.serviceDialog.listarCircuitosPorSeccion(seccionId).subscribe({
      next: (data:any[]) => {
        this.circuitos = data;
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
  


  ngOnInit(): void {
    this.listarCircuitosPorSeccion(this.data.partidoSelected.id);
    this.partidoSelected = this.data.partidoSelected;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }



}

