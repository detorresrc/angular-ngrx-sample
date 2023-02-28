import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Router} from "@angular/router";
import {switchMap, map, catchError, of, tap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

import {loginAction, loginFailureAction, loginSuccessAction} from "src/app/auth/store/actions/login.actions";
import {AuthService} from "src/app/auth/services/auth.service";
import {PersistenceService} from "src/app/shared/services/persistence.service";

@Injectable()
export class LoginEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private persistenceService: PersistenceService) {}

  login$ = createEffect(() => this.actions$.pipe(
    ofType(loginAction),
    switchMap((props) => {
      return this.authService.login(props.request).pipe(
        map( (currentUser) => {
          return loginSuccessAction({currentUser});
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(loginFailureAction({
            errors: errorResponse.error.errors
          }))
        })
      );
    })
  ));

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(loginSuccessAction),
    tap(() => {
      this.router.navigateByUrl('/');
    })
  ), {
    dispatch: false
  });
}
