import { inject} from "@angular/core";
import { CanActivateChildFn, Router } from "@angular/router";
import { AuthService } from "./services/auth.services";

export const adminGuard: CanActivateChildFn = () =>{

    const router = inject(Router);
    const authService = inject(AuthService);
    if(!authService.estaLogado()){
        return router.createUrlTree(['/login']);
    }

    if(!authService.admin()){
        return router.createUrlTree(['/acesso-negado']);
    }

    return true;

}