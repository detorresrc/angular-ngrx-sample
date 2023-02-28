import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Router} from "@angular/router";
import {catchError, map, of, switchMap, tap} from "rxjs";

import {PersistenceService} from "src/app/shared/services/persistence.service";
import {persistenceAction, persistenceFailureAction, persistenceSuccessAction} from "src/app/auth/store/actions/persistence.actions";

@Injectable()
export class PersistenceEffect {
  constructor(
    private actions$: Actions,
    private persistenceService: PersistenceService,
    private router: Router) {}

  checkLogin$ = createEffect(() => this.actions$.pipe(
    ofType(persistenceAction),
    switchMap(() => {
      return this.persistenceService.getUser().pipe(
        map( currentUser => {
          return persistenceSuccessAction({currentUser: currentUser});
        }),
        catchError((error) => {
          console.error("Persistence >> ", error.message);
          return of( persistenceFailureAction() );
        })
      )
    })
  ));

  redirectLogin$ = createEffect( () => this.actions$.pipe(
    ofType(persistenceSuccessAction),
    tap(() => {
      this.router.navigate(['/']);
    })
  ), {dispatch: false});
}
