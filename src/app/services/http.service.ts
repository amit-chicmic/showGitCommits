

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = environment.apiEndpoint;
  headers = new HttpHeaders({
  });

  constructor(
    private http: HttpClient,
  ) { }


  getData(url: string, data?: any, backGroundUrl?: boolean): Observable<any> {
    let searchParams = new HttpParams();
    for (const key in data) {
      searchParams = searchParams.append(key, data[key]);
    }

    const apiUrl = `${this.baseUrl}${url}`;
    if (backGroundUrl) {
    }
    return this.http.get(apiUrl, { params: searchParams })
      .pipe(map((response: any) => {
        return response;
      }));
  }

  postData(url: string, data: any, formData?: boolean) {
    const apiUrl = `${this.baseUrl}${url}`;
    const postData = !formData ? data : this.appendFormData(data);
    return this.http.post(apiUrl, postData, { headers: this.headers })
      .pipe(map((response: any) => {
        return response;
      }));
  }

  putData(url: string, data: any, formData?: boolean) {
    const apiUrl = `${this.baseUrl}${url}`;
    const postData = !formData ? data : this.appendFormData(data);
    return this.http.put(apiUrl, postData)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  patchData(url: string, data: any, formData?: boolean) {
    const apiUrl = `${this.baseUrl}${url}`;
    const postData = !formData ? data : this.appendFormData(data);
    return this.http.patch(apiUrl, postData)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  deleteData(url: string, data?: any, formData?: boolean) {
    const apiUrl = `${this.baseUrl}${url}`;
    const postData = !formData ? data : this.appendFormData(data);
    return this.http.delete(apiUrl, postData)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  appendFormData(myFormData: { [x: string]: any; }): FormData {
    const fd = new FormData();
    for (const key in myFormData) {
      if (myFormData[key]) {
        fd.append(key, myFormData[key]);
      }
    }
    return fd;
  }
}
