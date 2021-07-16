import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '../control-system/account.system';

@Component({
  selector: 'app-user-manag',
  templateUrl: './user-manag.component.html'
})
export class UserManagComponent implements OnInit {

  users = null;
  
  constructor(private accountService: AccountService) {}

  ngOnInit() {
      this.accountService.getUsersAll()
          .pipe(first())
          .subscribe(users => this.users = users);
      
    console.table(this.users[0]);
  }

  deleteUser(id: string) {
      const user = this.users.find(x => x.id === id);
      user.isDeleting = true;
      this.accountService.delete(id)
          .pipe(first())
          .subscribe(() => {
              this.users = this.users.filter(x => x.id !== id) 
          });
  }
}
