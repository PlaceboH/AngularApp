import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '../control-system/account.system';

@Component({
  selector: 'app-list-szkolenia',
  templateUrl: './list-szkolenia.component.html'
})
export class ListSzkoleniaComponent implements OnInit {
  szkolenia = null;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
      this.accountService.getAllSzkolenia()
          .pipe(first())
          .subscribe(szkolenia => this.szkolenia = szkolenia);
  }

}


