import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private apiUrl = "https://ba-sit.uapi.app/uapi"; // แทนที่ด้วย URL ของ API ที่คุณต้องการเชื่อมต่อ

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ChatGPT_Test/Get100Users`);
  }

  postData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/data`, data);
  }

  // เพิ่มเมธอดเรียกใช้ API อื่นๆ ตามต้องการ
}
