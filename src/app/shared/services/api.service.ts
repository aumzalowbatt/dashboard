import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "environments/environment";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  // private apiUrl = "https://ba-sit.uapi.app/uapi"; // แทนที่ด้วย URL ของ API ที่คุณต้องการเชื่อมต่อ
  // API_SERVER_ADDRESS = environment.API_SERVER_ADDRESS;
  constructor(public http: HttpService) {}

  getData(): Observable<any> {
    return this.http.get(
      `${environment.API_SERVER_ADDRESS}/ChatGPT_Test/Get100Users`
    );
  }
  getDataByName(data?: any): Observable<any> {
    return this.http.get(
      `${environment.API_SERVER_ADDRESS}/ChatGPT_Test/GetListUserByName?DisplayName=` +
        data
    );
  }
  getMessageByUser(data: any): Observable<any> {
    console.log("data", data);
    return this.http.get(
      `${environment.API_SERVER_ADDRESS}/ChatGPT_Test/Get100MessageByUser`, data
    );
  }
  postData(data: any): Observable<any> {
    return this.http.post(`${environment.API_SERVER_ADDRESS}/data`, data);
  }
  getSearchByText(data: any): Observable<any> {
    console.log("data", data);
    return this.http.get(
      `${environment.API_SERVER_ADDRESS}/ChatGPT_Test/GetSearchByText`,
      data
    );
  }
  getPredictList(params?: object) {
    return this.http.get(
      `${environment.API_SERVER_ADDRESS}/thanos/predict_list`,
      params
    );
  }

  getHoroScopes(params?: object){
    return this.http.get(
      `${environment.API_SERVER_ADDRESS}/thanos/GetHoroscopes`,
      params
    );
  }
  public editHoroScopes(item){
    return this.http.put(
      `${environment.API_SERVER_ADDRESS}/thanos/UpdateHoroscopes`,
      item
    );
  }
  // เพิ่มเมธอดเรียกใช้ API อื่นๆ ตามต้องการ
}
