import { Component } from '@angular/core';
import { User } from '../structures/user';
import { AccountService } from '../control-system/account.system';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent {
  user: User;
  constructor(private accountService: AccountService) { 
    this.user = this.accountService.userValue;
  }

}
