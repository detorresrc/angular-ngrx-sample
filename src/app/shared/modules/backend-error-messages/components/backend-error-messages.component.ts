import {Component, Input, OnInit} from "@angular/core";

import {BackendErrorsInterface} from "src/app/shared/types/backendErrors.interface";

@Component({
  selector: 'mc-backend-error-messages',
  styleUrls: ['./backend-error-messages.component.scss'],
  templateUrl: 'backend-error-messages.component.html'
})
export class BackendErrorMessagesComponent implements OnInit{
  @Input('backendErrors') backendErrorsProps!:BackendErrorsInterface | null;
  errorMessages!: string[];

  ngOnInit(): void {
    this.errorMessages = [];
    if(this.backendErrorsProps) {
      const keys = Object.keys(this.backendErrorsProps);
      for(let fieldIndex in keys){
        const fieldName = keys[fieldIndex];

        this.errorMessages.push(fieldName + ' ' + this.backendErrorsProps[fieldName].join(' '));
      }
    }
  }
}
