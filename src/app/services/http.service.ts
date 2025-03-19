import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    constructor(private http: HttpClient) {}

    get(endpoint, headers = {}) {
        return new Promise((resolve, reject) => {
            this.http.get(endpoint, { headers: headers }).subscribe(
                (res: any) => {
                    if (res) {
                        resolve(res);
                    } else {
                        reject(res);
                    }
                },
                err => {
                    reject(err.error);
                }
            );
        });
    }

    getById(endpoint, id, headers = {}) {
        return new Promise((resolve, reject) => {
            this.http.get(endpoint + '/' + id, { headers: headers }).subscribe(
                (res: any) => {
                    if (res) {
                        resolve(res);
                    } else {
                        reject(res);
                    }
                },
                err => {
                    reject(err.error);
                }
            );
        });
    }

    post(endpoint, body) {
        return new Promise((resolve, reject) => {
            this.http.post(endpoint, body).subscribe(
                (res: any) => {
                    // if (res && res.success == true) {
                        resolve(res);
                    // } else {
                    //     reject(res);
                    // }
                },
                err => {
                    reject(err.error);
                }
            );
        });
    }

    put(endpoint, id, body, headers = {}) {
        return new Promise((resolve, reject) => {
            this.http.put(endpoint + '/' + id, body, { headers: headers }).subscribe(
                (res: any) => {
                    if (res.status == 200 || res.status == 201 || !res.status) {
                        resolve(res.data);
                    } else {
                        reject(res);
                    }
                },
                err => {
                    reject(err.error);
                }
            );
        });
    }

    patch(endpoint, body, headers = {}) {
        return new Promise((resolve, reject) => {
            this.http.patch(endpoint, body, { headers: headers }).subscribe(
                (res: any) => {
                    if (res) {
                        resolve(res);
                    } else {
                        reject(res);
                    }
                },
                err => {
                    reject(err.error);
                }
            );
        });
    }

    delete(endpoint, id, headers = {}) {
        return new Promise((resolve, reject) => {
            this.http.delete(endpoint + '/' + id, { headers: headers }).subscribe(
                (res: any) => {
                    if (res.status == 200 || res.status == 201 || !res.status) {
                        resolve(res.data);
                    } else {
                        reject(res);
                    }
                },
                err => {
                    reject(err.error);
                }
            );
        });
    }
}
