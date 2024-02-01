import { Component } from '@angular/core';
import { OauthService } from '../../../services/oauth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private readonly oAuthService: OauthService) {}

  isLoggedIn(): boolean {
    return this.oAuthService.isLoggedIn();
  }

  logOut() {
    this.oAuthService.logOut();
  }

  login() {
    this.oAuthService.login();
  }
}
