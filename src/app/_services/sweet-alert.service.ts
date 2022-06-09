import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
//import { DataService } from '@auth/services/data.service';
@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor(
    //public serviceData: DataService,

  ) { }

  async sucessAlert(message: string){
    await Swal.fire('Bien!', message, 'success');
  }

  async errorAlert(message: string){
    await Swal.fire('Error!', message, 'error');
  }

  async warningAlert(message: string){
    await Swal.fire('Atención!', message, 'warning');
  }

  async basicMessage(message: string){
    await Swal.fire(message);
  }


  async confirmAlert (titulo: string, callback: Function){
    Swal.fire({
      title: titulo,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Confirmar`,
      denyButtonText: `No, gracias`,
    }).then((result) => {
      if (result.isConfirmed) {
       return callback(true)
    
      } else if (result.isDenied) {
        return callback(null);

      }
    })
  }
  async continuarAlert (titulo: string, callback: Function){
    Swal.fire({
      title: titulo,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
       return callback(true)
    
      } else if (result.isDenied) {
        return callback(null);

      }
    })
  }
  }
 