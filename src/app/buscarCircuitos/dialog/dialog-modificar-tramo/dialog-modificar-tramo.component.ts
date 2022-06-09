import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalParams } from 'src/app/_models/modalParams';
import { SweetAlertService } from 'src/app/_services/sweet-alert.service';
import { DialogService } from 'src/app/_services/dialog.service';
import { Tramo } from 'src/app/_models/tramo';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-dialog-modificar-tramo',
  templateUrl: './dialog-modificar-tramo.component.html',
  styleUrls: ['./dialog-modificar-tramo.component.css']
})
export class DialogModificarTramoComponent implements OnInit {
  public formBuscador!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalParams,
    private formBuilder: FormBuilder,
    private _alertSweetAlert: SweetAlertService,
    private serviceDialog: DialogService,
    public dialogRef: MatDialogRef<DialogModificarTramoComponent>,
    private spinner: NgxSpinnerService,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  tramoUpdate(id_tramo:number,localidad:any,tipo:any, numero:any,
    nombrecall:any,coda:any,anterior:any, codp:any,posterior:any,vereda:any,
     desde: any,hasta: any, circuito: any,observacion: any){

      this.spinner.show()
      let tramo = new Tramo(id_tramo,localidad,tipo, numero,nombrecall,coda,anterior, codp,posterior,vereda,
         desde,hasta, circuito,observacion);
      this.serviceDialog.updateTramo(tramo).subscribe({
      next: (data:any) => {
        this._alertSweetAlert.sucessAlert(data.message);
    
      },
      error: (e) =>{
        this._alertSweetAlert.errorAlert("Ha ocurrido un error!");
        this.dialogRef.close();
        this.spinner.hide();
        
      },
      complete: () => {
        this.dialogRef.close(tramo);
        this.spinner.hide();
      }
  });
  
  }

  

  updateTramo(){
    if (this.formBuscador.invalid) {
      console.log("no sigue");
      return;
  }
    this.tramoUpdate(this.data.tramoSelected!.id_tramo,this.formBuscador.get('localidad')!.value, this.formBuscador.get('tipo')!.value, this.formBuscador.get('numero')!.value,
    this.formBuscador.get('nombrecall')!.value,this.formBuscador.get('coda')!.value,this.formBuscador.get('anterior')!.value, this.formBuscador.get('codp')!.value,this.formBuscador.get('posterior')!.value,this.formBuscador.get('vereda')!.value,
    this.formBuscador.get('desde')!.value,this.formBuscador.get('hasta')!.value, this.formBuscador.get('circuito')!.value,this.formBuscador.get('observacion')!.value);
  }

  ngOnInit(): void {
    this.formBuscador = this!.formBuilder.group({
      localidad: ['',null],
      tipo: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      nombrecall: ['', [Validators.required]],
      coda: ['', null],
      anterior: ['', null],
      codp: ['',null],
      posterior: ['', null],
      vereda: ['', null],
      desde: ['',null],
      hasta: ['', null],
      circuito: ['', [Validators.required]],
      observacion: ['', null],
    });
    this.formBuscador.get('localidad')?.setValue(this.data.tramoSelected!.localidad);
    this.formBuscador.get('tipo')?.setValue(this.data.tramoSelected!.tipo);
    this.formBuscador.get('numero')?.setValue(this.data.tramoSelected!.numero);
    this.formBuscador.get('nombrecall')?.setValue(this.data.tramoSelected!.nombrecall);
    this.formBuscador.get('coda')?.setValue(this.data.tramoSelected!.coda);
    this.formBuscador.get('anterior')?.setValue(this.data.tramoSelected!.anterior);
    this.formBuscador.get('codp')?.setValue(this.data.tramoSelected!.codp);
    this.formBuscador.get('posterior')?.setValue(this.data.tramoSelected!.posterior);
    this.formBuscador.get('vereda')?.setValue(this.data.tramoSelected!.vereda);
    this.formBuscador.get('desde')?.setValue(this.data.tramoSelected!.desde);
    this.formBuscador.get('hasta')?.setValue(this.data.tramoSelected!.hasta);
    this.formBuscador.get('circuito')?.setValue(this.data.tramoSelected!.circuito);
    this.formBuscador.get('observacion')?.setValue(this.data.tramoSelected!.observacion);
  }

}
