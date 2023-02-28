import {Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";

import {AppStateInterface} from "src/app/shared/types/appState.interface";
import {persistenceAction} from "src/app/auth/store/actions/persistence.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private store: Store<AppStateInterface>) {
  }
  ngOnInit(): void {
    this.store.dispatch(persistenceAction());
  }
}
