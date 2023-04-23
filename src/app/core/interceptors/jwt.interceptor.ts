import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionContext } from '@contexts/SessionContext';
import { environment } from '@environment';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private useSession: SessionContext) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.startsWith(environment.apiURL)) {
      return next.handle(request);
    }

    return from(this.useSession.getBearerToken().catch(() => null)).pipe(
      switchMap(token => {
        if (token) {
          const requestClone = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });

          return next.handle(requestClone);
        }

        return next.handle(request);
      })
    );
  }
}
