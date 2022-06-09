import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/_models/usuario';
import { AuthService } from 'src/app/_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser!: Usuario;
  constructor(
    public serviceAuth:AuthService,
    private router: Router,
  ) { }
/*
  cerrarSession(){
    localStorage.clear();
    this.serviceAuth.emitirCambiarEstadoDeSesion(false);
    this.router.navigateByUrl('/login');
    
  }
  */
  cerrarSesion() {
    this.serviceAuth.logout();
    this.router.navigateByUrl('/login');
 

  }

  ngOnInit(): void {
    this.serviceAuth.currentUser.subscribe(x => this.currentUser = x);
   
  }

}
