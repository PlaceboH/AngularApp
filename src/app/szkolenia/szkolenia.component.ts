import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccountService } from '../control-system/account.system';
import { AlertService } from '../control-system/alert.system';
import { Szkolenie } from '../structures/szkolenie';

@Component({
  selector: 'app-szkolenia',
  templateUrl: './szkolenia.component.html'
})
export class SzkoleniaComponent implements OnInit {
  szkolenie = null;
  id: string;
  submitted = false;
  loading = false;
  isSubscribe:boolean = false;

  constructor(       
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.accountService.getSzkolenieById(this.id).pipe(first()).subscribe(x => {
      this.szkolenie = x;
    });;

    console.table(this.szkolenie);
  }


  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();


    //this.loading = true;
    this.loading = true;


  //   this.accountService.updateSzkolenie(this.id, this.szkolenie)
  //   .pipe(first())
  //   .subscribe(
  //       data => {
  //           this.alertService.success('Update successful', { keepAfterRouteChange: true });
  //           this.router.navigate(['..', { relativeTo: this.route }]);
  //       },
  //       error => {
  //           this.alertService.error(error);
  //           this.loading = false;
  //       });
  }


  Sub(){
    let username = this.accountService.userValue.username;
    this.szkolenie.subscribe.push(username);
    this.isSubscribe = true;
    console.table(this.szkolenie);
  }

  unSub(){
    let username = this.accountService.userValue.username;
    let index = this.szkolenie.subscribe.indexOf(username);
    delete this.szkolenie.subscribe[index];
    this.isSubscribe = false;
    console.table(this.szkolenie);
  }


}




