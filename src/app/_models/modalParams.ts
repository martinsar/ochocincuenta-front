import { Observable } from 'rxjs';
import { Partido } from './partido';
import { Tramo } from './tramo';
export class ModalParams{
   

    constructor(partidos: Partido[], partidoSelected:Partido,tramos:Tramo[],tramoSelected?: Tramo) {
        this.partidos = partidos;
        this.partidoSelected = partidoSelected;
        this.tramos = tramos;
        this.tramoSelected = tramoSelected;
    }
    partidos!: Partido[];
    partidoSelected!:Partido ;
    tramos!: Tramo[];
    tramoSelected?: Tramo;
  }
  
  