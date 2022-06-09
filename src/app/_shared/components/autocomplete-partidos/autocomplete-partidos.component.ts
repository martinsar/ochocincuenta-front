import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {Observable, Subscription} from 'rxjs';

import { Partido } from 'src/app/_models/partido';
import { BuscadorCircuitosService } from 'src/app/_services/buscador-circuitos.service';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { SweetAlertService } from 'src/app/_services/sweet-alert.service';
import { DataService } from 'src/app/_services/data.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Tramo } from 'src/app/_models/tramo';
@Component({
  selector: 'app-autocomplete-partidos',
  templateUrl: './autocomplete-partidos.component.html',
  styleUrls: ['./autocomplete-partidos.component.css']
})
export class AutocompletePartidosComponent implements OnInit {
  @Output() selectPartido = new EventEmitter<Partido>();

  @Input()
  mostrarAutoCompletado!: boolean;

  @Input()
  showDefaultFirstElement!: boolean;



  filteredOptionsPartido!: Observable<Partido[]>;

  public partidoMarkAsTouchedSuscription: Subscription | undefined;
  public partidos: Partido[] | undefined;
  public formAutocomplate!: FormGroup;
  constructor(
    private serviceBuscadorCircuitos:BuscadorCircuitosService,
    private _alertSweetAlert: SweetAlertService,
    private formBuilder: FormBuilder,
    public serviceData: DataService,
    private spinner: NgxSpinnerService,
  ) { }

  private _filterPartido(name: string): Partido[] {
    const filterValue = name.toLowerCase();
    return this.partidos!.filter(option => option.detalle_seccion.toLowerCase().substring(0,filterValue.length) == filterValue);
  }

  listarSecciones(){
    this.spinner.show();
    this.serviceBuscadorCircuitos.listarSerrciones().subscribe({
      next: (data:any[]) => {
        this.partidos = data;
        this.filteredOptionsPartido = this.formAutocomplate.get("partido")!.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value.detalle_seccion)),
          map(detalle_seccion => (detalle_seccion ? this._filterPartido(detalle_seccion) : this.partidos!.slice())),
        );
       console.log("que tiene form partido ",this.formAutocomplate.get('partido')?.value);
        this.showDefaultFirstElement==true?this.formAutocomplate.get('partido')?.setValue(data[0]):undefined;
     
        console.log("que tiene form partido despues",this.formAutocomplate.get('partido')?.value);
      
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

  clickSelectPartido(){
    this.formAutocomplate.get('partido')?.setValue("");
  }

  displayFn(partido: Partido): string {
    return partido && partido.detalle_seccion ? partido.detalle_seccion : '';
  }

  changePartidos(event:any){
     this.selectPartido.emit(event.option.value);
  }

  get f(){
  
    return this.formAutocomplate.controls;
  }
  

  ngOnInit(): void {
    this.formAutocomplate = this!.formBuilder.group({
      partido: ['', [Validators.required]],
    });
  
      this.partidoMarkAsTouchedSuscription = this.serviceData.partidoMarkAsTouched.subscribe(
        partidoMarkAsTouched => {
         if(partidoMarkAsTouched){
          
            if(this.formAutocomplate.get("partido")?.value.length  === 0){
              this.formAutocomplate.controls["partido"].markAsTouched();
            }
          }
        });

  
  
    this.listarSecciones();
  }

}
