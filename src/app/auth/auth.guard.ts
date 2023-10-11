import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable, map, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate { // cmd + click sul nome di qualcosa per leggere documentazione
    // UrlTree serve a poter redirezionare

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean| UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.authService.user.pipe(
            take(1), // si assicura che dopo aver ottenuto il valore si cancelli la sub a user
            map((user) => {
                const isAuth = !!user;
                if (isAuth) {
                    return true;
                }
                return this.router.createUrlTree(['/auth']);
                // return !!user;
            })
        ); // non subscribe perché la funzione è già un Obs
        // pipe() trasforma i user tramite map() e restituisce risultato boolean
        // !!user converte valori truish quali oggetti o qualsiasi cosa che non è null o undefined in true,
        // e valori null o undefined in false
    }
}