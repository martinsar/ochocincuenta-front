
import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
/*
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
  
   if(event?.code =='F5'){
    window.location.replace("http://5.80.0.30:8090/");
    event.returnValue = false; //ie
  }
}
*/
  title = '850';

  constructor(
    private router: Router
  ) {
   

  }


  ngOnInit(): void {

 
}
}
