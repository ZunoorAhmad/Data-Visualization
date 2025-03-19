import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from '../services/global.service';

@Injectable({
    providedIn: 'root',
})
export class AdminGuard implements CanActivate {
    constructor(
        private router: Router,
        private global: GlobalService
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const userId = this.global.getStorage('userId');
        if (userId) {
            let user: any = this.global.getStorage('user');
            let authToken: any = this.global.getStorage('authToken');
            let userId: any = this.global.getStorage('userId');
            if (authToken) {
                this.global.authToken = authToken;
            }
            if (userId) {
                this.global.userId = userId;
            }
            if (user) {
                this.global.user = user;

                if (this.global.user.role == 'admin') {
                    return true;
                } else if (this.global.user.role == 'teacher') {
                    return this.router.createUrlTree(['/teacher']);
                } else if (this.global.user.role == 'student') {
                    return this.router.createUrlTree(['/student']);
                } else {
                    return this.router.createUrlTree(['/user']);
                }
            } else {
                return this.router.createUrlTree(['/auth']);
            }
        } else {
            return this.router.createUrlTree(['/user']);
        }
    }
}
