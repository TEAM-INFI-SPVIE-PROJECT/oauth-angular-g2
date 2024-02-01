import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface UserInfo {
  info: {
    sub: string;
    email: string;
    name: string;
    picture: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class OauthService {
  userProfileSubject = new Subject<UserInfo>();

  constructor(
    private http: HttpClient,
    private readonly oAuthService: OAuthService
  ) {
    oAuthService.configure(environment.oAuthConfing);

    oAuthService.logoutUrl = 'https://www.google.com/accounts/Logout';

    oAuthService.loadDiscoveryDocument().then(() => {
      oAuthService.tryLoginImplicitFlow().then(() => {
        if (!oAuthService.hasValidAccessToken()) {
          // oAuthService.initLoginFlow();
        } else {
          oAuthService.loadUserProfile().then((userProfile: any) => {
            this.userProfileSubject.next(userProfile as UserInfo);
          });
        }
      });
    });
  }

  login() {
    this.oAuthService.loadDiscoveryDocument().then(() => {
      this.oAuthService.tryLoginImplicitFlow().then(() => {
        if (!this.oAuthService.hasValidAccessToken()) {
          this.oAuthService.initLoginFlow();
        } else {
          this.oAuthService.loadUserProfile().then((userProfile: any) => {
            this.userProfileSubject.next(userProfile as UserInfo);
          });
        }
      });
    });
  }

  emails(userId: string): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/gmail/v1/users/${userId}/messages`,
      {
        headers: this.authHeader(),
      }
    );
  }

  getMail(userId: string, mailId: string): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/gmail/v1/users/${userId}/messages/${mailId}`,
      { headers: this.authHeader() }
    );
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  logOut() {
    this.oAuthService.logOut();
  }

  private authHeader(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.oAuthService.getAccessToken()}`,
    });
  }
}
