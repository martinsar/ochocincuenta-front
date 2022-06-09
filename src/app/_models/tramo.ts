export class Tramo{
   constructor(id_tramo:number,localidad:string,tipo:string, numero:string,
      nombrecall:string,coda:number,anterior:string, codp:number,posterior:string,vereda:string,
       desde: string,hasta: string, circuito: string,observacion: string,id_seccion?:string){
      this.id_tramo = id_tramo; 
      this.localidad = localidad;
      this.tipo = tipo;
      this.numero =  numero;
      this.nombrecall =  nombrecall;
      this.coda =  coda;
      this.anterior =anterior;
      this.codp = codp;
      this.posterior= posterior;
      this.vereda = vereda;
      this.desde =  desde;
      this.hasta = hasta;
      this.circuito= circuito;
      this.observacion=observacion;
      this.id_seccion=id_seccion;
   
   
   }

   id_tramo!:number;
   localidad!:string;
   tipo!:string;
   sge!:string;
   codigo!:number;
   numero!:string;
   nombrecall!:string;
   coda!:number;
   anterior!:string;
   codp!:number;
   posterior!:string;
   vereda!:string;
   desde!: string;
   hasta!: string;
   circuito!: string;
   observacion!: string;
   id_seccion?:string;
}

