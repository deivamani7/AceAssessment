﻿import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/model/user';


@Injectable({ providedIn: 'root' })
export class AuthService {
    private loggedInUserSubject: BehaviorSubject<User>;
    public loggedInUser: Observable<User>;

    constructor(private http: HttpClient, @Inject('DOMAIN_URL') private url: string) {
        this.loggedInUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('loggedInUser')));
        this.loggedInUser = this.loggedInUserSubject.asObservable();
    }

    public get loggedInUserValue(): User {
        return this.loggedInUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${this.url}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details in local storage to keep user logged in between page refreshes
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                this.loggedInUserSubject.next(user);
                return user;
            }));
    }

    isloggedIn(loggedInUser) {
        if (loggedInUser) {
            return true
        }
        else {
            return false
        }
    }

    logout() {
        // remove user from local storage and log out
        localStorage.removeItem('loggedInUser');
        this.loggedInUserSubject.next(null);
    }
}