import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  API_SERVER_ADDRESS = environment.API_SERVER_ADDRESS;

  constructor(public httpClient: HttpClient) {}

  setFormData(data: any) {
    data = data ? data : {};
    const formData = new FormData();
    const key = Object.keys(data);
    key.forEach((item) => {
      formData.append(
        item,
        data[item] === null || data[item] === undefined ? "" : data[item]
      );
    });
    return formData;
  }

  setParamString(data: any) {
    data = data ? data : {};
    let params = new HttpParams();
    const key = Object.keys(data);
    key.forEach((item) => {
      params = params.append(
        item,
        data[item] === null || data[item] === undefined ? "" : data[item]
      );
    });
    return params;
  }

  get(url: string, data: any = {}): Observable<any> {
    if (!url.startsWith("http")) {
      url = `${this.API_SERVER_ADDRESS + url}`;
    }

    const params = this.setParamString(data);
    return this.httpClient
      .get(url, { params })
      .pipe(tap(async (res: any) => {}));
  }

  post(url: string, data: any = {}, options?: any): Observable<any> {
    if (!url.startsWith("http")) {
      url = `${this.API_SERVER_ADDRESS + url}`;
    }

    const formData = data instanceof FormData ? data : this.setFormData(data);
    return this.httpClient.post(url, formData, options).pipe(
      tap(async (res: any) => {})
      //catchError(this.handlerError)
    );
  }

  put(url: string, data: any = {}): Observable<any> {
    if (!url.startsWith("http")) {
      url = `${this.API_SERVER_ADDRESS + url}`;
    }

    const formData = this.setFormData(data);
    return this.httpClient.put(url, formData).pipe(tap(async (res: any) => {}));
  }

  delete(url: string, data: any = {}): Observable<any> {
    if (!url.startsWith("http")) {
      url = `${this.API_SERVER_ADDRESS + url}`;
    }
    const params = this.setParamString(data);
    return this.httpClient
      .delete(url, { params })
      .pipe(tap(async (res: any) => {}));
  }

  //Error
  handlerError(error: HttpErrorResponse) {
    let errorMessage = "";
    let title = "เกิดข้อผิดพลาดทางระบบ";
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = `${error.error.message}`;
    } else {
      console.log(error);
      // Handle server error
      errorMessage =
        "http " + `error code ${error.status} ${error.error.message}`;
    }

    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
