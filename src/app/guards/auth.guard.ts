import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { GlobalService } from "../services/global.service";

@Injectable({
    providedIn: "root",
})
export class AuthGuard implements CanActivate {
    isInitial: boolean = false;
    constructor(
        private global: GlobalService
    ) { }

    canActivate() {
        const currentUser: any = this.global.getStorage("userInfo");
        if (currentUser?.fullname || currentUser?.username || currentUser?.id) {
            this.global.user = currentUser;
            return true;
        } else {
            this.global.goToPage('/auth');
        }
        return false
    }
}