import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

import {RegisterRequestInterface} from "src/app/auth/types/registerRequest.interface";
import {CurrentUserInterface} from "src/app/shared/types/currentUser.interface";
import {environment} from "src/environments/environment";
import {AuthResponseInterface} from "src/app/auth/types/authResponse.interface";
import {LoginRequestInterface} from "src/app/auth/types/loginRequest.interface";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }
  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl+"/api/users";
    return this.http.post<AuthResponseInterface>(url, data)
            .pipe(
              map((response) => {
                return response.user;
              })
            );
  }

  login(data: LoginRequestInterface) : Observable<CurrentUserInterface> {
    const url = environment.apiUrl+"/api/users/login";
    return this.http.post<AuthResponseInterface>(url, data)
      .pipe(
        map((response) => {
          return response.user;
        })
      );
  }
}
