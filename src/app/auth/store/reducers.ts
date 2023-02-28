import {Action, createReducer, on, props} from "@ngrx/store";

import {AuthStateInterface} from "../types/authState.interface";
import {registerAction, registerFailureAction, registerSuccessAction} from "./actions/register.actions";
import {persistenceAction, persistenceSuccessAction} from "./actions/persistence.actions";
import {loginAction, loginFailureAction, loginSuccessAction} from "./actions/login.actions";

const initialState : AuthStateInterface = {
  isSubmitting : false,
  currentUser: null,
  isLoggedIn: false,
  validationErrors: null
}

const authReducer = createReducer(
  initialState,
  on(registerAction, (state): AuthStateInterface => {
    return {
      ...state,
      isSubmitting: true,
      validationErrors: null,
      isLoggedIn: false
    };
  }),
  on(registerSuccessAction, (state, props): AuthStateInterface => {
    return {
      ...state,
      currentUser: props.currentUser,
      isSubmitting: false,
      isLoggedIn: true,
      validationErrors: null
    };
  }),
  on(registerFailureAction, (state, props): AuthStateInterface => {
    return {
      ...state,
      isSubmitting: false,
      validationErrors: props.errors
    };
  }),

  on(persistenceSuccessAction, (state, props):AuthStateInterface => {
    return {
      ...state,
      isLoggedIn: true,
      currentUser: props.currentUser
    };
  }),

  on(loginAction, (state, props):AuthStateInterface => {
    return {
      ...state,
      isLoggedIn: false,
      currentUser: null,
      isSubmitting: true,
    };
  }),
  on(loginSuccessAction, (state, props):AuthStateInterface => {
    return {
      ...state,
      isLoggedIn: true,
      isSubmitting: false,
      currentUser: props.currentUser
    };
  }),
  on(loginFailureAction, (state, props): AuthStateInterface => {
    return {
      ...state,
      isSubmitting: false,
      validationErrors: props.errors
    };
  }),
);

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}
