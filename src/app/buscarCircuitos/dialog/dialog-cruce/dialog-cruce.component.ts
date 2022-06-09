import { Component, OnInit,Inject, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import { Tramo } from 'src/app/_models/tramo';
import { ModalParams } from 'src/app/_models/modalParams';
import {map, startWith} from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { DialogService } from 'src/app/_services/dialog.service';
import { BuscadorCircuitosService } from 'src/app/_services/buscador-circuitos.service';
import { SweetAlertService } from 'src/app/_services/sweet-alert.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Calle } from 'src/app/_models/calle'; 
@Component({
  selector: 'app-dialog-cruce',
  templateUrl: './dialog-cruce.component.html',
  styleUrls: ['./dialog-cruce.component.css']
})
export class DialogCruceComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  public tramoSelected!: Tramo;
  public calles: Calle[]|undefined;
 // filteredOptionsCrucePrimeraCalle!: Observable<Tramo[]>;
  filteredOptionsCruceSegundaCalle!: Observable<Tramo[]>;
  public formBuscador!: FormGroup;
  displayedColumns: string[] = ['ciudad', 'vereda', 'desde','hasta','circuito','id_tramo','observacion','tipoCalle'];
  dataSourceTramos = new MatTableDataSource<Tramo>(); 
  constructor(
    public dialogRef: MatDialogRef<DialogCruceComponent>,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private serviceDialog: DialogService,
    private serviceBuscadorCircuitos:BuscadorCircuitosService,
    private _alertSweetAlert: SweetAlertService,
    @Inject(MAT_DIALOG_DATA) public data: ModalParams
  ) {

    

    
   }
  
    
  displayTramo(tramo: Tramo): string {
    
    return tramo && (tramo?.numero+" "+tramo?.nombrecall+" "+tramo.tipo);
   
  }


  submit(){
    if (this.formBuscador.invalid) {
      console.log("no sigue");
      return;
  }

  
  let calle1:Calle = this.formBuscador.get('primeraCalle')!.value;
  let calle2:Calle = this.formBuscador.get('segundaCalle')!.value;
  this.listTramoConCruces(calle1,calle2);

  }

  get primeraCalle_t() {
    let tramo: Tramo;
    tramo = this.formBuscador.get('primeraCalle')?.value;
    return tramo?.nombrecall+" "+tramo?.numero+tramo?.tipo
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  clickSelectPrimeraCalle(){
    this.formBuscador.get('primeraCalle')?.setValue("");
  }

  clickSelectSegundaCalle(){
    this.formBuscador.get('segundaCalle')?.setValue("");
  }

  private _filterTramo(name: string): Calle[] {
    const filterValue = name.toLowerCase();
    const filterNombreCall = this.calles!.filter(option => option.nombrecall.toLowerCase().substring(0,filterValue.length) == filterValue);
    const filterNumber =this.calles!.filter(option => option.numero.toLowerCase().substring(0,filterValue.length) == filterValue);
    const result = filterNombreCall.concat(filterNumber);
    return result;
  }

  listTramoPorPartido(id_seccion:string){
    this.spinner.show();
    this.serviceBuscadorCircuitos.listarTramosPorIdSeccion(id_seccion).subscribe({
      next: (data:any[]) => {
        this.tramoSelected = data[0];
        this.dataSourceTramos.data =  data;
        this.dataSourceTramos.sort = this.sort;
        this.dataSourceTramos.paginator =this.paginator;
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

  listarCallerPorSeccion(idTramo:string){
    this.spinner.show();
    this.serviceDialog.listCalles(idTramo).subscribe({
      next: (data:any[]) => {
        this.calles = data;
        /*
        this.filteredOptionsCrucePrimeraCalle = this.formBuscador.get("primeraCalle")!.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : (value.nombrecall==""?(value.numero):value.nombrecall) )),
          map(nombre => (nombre ? this._filterTramo(nombre) : data!.slice())),
        );
        */
        this.filteredOptionsCruceSegundaCalle = this.formBuscador.get("segundaCalle")!.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : (value.nombrecall==""?(value.numero):value.nombrecall) )),
          map(nombre => (nombre ? this._filterTramo(nombre) : data!.slice())),
        );
      },
      error: (e) => {
        this._alertSweetAlert.errorAlert("Ha ocurrido un error!");
        this.spinner.hide();
      },
      complete: () => {
      
      }  
  });
  }

  listTramoConCruces(primeraCalle:Calle,segundaCalle:Calle){
    this.spinner.show();
    this.serviceDialog.listTramoConCruces(this.data.partidoSelected.id,primeraCalle.numero,primeraCalle.nombrecall,segundaCalle.numero,segundaCalle.nombrecall).subscribe({
      next: (data:any[]) => {
        this.tramoSelected = data[0];
        this.dataSourceTramos.data =  data;
        this.dataSourceTramos.sort = this.sort;
        this.dataSourceTramos.paginator =this.paginator;
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

  clickElement = function (element: { id_tramo: string; }) {
    document.getElementById(`id_tramo-${element.id_tramo}`)!.classList.remove("truncate-text");
  }

  clickRowElement(tramo: Tramo) {
    this.tramoSelected = tramo;
  }


  ngOnInit(): void {
    this.formBuscador = this!.formBuilder.group({

      primeraCalle: ['', [Validators.required]],
      segundaCalle: ['', [Validators.required]],
      
    });
    this.formBuscador.get('primeraCalle')?.setValue(this.data.tramoSelected);
 

  this.listarCallerPorSeccion(this.data.partidoSelected.id);
  this.listTramoPorPartido(this.data.partidoSelected.id);


 
  }

}
