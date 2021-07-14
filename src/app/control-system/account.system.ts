import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../enviroment';
import { User } from '../structures/user';
import { Szkolenie } from '../structures/szkolenie';


@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    private szkolenieSubject: BehaviorSubject<Szkolenie>;
    public user: Observable<User>;
    public szkolenie: Observable<Szkolenie>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.szkolenieSubject = new BehaviorSubject<Szkolenie>(JSON.parse(localStorage.getItem('szkolenie')));
        this.user = this.userSubject.asObservable();
        this.szkolenie = this.szkolenieSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }
    public get szkolenieValue(): Szkolenie {
        return this.szkolenieSubject.value;
    }
    login(username, password) {
        return this.http.post<User>(`${environment.apiUrl}/acc`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/log']);
    }


    register(user: User) {
        return this.http.post(`${environment.apiUrl}/reg`, user);
    }
    registerSzkolenie(szkolenie: Szkolenie) {
        return this.http.post(`${environment.apiUrl}/szkolenia`, szkolenie);
    }
    getUsersAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }
    getAllSzkolenia(){
        return this.http.get<Szkolenie[]>(`${environment.apiUrl}/lista`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }
    getUsersById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }
}