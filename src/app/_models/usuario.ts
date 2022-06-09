import { Rol } from "src/app/_models/rol";
export class Usuario{
  constructor(user?:Usuario){
    if(user){
      this.apellido = user.apellido;
      this.bl_baja = user.bl_baja;
      this.created_at = user.created_at;
      this.dni = user.dni;
      this.email = user.email;
      this.id = user.id;
      this.login = user.login;
      this.name = user.name;
      this.nombre = user.nombre;
      this.tel = user.tel;
      this.token = user.token;
      this.updated_at = user.updated_at;
    }
    
  }

 
    id?:string;
    login?:string;
    tipo?: string;
    roles?: Rol[];
    apellido?:string;
    bl_baja?:number;
    dni?:number;
    created_at?:string;
    nombre?: string;
    name?:string;
    email?:string;
    tel?:string;
    token?:string;
    updated_at?:string;
  }
  
