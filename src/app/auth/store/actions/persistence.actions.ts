import {createAction, props} from "@ngrx/store";

import {ActionTypes} from "../actionTypes";
import {CurrentUserInterface} from "../../../shared/types/currentUser.interface";

export const persistenceAction = createAction(
  ActionTypes.AUTH_PERSISTENCE
)

export const persistenceSuccessAction = createAction(
  ActionTypes.AUTH_PERSISTENCE_SUCCESS,
  props<{currentUser: CurrentUserInterface}>()
)

export const persistenceFailureAction = createAction(
  ActionTypes.AUTH_PERSISTENCE_FAILURE
)
