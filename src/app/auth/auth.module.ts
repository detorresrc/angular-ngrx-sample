import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";

import {AuthRouting} from 'src/app/auth/auth-routing.module';
import {reducers} from "src/app/auth/store/reducers";
import {AuthService} from "src/app/auth/services/auth.service";
import {RegisterEffect} from "src/app/auth/store/effects/register.effect";
import {BackendErrorMessagesModule} from "src/app/shared/modules/backend-error-messages/backend-error-messages.module";
import {PersistenceEffect} from "src/app/auth/store/effects/persistence.effect";

import {RegisterComponent} from 'src/app/auth/components/register/register.component';
import {LoginComponent} from "src/app/auth/components/login/login.component";
import {LoginEffect} from "./store/effects/login.effect";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRouting,
    BackendErrorMessagesModule,

    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([RegisterEffect, PersistenceEffect, LoginEffect])
  ],
  declarations: [RegisterComponent, LoginComponent],
  exports: [],
  providers: [AuthService]
})
export class AuthModule {}
