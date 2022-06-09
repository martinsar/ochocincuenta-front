import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //empresaId = new EventEmitter<number>(true);
  //empresaMarkAsTouched = new EventEmitter<boolean>(true);
  partidoMarkAsTouched = new EventEmitter<boolean>(true);
  //sweetAlertConfirm = new EventEmitter<boolean>(true);
  constructor() { }
}
