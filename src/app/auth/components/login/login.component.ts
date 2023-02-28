import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";

import {AppStateInterface} from "src/app/shared/types/appState.interface";
import {loginAction} from "../../store/actions/login.actions";
import {BackendErrorsInterface} from "../../../shared/types/backendErrors.interface";
import {isSubmittingSelector, validationErrorsSelector} from "../../store/selectors";

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit{
  form!: FormGroup;
  isSubmitting$!: Observable<boolean> | null;
  validationErrors$!: Observable<BackendErrorsInterface | null> | null;

  constructor(private formBuilder: FormBuilder, private store: Store<AppStateInterface>) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  onSubmit(): void {
    this.store.dispatch(loginAction({request: { user: this.form.value }}));
  }

  private initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.validationErrors$ = this.store.pipe(select(validationErrorsSelector));
  }
  private initializeForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
}
