import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { lastValueFrom } from 'rxjs';

import { OauthService, UserInfo } from './services/oauth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
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

  // async getEmails() {
  //   if (!this.userInfo) {
  //     return;
  //   }

  //   const userId = this.userInfo?.info.sub as string;
  //   const messages = await lastValueFrom(this.oAuthService.emails(userId));
  //   messages.messages.forEach((element: any) => {
  //     const mail = lastValueFrom(this.oAuthService.getMail(userId, element.id));
  //     mail.then((mail) => {
  //       this.mailSnippets.push(mail.snippet);
  //     });
  //   });
  // }
}
