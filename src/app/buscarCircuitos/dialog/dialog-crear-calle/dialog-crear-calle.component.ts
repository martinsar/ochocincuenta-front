import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import { Partido } from 'src/app/_models/partido';
import { Tramo } from 'src/app/_models/tramo';
import { DialogService } from 'src/app/_services/dialog.service';
import { SweetAlertService } from 'src/app/_services/sweet-alert.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataService } from 'src/app/_services/data.service';
import { ModalParams } from 'src/app/_models/modalParams';
@Component({
  selector: 'app-dialog-crear-calle',
  templateUrl: './dialog-crear-calle.component.html',
  styleUrls: ['./dialog-crear-calle.component.css']
})
export class DialogCrearCalleComponent implements OnInit {
  public formBuscador!: FormGroup;
  public viewTramo: boolean = false;
  public arrayTramos: Tramo[] = new Array<Tramo>();
  public errorCalle :boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private serviceDialog: DialogService,
    private serviceData:DataService,
    private _alertSweetAlert: SweetAlertService,
    public dialogRef: MatDialogRef<DialogCrearCalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalParams,
  ) { }
  saveTramo(){
   
    this.formBuscador.markAllAsTouched();
    if (this.formBuscador.invalid || (this.formBuscador.get("partido")!.value == null)) {
        this.serviceData.partidoMarkAsTouched.emit(true);
        return;
    }else{
      let nombrecall = this.formBuscador.get("nombrecall")!.value;
      let numero = this.formBuscador.get("numero")!.value;
      let partido:Partido = this.formBuscador.get("partido")!.value;

      let tramo = new Tramo(0,this.formBuscador.get("localidad")!.value,this.formBuscador.get("tipo")!.value, this.formBuscador.get("numero")!.value,
      this.formBuscador.get("nombrecall")!.value,0,"", 0,"",this.formBuscador.get("vereda")!.value, this.formBuscador.get("desde")!.value,this.formBuscador.get("hasta")!.value, this.formBuscador.get("circuito")!.value,this.formBuscador.get("observacion")!.value,this.data.partidoSelected.id);
      this.arrayTramos.push(tramo);
      this.formBuscador.reset();
      this.formBuscador.get("nombrecall")!.setValue(nombrecall);
      this.formBuscador.get("numero")!.setValue(numero);
      this.formBuscador.get("partido")!.setValue(partido);
      
    }
  }

  changePartido(partido:Partido){
   
    this.formBuscador.get("partido")!.setValue(partido);
  }
  
  saveCalle(){
    this.serviceDialog.saveTramo(this.arrayTramos).subscribe({
      next: (data) => {
        this._alertSweetAlert.sucessAlert(data.message);
      },
      error: (e) =>{
        this._alertSweetAlert.errorAlert(e.error.message);
      
      },
      complete: () => {
        this.dialogRef.close();
      }
  });
  

  }  
  onNoClick(): void {
    this.dialogRef.close();
  }

  get f(){
  
    return this.formBuscador.controls;
  }

  cargaSiguiente(){
      
    this._alertSweetAlert.basicMessage("En esta pantalla debe crear los tramos uno por uno y luego presionar GUARDA. Por cada tramo complete el formulario y presione el boton +");
    if((this.formBuscador.controls["nombrecall"].invalid)&&(this.formBuscador.controls["numero"].invalid) ){
                
                this.errorCalle = true;
                // this.formBuscador.controls["numero"].markAsTouched();
               //  esto lo uso para marcar como tocado el autocompletado
              //  this.serviceData.partidoMarkAsTouched.emit(true);
                return;
      }
      this.viewTramo=true;

  }

  ngOnInit(): void {
    this.formBuscador = this!.formBuilder.group({
      nombrecall: ['', null],
      numero: ['',null],
      localidad: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      circuito: ['', [Validators.required]],
      partido: ['', [Validators.required]],
     
      vereda: ['',[Validators.required]],
      desde: ['', null],
      hasta: ['',[Validators.required]],
      
      observacion: ['', null],
    });
    this.formBuscador.get("partido")!.setValue(this.data.partidoSelected.detalle_seccion);
  }

}
