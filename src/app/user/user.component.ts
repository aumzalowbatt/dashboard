import { Component, OnInit } from '@angular/core';
import { ApiService } from "../shared/services/api.service";
@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  responseData: any = [];

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    await this.getUser();
    console.log("this.responseData", this.responseData);
  }

  getUser() {
    this.apiService.getData().subscribe((res: any) => {
      this.responseData = res.data;
      console.log("this.responseData", this.responseData, res.data);
    });
  }
}
