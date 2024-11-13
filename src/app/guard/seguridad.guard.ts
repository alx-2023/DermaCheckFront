import { CanActivateFn } from '@angular/router';

export const seguridadGuard: CanActivateFn = (route, state) => {
  return true;
};
