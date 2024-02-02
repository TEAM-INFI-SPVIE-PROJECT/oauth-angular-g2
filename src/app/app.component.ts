import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { lastValueFrom } from 'rxjs';

import { OauthService, UserInfo } from './services/oauth.service';
import { HeaderComponent } from './core/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, HeaderComponent],
})
export class AppComponent {
  title = 'oauth-angular-g2';
  userInfo?: UserInfo;
  mailSnippets: string[] = [];

  constructor(private readonly oAuthService: OauthService) {
    oAuthService.userProfileSubject.subscribe((info) => {
      this.userInfo = info;
    });
  }

  isLoggedIn(): boolean {
    return this.oAuthService.isLoggedIn();
  }

  logOut() {
    this.oAuthService.logOut();
  }

  login() {
    console.log('benthe...');

    this.oAuthService.login();
  }
}
