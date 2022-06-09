import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicService }  from 'src/app/_services/public.service';
import { SweetAlertService } from 'src/app/_services/sweet-alert.service';
import { NgxSpinnerService } from "ngx-spinner";

import { AuthService } from 'src/app/_services/auth.service';
import { Usuario } from 'src/app/_models/usuario';
import { Rol } from 'src/app/_models/rol';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl!: string;
  error = '';
  loginForm: FormGroup;
  private enabled = false;
  private userConst = false;
  //private veterinarian: Veterinarian;
  constructor(
   
    private router: Router,
    private fb: FormBuilder,
    //private authenticationService: AuthenticationService,
    private servicePublic: PublicService,
    private _alertSweetAlert: SweetAlertService,
    private spinner: NgxSpinnerService,
    private authenticationService: AuthService
  ) {
    this.loginForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });

    
 
  }

   get f() { return this.loginForm.controls; }

  onSubmit() {
 
    console.log('entro al onSubmit');  
    
    
    this.submitted = true;

    // stop here if form is invalid
    
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.servicePublic.login(this.loginForm.get('email')!.value,this.loginForm.get('password')!.value).subscribe({
      next: (data:any) => {
        if(data.success==true){
          console.log("login ",data);
          let userData: Usuario;
          userData =data.user;
          if(userData.bl_baja == 1){
            this.error = 'usuario bloqueado';
          }else{
            let usuario = new Usuario(userData)
            this.servicePublic.rolUsuario(usuario.id!).subscribe({
              next: (rol:Array<Rol>) => {
                usuario.roles =rol;
                this.authenticationService.nuevoUsuario(usuario);
                this.authenticationService.emitirCambiarEstadoDeSesion(true);
                this.router.navigateByUrl('/circuitos/buscarCircuitos');
                
              },
              error: (e) =>{
                this._alertSweetAlert.errorAlert(e.error.message);
              },
              complete: () => {
                  
              }
          });
        

            
           
          }
          
        }else{
          this.error = 'usuario/contraseña incorrecta';
        }
        
      },
      error: (e) =>{
        console.log("error loging ",e);
        this._alertSweetAlert.errorAlert("Ha ocurrido un error!");
        this.spinner.hide();
        this.loading = false;;
      },
      complete: () => {
        this.loading = false;
      }
  });

  

  /*
    this.servicePublic.login(this.loginForm.get('email')!.value,this.loginForm.get('password')!.value)
        .subscribe(
            data => {
              if(data != undefined){
                console.log('valor data: ',data);
                let userConst: User;
               userConst = data;
               localStorage.setItem("user",JSON.stringify(userConst));
               console.log('localStorage.getItem("user") login ',localStorage.getItem("user"));
               
               console.log('userConst.rol.name ',userConst.rol.name);
                if(userConst.rol.name =='Veterinary'){
                  this.serviceVeterinarian.getById(userConst.id).subscribe(
                    resultVeterinarian=>{
                            this.veterinarian = resultVeterinarian;
                            this.enabled = resultVeterinarian.enabled;
                            if(this.enabled){
                              this.loading = false;
                              this.router.navigate(['/perfil']);
                            }else {
                                    this.loading = false;
                                    this.error = 'el usuario '+ this.veterinarian.lastName +' se encuentra bloqueado';
                                    setTimeout(()=>{
                                        this.error = null;
                                    },6000);
                                  }   
                  },                
                    errorResultVeterinarian=>{
                           console.log('errorResultVeterinarian ',errorResultVeterinarian);
                    }
                  );
                }else {
                  // si entro por acá es porque es otro usuario no veterinario
                  this.loading = false;
                  this.router.navigate(['/perfil']);
                }
                
                
              }else {
                    this.loading = false;
                    this.error = 'el usuario no existe';
                    setTimeout(()=>{
                      this.error = null;
                    },6000);
                  }
              
              
             
              },
             error =>{
                this.loading = false;
                this.error = 'usuario/contraseña incorrecta';
                setTimeout(()=>{
                  this.error = null;
                },6000);
              },
        );
       */             //

  }


  parseJwt(token:string) {
    const base64Url = token.split('.')[1];
    if (base64Url !== undefined) {
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } else {
      return null;
    }

  }
  ngOnInit(): void {
    this.loginForm.get('email')?.setValue("delegado@delegado.com");
    this.loginForm.get('password')?.setValue("dnt2021");
  }

}
