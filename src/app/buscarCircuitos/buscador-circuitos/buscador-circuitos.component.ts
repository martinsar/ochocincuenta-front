import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import { Partido } from 'src/app/_models/partido';
import { Tramo }  from 'src/app/_models/tramo';
import { Tipo } from 'src/app/_models/tipo';
import {Observable} from 'rxjs';
import { BuscadorCircuitosService } from 'src/app/_services/buscador-circuitos.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from "ngx-spinner";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogVerCirccuitosComponent } from '../dialog/circuitos/dialog-ver-circuitos.component';
import { DialogDepartamentosComponent } from '../dialog/dialog-departamentos/dialog-departamentos.component';
import { DialogLocalidadesComponent } from '../dialog/dialog-localidades/dialog-localidades.component';
import { DialogEquivalenciaComponent } from '../dialog/dialog-equivalencia/dialog-equivalencia.component';
import { DialogCodigosPostalesComponent } from '../dialog/dialog-codigos-postales/dialog-codigos-postales.component';
import { DialogOsrComponent } from '../dialog/dialog-osr/dialog-osr.component';
import { DialogCruceComponent } from '../dialog/dialog-cruce/dialog-cruce.component';
import { DialogModificarTramoComponent } from '../dialog/dialog-modificar-tramo/dialog-modificar-tramo.component';
import { DialogCrearCalleComponent } from '../dialog/dialog-crear-calle/dialog-crear-calle.component';
import  { ModalParams } from 'src/app/_models/modalParams';
import { AntPos } from 'src/app/_models/antPos';
import { SweetAlertService } from 'src/app/_services/sweet-alert.service';
import {map, startWith} from 'rxjs/operators';
import { DialogService } from 'src/app/_services/dialog.service';
import { Calle } from 'src/app/_models/calle';
import { Directive, ElementRef } from '@angular/core'; 
import { AuthService } from 'src/app/_services/auth.service';
import { Usuario } from 'src/app/_models/usuario';
export interface PeriodicElement {
  ciudad: string;
  vereda: string;
  desde: number;
  hasta: number;
  circuito:number;
}

export interface User {
  name: string;
}


@Component({
  selector: 'app-buscador-circuitos',
  templateUrl: './buscador-circuitos.component.html',
  styleUrls: ['./buscador-circuitos.component.css']
})
export class BuscadorCircuitosComponent implements OnInit {
 
 
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;


  public currentUser: Usuario | undefined;
  public tipo_calle_selected: string | undefined;
  public partidos: Partido[] | undefined;
  public tipos: Tipo[] | undefined;// = ['Todos','Calle', 'Avenida'];
  public resourcesLoaded: boolean = false;
  public anterior:AntPos= new AntPos();
  public posterior:AntPos= new AntPos();
  public tramoSelected: Tramo | undefined;


  public formBuscador2!: FormGroup;

//nuevo
  paginaCodigoActual:number=0;
 
  
  arregloTramosPorCodigo = new Array<Array<Tramo>>();

  filteredOptionsCalles!: Observable<Tramo[]>;
  public calles: Calle[]|undefined;
  public calleOrigin: Calle[] | undefined;// lo uso para volver del filtro de calles;
//fin nuevo

  filteredOptionsPartido!: Observable<Partido[]>;

 

  displayedColumns: string[] = ['ciudad', 'vereda', 'desde','hasta','circuito','observacion','tipoCalle','nombrecall','codigo','id_tramo','acciones'];

  dataSourceTramos = new MatTableDataSource<Tramo>(); 


 
  constructor(
    private serviceBuscadorCircuitos:BuscadorCircuitosService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private _alertSweetAlert: SweetAlertService,
    private formBuilder: FormBuilder,
    private serviceDialog: DialogService,
    public element: ElementRef<HTMLElement>,
    public serviceAuth:AuthService
    ) { }






  
 
  get f(){
  
    return this.formBuscador2.controls;
  }

// comentado al extraer el auto complete
 // clickSelectPartido(){
 //   this.formBuscador2.get('partido')?.setValue("");
 // }

// comentado al extraer el auto complete
//  displayFn(partido: Partido): string {
//    return partido && partido.detalle_seccion ? partido.detalle_seccion : '';
//  }

 // changePartidos(event:any){
 //   let partido = event.option.value;
//    this.formBuscador2.get('calle')?.setValue("");
//    this.listarCallerPorSeccion(partido.id);
 //   let calle: Calle = this.formBuscador2.get("calle")!.value;
//    this.buscar(partido.id,calle.nombrecall,calle.numero,this.formBuscador2.get('tipoBusqueda')!.value,this.formBuscador2.get('tipoCalle')!.value);
 // }
 
 // private _filterPartido(name: string): Partido[] {
 //   const filterValue = name.toLowerCase();
 //   return this.partidos!.filter(option => option.detalle_seccion.toLowerCase().substring(0,filterValue.length) == filterValue);
 // }

/*
  //filtro datatable material
  applyFilterBusqueda(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTramos.filter = filterValue.trim().toLowerCase();
    let primeroTramo= this.dataSourceTramos.filteredData[0];
    this.formBuscador2.get('nombre_calle_selected')?.setValue(primeroTramo?.nombrecall==""?primeroTramo?.numero:primeroTramo?.nombrecall);
    this.formBuscador2.get('detalle_observaciones')?.setValue(primeroTramo?.observacion);
    this.tramoSelected = primeroTramo;
    this.tipo_calle_selected = primeroTramo.tipo;
    this.dataSourceTramos.paginator?.firstPage();
  }

  
*/
  clickFilter(){
    this.formBuscador2.get('calle')?.setValue(undefined);
  }
 

 


  get partidoSelected() {
    let partido: Partido;
    partido = this.formBuscador2.get('partido')?.value;
    return partido!=undefined?partido.id:"";
  }
 
  submit2(){
    JSON.stringify(this.formBuscador2.get('partido')?.value)
    if (this.formBuscador2.invalid) {
      console.log("no sigue");
      return;
  }
  console.log("sigue");
  }
// comentado extraido
/*
  listarSecciones(){
    this.spinner.show();
    this.serviceBuscadorCircuitos.listarSerrciones().subscribe({
      next: (data:any[]) => {
        this.partidos = data;
        this.filteredOptionsPartido = this.formBuscador2.get("partido")!.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value.detalle_seccion)),
          map(detalle_seccion => (detalle_seccion ? this._filterPartido(detalle_seccion) : this.partidos!.slice())),
        );
        let primero: Partido;
        primero = data[0];
        this.formBuscador2.get('partido')?.setValue(primero);
       // this.listarTramosPorIdSeccion(primero.id);
       this.listarCallerPorSeccion(primero.id);
       let calle: Calle = this.formBuscador2.get('calle')!.value
       this.buscar(primero.id,calle.nombrecall,calle.numero,this.formBuscador2.get('tipoBusqueda')!.value,this.formBuscador2.get('tipoCalle')!.value);
      },
      error: (e) =>{
        this._alertSweetAlert.errorAlert("Ha ocurrido un error!");
        this.spinner.hide();
      },
      complete: () => {
        
      }
  });
  }
*/
  cargarPrimerPartido(){
    this.spinner.show();
    this.serviceBuscadorCircuitos.listarSerrciones().subscribe({
      next: (data:any[]) => {
        this.partidos = data;
      
        let primero: Partido;
        primero = data[0];
        this.formBuscador2.get('partido')?.setValue(primero);
       // this.listarTramosPorIdSeccion(primero.id);
       this.listarCallerPorSeccion(primero.id);
       let calle: Calle = this.formBuscador2.get('calle')!.value
       this.buscar(primero.id,calle.nombrecall,calle.numero,this.formBuscador2.get('tipoBusqueda')!.value,this.formBuscador2.get('tipoCalle')!.value);
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


/*  filtros del lado del cliente

  filtrarBusquedaPorTipo(tramos:any[],tipoCalle:string){
    return tramos.filter(tramo => tramo.tipo == tipoCalle);
  }

  filtroAleatorio(){
    this.dataSourceTramos.filterPredicate = function(data: any, filterValue: string) {
      var filterNombreCall =data.nombrecall.trim()
      .toLocaleLowerCase().indexOf(filterValue.trim().toLocaleLowerCase()) >= 0;
      var filterCalle =data.numero.trim()
      .toLocaleLowerCase().indexOf(filterValue.trim().toLocaleLowerCase()) >= 0;
      return (filterNombreCall||filterCalle);
    };
  }

  filtroSecuencial(){
    this.dataSourceTramos.filterPredicate = (data: any, filter: string) => {
      var filterNombreCall = data.nombrecall.trim()
      .toLocaleLowerCase() === filter.trim().toLocaleLowerCase();

      var filterCalle = data.numero.trim()
      .toLocaleLowerCase() === filter.trim().toLocaleLowerCase();
      return (filterNombreCall||filterCalle);
    };
  }

  listarTramosPorIdSeccion(idSeccion: string){
    this.listarCallerPorSeccion(idSeccion);
    this.serviceBuscadorCircuitos.listarTramosPorIdSeccion(idSeccion).subscribe({
      next: (data:any[]) => {
          //////////
    
        switch(this.formBuscador2.get('tipoBusqueda')!.value) {
          case "1":
            this.filtroAleatorio();
            this.dataSourceTramos.data =  data;
            break;
          case "2":
            this.filtroSecuencial();
            this.dataSourceTramos.data =  data;
            break;
          case "3":
            let tipoCalle: Tipo = this.formBuscador2.get('tipoCalle')!.value
            this.dataSourceTramos.data =this.filtrarBusquedaPorTipo(data,tipoCalle.tipo);
             break;
          default:
            this.filtroAleatorio()
           
        }


    
        if(this.formBuscador2.get('tipoCalle')!.value!="Todos"){
          this.dataSourceTramos.data =this.filtrarBusquedaPorTipo(this.dataSourceTramos.data,this.formBuscador2.get('tipoCalle')!.value);
        }
    
        if(this.formBuscador2.get('tipoBusqueda')!.value == "2"){
          this.filtroSecuencial();
        }else{
          this.filtroAleatorio()
        }
   
        //
        this.tipo_calle_selected = data[0]?.tipo;
        
        this.anterior.view_codigo=data[0]?.anterior;
        this.anterior.codigo=data[0].coda;
        this.posterior.view_codigo =data[0]?.posterior;
        this.posterior.codigo = data[0].codp;
        this.formBuscador2.get('nombre_calle_selected')?.setValue(data[0]?.nombrecall==""?data[0]?.numero:data[0]?.nombrecall);
        this.formBuscador2.get('detalle_observaciones')?.setValue(data[0]?.observacion);
        this.tramoSelected =  this.dataSourceTramos.filteredData[0];
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
  */
  listarTipos(){
    this.spinner.show();
    this.serviceBuscadorCircuitos.listarTipos().subscribe({
      next: (data:any[]) => {
        this.tipos = data;
        this.formBuscador2.get('tipoCalle')?.setValue(data[0]);
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
    this.formBuscador2.get('detalle_observaciones')?.setValue(tramo.observacion);
    this.tipo_calle_selected = tramo.tipo;
    this.formBuscador2.get('nombre_calle_selected')?.setValue(tramo.nombrecall==""?tramo.numero:tramo.nombrecall);
    this.anterior.codigo = tramo.coda;
    this.anterior.view_codigo = tramo.anterior;
    this.posterior.codigo = tramo.codp;
    this.posterior.view_codigo = tramo.posterior;
    this.tramoSelected = tramo;
  }


  changeTipoBusqueda(tipoBusqueda: string) {
    if(tipoBusqueda != 'Tipo'){
      let partido:Partido = this.formBuscador2.get("partido")!.value;
      let calle: Calle = this.formBuscador2.get("calle")!.value;
      this.listarCallerPorSeccion(partido.id);
      this.buscar(partido.id,calle.nombrecall,calle.numero,this.formBuscador2.get('tipoBusqueda')!.value,this.formBuscador2.get('tipoCalle')!.value);
    }
    
   
 
}

changeTipoCalle(tipoBusqueda:string){
  // let partido:Partido = this.formBuscador2.get('partido')!.value;
   let partido:Partido = this.formBuscador2.get('partido')!.value;
   let calle:Calle = this.formBuscador2.get('calle')!.value;

   this.buscar(partido.id,calle.nombrecall,calle.numero,this.formBuscador2.get('tipoBusqueda')!.value,this.formBuscador2.get('tipoCalle')!.value);
 
 }

  verCircuitos(): void {
   let modalParam = new ModalParams(this.partidos!,this.formBuscador2.get("partido")!.value,[]); 
    const dialogRef = this.dialog.open(DialogVerCirccuitosComponent, {
   // width: '50%',
    data: modalParam,
  });

  dialogRef.afterClosed().subscribe(result => {
  
  });
}  


verDepartamentos(): void {
  const dialogRef = this.dialog.open(DialogDepartamentosComponent, {
    // width: '50%',
    
});

dialogRef.afterClosed().subscribe(result => {

});
}


verLocalidades(): void {
  let modalParam = new ModalParams(this.partidos!,this.formBuscador2.get("partido")!.value,[],this.tramoSelected);
  const dialogRef = this.dialog.open(DialogLocalidadesComponent, {
 // width: '50%',
  data: modalParam,
});


dialogRef.afterClosed().subscribe(result => {

});
}

verCodigosPostales(): void {
  let modalParam = new ModalParams(this.partidos!,this.formBuscador2.get("partido")!.value,[]);
  const dialogRef = this.dialog.open(DialogCodigosPostalesComponent, {
    data: modalParam,
    
});

dialogRef.afterClosed().subscribe(result => {

});
}

verCodigosEquivalencias(): void {
  let modalParam = new ModalParams(this.partidos!,this.formBuscador2.get("partido")!.value,[]);
  const dialogRef = this.dialog.open(DialogEquivalenciaComponent, {
    data: modalParam,
    
});

dialogRef.afterClosed().subscribe(result => {

});
}

verOsr(): void {
  let modalParam = new ModalParams(this.partidos!,this.formBuscador2.get("partido")!.value,[]);
  const dialogRef = this.dialog.open(DialogOsrComponent, {
    data: modalParam,
    
});

dialogRef.afterClosed().subscribe(result => {

});
}

verCruce(): void {
  let modalParam = new ModalParams(this.partidos!,this.formBuscador2.get("partido")!.value,this.dataSourceTramos.data,this.tramoSelected);
  const dialogRef = this.dialog.open(DialogCruceComponent, {
    data: modalParam,
    
});

dialogRef.afterClosed().subscribe(result => {

});
}

moficarTramo(tramo:Tramo) {
  
  let modalParam = new ModalParams(this.partidos!,this.formBuscador2.get("partido")!.value,this.dataSourceTramos.data,this.tramoSelected);
  const dialogRef = this.dialog.open(DialogModificarTramoComponent, {
    data: modalParam,
    disableClose: true 
    
});

dialogRef.afterClosed().subscribe(tramo => {
    let partido: Partido = this.formBuscador2.get('partido')!.value;
    this.buscar(partido.id,tramo.nombrecall,tramo.numero,this.formBuscador2.get('tipoBusqueda')!.value,this.formBuscador2.get('tipoCalle')!.value);
});
}

verAntPost(antPos:AntPos){
  //el every itera el arreglo hasta que retornemos false;
  let tramo_result:Tramo|undefined;  
  this.dataSourceTramos.data.every(tramo => {
    if (tramo.codigo == antPos.codigo) {
      tramo_result =tramo;
      return false;
    }
    return true;
  });

  if(tramo_result!= undefined){
    this.posterior= new AntPos();
    this.anterior= new AntPos();
    this.formBuscador2.get('calle')?.setValue(tramo_result.numero?tramo_result.numero:tramo_result.nombrecall!.substring(3).trim().toLowerCase());
    this.dataSourceTramos.filter = tramo_result.numero?tramo_result.numero:tramo_result.nombrecall!.substring(3).trim().toLowerCase();
  }else{
    this._alertSweetAlert.errorAlert("No existe más información de este tramo!");
  }
  
}

  buscar(idSeccion:string,nombreCalle:string,numeroCalle:string,filtro:string,tipo:string){
    this.paginaCodigoActual=0;
    this.spinner.show();
      this.serviceBuscadorCircuitos.listarTramosPorCodigo(idSeccion,nombreCalle,numeroCalle,filtro,tipo).subscribe({
        next: (data:Array<Array<Tramo>>) => {
          console.log("longitud ",data.length);
          this.arregloTramosPorCodigo=data;
          this.dataSourceTramos.data = data[0];
          this.dataSourceTramos.sort = this.sort;
          this.dataSourceTramos.paginator =this.paginator;





          if(data!=undefined){
            this.anterior.view_codigo=data[0][0]?.anterior;
            this.anterior.codigo=data[0][0]?.coda;
            this.posterior.view_codigo =data[0][0]?.posterior;
            this.posterior.codigo = data[0][0].codp;
            this.formBuscador2.get('nombre_calle_selected')?.setValue(data[0][0]?.nombrecall==""?data[0][0]?.numero:data[0][0]?.nombrecall);
            this.formBuscador2.get('detalle_observaciones')?.setValue(data[0][0]?.observacion);
            this.tramoSelected =  data[0][0];
          }
        

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

  siguienteCodigo(){
    this.paginaCodigoActual++;
    if((this.paginaCodigoActual)<this.arregloTramosPorCodigo.length){
          let arregloTramosPorCodigoAux = this.arregloTramosPorCodigo[this.paginaCodigoActual];
          this.dataSourceTramos.data = arregloTramosPorCodigoAux;
          this.dataSourceTramos.sort = this.sort;
          this.dataSourceTramos.paginator =this.paginator;


          this.anterior.view_codigo=arregloTramosPorCodigoAux[0]?.anterior;
          this.anterior.codigo=arregloTramosPorCodigoAux[0]?.coda;
          this.posterior.view_codigo =arregloTramosPorCodigoAux[0]?.posterior;
          this.posterior.codigo = arregloTramosPorCodigoAux[0].codp;
          this.formBuscador2.get('nombre_calle_selected')?.setValue(arregloTramosPorCodigoAux[0]?.nombrecall==""?arregloTramosPorCodigoAux[0]?.numero:arregloTramosPorCodigoAux[0]?.nombrecall);
          this.formBuscador2.get('detalle_observaciones')?.setValue(arregloTramosPorCodigoAux[0]?.observacion);
          this.tramoSelected =  arregloTramosPorCodigoAux[0];
    }
  }

codigoAnterior(){
    this.paginaCodigoActual--;
    if((this.paginaCodigoActual)>=0){
          let arregloTramosPorCodigoAux = this.arregloTramosPorCodigo[this.paginaCodigoActual];
          this.dataSourceTramos.data = arregloTramosPorCodigoAux;
          this.dataSourceTramos.sort = this.sort;
          this.dataSourceTramos.paginator =this.paginator;

          this.anterior.view_codigo=arregloTramosPorCodigoAux[0]?.anterior;
          this.anterior.codigo=arregloTramosPorCodigoAux[0]?.coda;
          this.posterior.view_codigo =arregloTramosPorCodigoAux[0]?.posterior;
          this.posterior.codigo = arregloTramosPorCodigoAux[0].codp;
          this.formBuscador2.get('nombre_calle_selected')?.setValue(arregloTramosPorCodigoAux[0]?.nombrecall==""?arregloTramosPorCodigoAux[0]?.numero:arregloTramosPorCodigoAux[0]?.nombrecall);
          this.formBuscador2.get('detalle_observaciones')?.setValue(arregloTramosPorCodigoAux[0]?.observacion);
          this.tramoSelected =  arregloTramosPorCodigoAux[0];
    }
  }
  private _filterTramo(name: string): Calle[] {
    if(this.formBuscador2.get('tipoBusqueda')!.value=="Tipo"){
      this.calles = this.calleOrigin;
      let calle: Calle = this.formBuscador2.get("tipoCalle")!.value;
      this.calles  = this.calles!.filter(callePos => callePos.tipo == calle.tipo);
     
    }else{
      this.calles = this.calleOrigin;
    }
    let filterNumber;
    let filterNombreCall;
    const filterValue = name.toLowerCase().trim();
    if(this.formBuscador2.get('tipoBusqueda')!.value=="Secuencial"){
      filterNumber = this.calles!.filter(option => option.numero?.toLowerCase().substring(0,filterValue.length) == filterValue);
      filterNombreCall = this.calles!.filter(option => option.nombrecall?.toLowerCase().substring(0,filterValue.length) == filterValue);
    }else{
      let expresion = new RegExp(`${filterValue}.*`, "i")
      filterNumber = this.calles!.filter(option => expresion.test(option?.numero.toLowerCase()));
      filterNombreCall = this.calles!.filter(option => expresion.test(option?.nombrecall.toLowerCase()));
    }
    const result = filterNombreCall.concat(filterNumber);
    return result;
  }


  changePartido(partido:Partido){
   
    this.formBuscador2.get("partido")!.setValue(partido);
    this.formBuscador2.get('calle')?.setValue("");
    this.formBuscador2.get('nombre_calle_selected')?.setValue("");
    this.listarCallerPorSeccion(partido.id);
     let calle: Calle = this.formBuscador2.get("calle")!.value;
    this.buscar(partido.id,calle.nombrecall,calle.numero,this.formBuscador2.get('tipoBusqueda')!.value,this.formBuscador2.get('tipoCalle')!.value);
  }

  listarCallerPorSeccion(idTramo:string){
    this.spinner.show();
    this.serviceDialog.listCalles(idTramo).subscribe({
      next: (data:any[]) => {
        this.calles = data;
        this.calleOrigin = data;
        /*
        this.filteredOptionsCrucePrimeraCalle = this.formBuscador.get("primeraCalle")!.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : (value.nombrecall==""?(value.numero):value.nombrecall) )),
          map(nombre => (nombre ? this._filterTramo(nombre) : data!.slice())),
        );
        */
        this.filteredOptionsCalles = this.formBuscador2.get("calle")!.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : (value?.nombrecall==""?(value.numero):value?.nombrecall) )),
          map(nombre => (nombre ? this._filterTramo(nombre) : data!.slice())),
        );
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



selectCalle(event:any){
  let calle:Calle = event.option.value;
  let partido:Partido;
  partido = this.formBuscador2.get('partido')!.value;
  this.buscar(partido.id,calle.nombrecall,calle.numero,this.formBuscador2.get('tipoBusqueda')!.value,this.formBuscador2.get('tipoCalle')!.value);
}

  displayTramo(tramo: Tramo): string {
    
    return tramo && (tramo?.numero+" "+tramo?.nombrecall+" "+tramo.tipo);
   
  }

  clickSelectCalle(){
    this.formBuscador2.get('calle')?.setValue("");
  }

  searchCalle(event:any){
 
  //s uso esta función para que al apretar enter en buscar calle no se vaya a cruces 
    if (event.key === "Enter") {
    console.log(event);
    event.returnValue = false; 
  }


  }

  bajaTramo(tramo:Tramo){
    this._alertSweetAlert.confirmAlert("Desea eliminar el tramo",  (confirm: any) => {
      if (confirm) {
        this.spinner.show();
        this.serviceBuscadorCircuitos.bajaTramo(tramo.id_tramo).subscribe({
          next: (data:any) => {
            let calle:Calle = this.formBuscador2.get('calle')!.value;
            let partido:Partido = this.formBuscador2.get('partido')!.value;
            this.buscar(partido.id,calle.nombrecall,calle.numero,this.formBuscador2.get('tipoBusqueda')!.value,this.formBuscador2.get('tipoCalle')!.value);
            this._alertSweetAlert.sucessAlert(data.message);
          },
          error: (e) =>{
            this._alertSweetAlert.errorAlert(e.error.message);
            this.spinner.hide();
          },
          complete: () => {
            this.spinner.hide();
          }
      });

    
      }
    });
  }

  crearCalle(): void {
    
    let modalParam = new ModalParams(this.partidos!,this.formBuscador2.get("partido")!.value,this.dataSourceTramos.data,this.tramoSelected);
    const dialogRef = this.dialog.open(DialogCrearCalleComponent, {
      data: modalParam,
      disableClose: true 
    });
    dialogRef.afterClosed().subscribe(result => {
      let partido:Partido= this.formBuscador2.get('partido')!.value;
      this.listarCallerPorSeccion(partido.id);
      let calle:Calle = this.formBuscador2.get('calle')!.value;
      this.buscar(partido.id,calle.nombrecall,calle.numero,this.formBuscador2.get('tipoBusqueda')!.value,this.formBuscador2.get('tipoCalle')!.value);
    });
  }

  ngOnInit(): void {
  
    this.serviceAuth.currentUser.subscribe(x => this.currentUser = x);
    
    this.formBuscador2 = this!.formBuilder.group({

      calle: ['', [Validators.required]],
      tipoBusqueda: ['', [Validators.required]],
      tipoCalle: ['', [Validators.required]],
      nombre_calle_selected: ['', [Validators.required]],
      detalle_observaciones: ['', [Validators.required]],
      partido: ['', [Validators.required]],
    });
    this.listarTipos();
    this.cargarPrimerPartido();
    this.formBuscador2.get('tipoBusqueda')?.setValue('Secuencial');
   
   
  }


}
