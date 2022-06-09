import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
	constructor(private router: Router, private authService: AuthService) {}
	public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (this.authService.isAuthenticated()) {
			const routeData = route.data;

			console.log("route.data ",routeData["roles"]);
		
	console.log('this.authService.getTieneRolForArray(routeData["roles"])) ',this.authService.getTieneRolForArray(routeData["roles"]));
			if (routeData["roles"] && (!this.authService.getTieneRolForArray(routeData["roles"]))) {
				// role not authorised so redirect to home page
				this.router.navigate(['accessDeniedComponent']);
				return false;
			}

			// authorised so return true
			return true;
		}
		// not logged in so redirect to login page with the return url
		window.location.href = 'https://dev-sia.cnrt.gob.ar/oidc-login?login_challenge=bc02bd0340f849bc9ce2560a2c08c8e6';
		return false;
		
	}
}
/*
	public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (!this.authService.isAuthenticated()) {
			window.open("https://servicios.cnrt.gob.ar/", "_blank");
			return false;
		}
		return true;
	}
	*/

