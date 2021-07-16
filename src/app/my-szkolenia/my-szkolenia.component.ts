import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '../control-system/account.system';

@Component({
  selector: 'app-my-szkolenia',
  templateUrl: './my-szkolenia.component.html'
})
export class MySzkoleniaComponent implements OnInit {

  szkolenia = null;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
      this.accountService.getAllSzkolenia()
          .pipe(first())
          .subscribe(szkolenia => this.szkolenia = szkolenia);

      delete this.szkolenia[0];
      let username = this.accountService.userValue.username;
      this.szkolenia.forEach(szk => {
          szk.array.forEach(elem => {
            if(elem != username){}
          });
      });

      console.table(this.szkolenia);

  }


}
