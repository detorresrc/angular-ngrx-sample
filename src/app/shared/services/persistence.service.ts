import {Injectable} from "@angular/core";
import {CurrentUserInterface} from "../types/currentUser.interface";
import {Observable, of, throwError} from "rxjs";

@Injectable()
export class PersistenceService {
  set(key: string, data: any): void {
    try{
      localStorage.setItem(key, JSON.stringify(data));
    }catch(e){
      console.error('Error saving to localstorage', e);
    }
  }

  get(key: string): any {
    try{
      // @ts-ignore
      return JSON.parse(localStorage.getItem(key));
    }catch(e){
      return null;
    }
  }

  getUser() : Observable<CurrentUserInterface> {
    const user = this.get('user');
    if(!user) return throwError(new Error('No valid user from localStorage'));

    return of(<CurrentUserInterface>user);
  }
}
