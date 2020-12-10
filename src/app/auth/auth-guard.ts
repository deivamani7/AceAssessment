import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const loggedInUser = this.authService.loggedInUserValue;
        //if userdata is available, then it means user has logged in and it allows routing to home page
        if (this.authService.isloggedIn(loggedInUser)) {
            return true;
        }

        // if not logged in, redirect to login page with the return url
        this.router.navigate(['/login']);
        return false;
    }
}