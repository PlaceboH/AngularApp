import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccountService } from '../control-system/account.system';
import { AlertService } from '../control-system/alert.system';
import { Szkolenie } from '../structures/szkolenie';
import { User } from '../structures/user';

@Component({
  selector: 'app-szkolenia',
  templateUrl: './szkolenia.component.html'
})
export class SzkoleniaComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  user : User;
  constructor( 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Nazwa: ['', Validators.required],
      Data: ['', Validators.required],
      Opis: ['', [Validators.required, Validators.minLength(10)]]
  });
  }

  get f() { return this.form.controls; }
  

  onSubmit() {

    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    this.accountService.registerSzkolenie(this.form.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Dodano Szkolenie!', { keepAfterRouteChange: true });
                this.router.navigate(['../acc'], { relativeTo: this.route });
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });

  }


}
  