import { Injectable } from '@angular/core';
// import {AuthService} from '../services/auth.service';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http'
import { Observable } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class InterceptService {
   //     public token = localStorage.getItem('token');
   //
    public token: string | undefined;

  constructor(/*private authService: AuthService*/) {


   }
  // intercept request and add token

  intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
   // localStorage.getItem('token')
    // modify request
    // console.log('que tiene localStorage interceptor');

    if (localStorage.getItem('token') != null) {
      this.token = ("Bearer "+localStorage.getItem('token')||"");
    } else {
      this.token = 'sin token';
       }
    request = request.clone({
      setHeaders: {

        Authorization: this.token
      }
    });

      


    return next.handle(request);

  };

}
