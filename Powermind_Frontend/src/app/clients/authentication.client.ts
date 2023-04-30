import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationClient {
    constructor(private http: HttpClient) {}

    /**
     * Login the user
     */
    public login(userId: string): Observable<string> {
        return this.http.post(
            environment.apiUrl + '/user/login',
            {
                userId: userId
            },
            { responseType: 'text' }
        );
    }

    /**
     * Registers the user
     */
    public register(
        threshold: number, capacity:  number, dischargeCurrent: number, dischargeVoltage: number
    ): Observable<string> {
        return this.http.post(
            environment.apiUrl + '/users/create',
            {
                "threshold": threshold,
                "capacity": capacity,
                "dischargeCurrent": dischargeCurrent,
                "dischargeVoltage": dischargeVoltage
            },
            { responseType: 'text' }
        );
    }
}