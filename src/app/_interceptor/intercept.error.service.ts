import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable, throwError } from 'rxjs';
  import { catchError, tap } from 'rxjs/operators';
  import { Router } from '@angular/router';
  import {  AuthService } from 'src/app/_services/auth.service';
  @Injectable()
  export class HttpErrorInterceptor implements HttpInterceptor {
     constructor(
        private serviceAuth:AuthService,
        private router: Router,
     ){
        
     } 
    intercept(
      request: HttpRequest<unknown>,
      next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
            if ([401, 403].indexOf(error.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                this.serviceAuth.logout();
                this.router.navigate(['/login']);
            }
             console.warn(
            'the interceptor has caught an error, process it here',
            error
          );
          return throwError(() => error);
        })
      );
    }
  }