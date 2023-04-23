import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SessionContext } from '@contexts/SessionContext';

@Injectable({
  providedIn: 'root'
})
class NotAuthGuardService {
  async canActivate(useSession: SessionContext, router: Router): Promise<boolean | UrlTree> {
    const isLogged = await useSession.getCurrentUser();

    if (isLogged) {
      return router.parseUrl('/tabs');
    }

    return true;
  }
}

export function canActivateUnauthenticated(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
  return inject(NotAuthGuardService).canActivate(inject(SessionContext), inject(Router));
}
