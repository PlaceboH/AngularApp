import { Component } from '@angular/core';
import { AccountService } from './control-system/account.system';
import { User } from './structures/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent {
  user: User;

  constructor(private accountService: AccountService) {
      this.accountService.user.subscribe(x => this.user = x);
  }

  logout() {
      this.accountService.logout();
  }
}