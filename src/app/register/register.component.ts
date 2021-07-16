import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../control-system/alert.system';
import { AccountService } from '../control-system/account.system';


@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }


  ngOnInit() {
    this.form = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
   get f() { return this.form.controls; }
  

  
  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    this.accountService.register(this.form.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                this.router.navigate(['/log'], { relativeTo: this.route });
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
  }



}
