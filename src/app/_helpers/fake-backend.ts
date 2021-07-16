import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Szkolenie } from '../structures/szkolenie';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];
let szkolenia = JSON.parse(localStorage.getItem('szkolenia')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) 
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/acc') && method === 'POST':
                    return authenticate();
                case url.endsWith('/reg') && method === 'POST':
                    return register();
                case url.endsWith('/szkolenia') && method === 'POST':
                    return addSzkolenie();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match('/lista') && method === 'POST':
                    return subscribeSzkolenie();
                case url.endsWith('/lista') && method === 'GET':
                    return getSzkolenia();  
                case url.match(/\/users\/\d+$/) && method === 'PUT':
                    return updateUser();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();

                case url.match(/\/szkolenie\/\d+$/) && method === 'GET':
                    return getSzkolenieById();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token'
            })
        }



        function register() {
            const user = body

            if (users.find(x => x.username === user.username)) {
                return error('Username "' + user.username + '" is already taken')
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        function addSzkolenie(){
            const szkolenie = body;
            console.table(body);
            szkolenie.id = szkolenia.length ? Math.max(...szkolenia.map(x => x.id)) + 1 : 1;;
            szkolenie.tworca = body.tworca;
            szkolenie.subscribe = [szkolenie.tworca];  
            szkolenia.push(szkolenie);
            localStorage.setItem('szkolenia', JSON.stringify(szkolenia));
            return ok();
        }

        function subscribeSzkolenie(){
            console.log(body);
            const szkolenie = szkolenia.find(x => x.name = body.Nazwa);
            
            console.log(szkolenie.id + 'hi');
            return ok();
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }
        
        function getSzkolenia() {
            if (!isLoggedIn()) return unauthorized();
            return ok(szkolenia);
        }
        function getUserById() {
            if (!isLoggedIn()) return unauthorized();
            const user = users.find(x => x.id === idFromUrl());
            return ok(user);
        }

        function getSzkolenieById() {
            if (!isLoggedIn()) return unauthorized();
            const szkolenie = szkolenia.find(x => x.id === idFromUrl());
            return ok(szkolenie);
        }

        function updateUser() {
            console.log("Hi");
            if (!isLoggedIn()) return unauthorized();

            let params = body;
            let user = users.find(x => x.id === idFromUrl());

            if (!params.password) {
                delete params.password;
            }
            Object.assign(user, params);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }

        function updateSzkolenie() {
            if (!isLoggedIn()) return unauthorized();
            let params = body;
            let szkolenie = users.find(x => x.id === idFromUrl());

            Object.assign(szkolenie, params);
            localStorage.setItem('szkolenia', JSON.stringify(szkolenia));

            return ok();
        }

        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();

            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        function deleteSzkolenie() {
            if (!isLoggedIn()) return unauthorized();

            szkolenia = szkolenia.filter(x => x.id !== idFromUrl());
            localStorage.setItem('szkolenia', JSON.stringify(szkolenia));
            return ok();
        }



        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {

    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};