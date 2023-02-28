import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

import {registerAction, registerFailureAction, registerSuccessAction} from "src/app/auth/store/actions/register.actions";
import {AuthService} from "src/app/auth/services/auth.service";
import {PersistenceService} from "src/app/shared/services/persistence.service";

@Injectable()
export class RegisterEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistenceService: PersistenceService,
    private router: Router) {}
  register$ = createEffect(()=> this.actions$.pipe(
    ofType(registerAction),
    switchMap((props) => {
      return this.authService.register(props.request).pipe(
        map(currentUser => {
          this.persistenceService.set('user', currentUser);
          return registerSuccessAction({currentUser: currentUser});
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(registerFailureAction({
            errors: errorResponse.error.errors
          }));
        })
      );
    })
  ));

  redirectAfterSubmit$ = createEffect(() => this.actions$.pipe(
    ofType(registerSuccessAction),
    tap(() => {
      this.router.navigateByUrl('/');
    })
  ), {
    dispatch: false
  });
}
