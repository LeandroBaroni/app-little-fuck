import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SessionContext } from '@contexts/SessionContext';
import { UserRepository } from '@repositories/user.repository';
import { ActionsService } from '@services/modals/actions.service';

@Injectable({
  providedIn: 'root'
})
class DisabledUserService {
  async canActivate(
    useSession: SessionContext,
    modalActionsService: ActionsService,
    userRepository: UserRepository
  ): Promise<boolean> {
    const { uid } = await useSession.getCurrentUser();

    if (uid) {
      const user = await userRepository.getById(uid);
      if (user?.status && user?.status !== 'ACTIVE') {
        modalActionsService.open(user?.status === 'INACTIVE');
      }
    }

    return true;
  }
}

export function checkDisabledUser(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
  return inject(DisabledUserService).canActivate(
    inject(SessionContext),
    inject(ActionsService),
    inject(UserRepository)
  );
}
