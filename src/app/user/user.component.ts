import { Component, OnInit, NgModule } from "@angular/core";
import { ApiService } from "../shared/services/api.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  responseData: any = [];
  Messages: any = [];
  DisplayName: any;
  PictureUrl: any;
  formModel = {
    displayName: "",
    tag: "",
  };
  isActive: boolean = false;
  Edate: any;

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

  clickSearchName() {
    this.apiService
      .getDataByName(this.formModel.displayName)
      .subscribe((res: any) => {
        if (res.successful) {
          this.responseData = res.data;
          console.log("res", res.data);
        }
      });
    console.log("formModel", this.formModel, this.formModel.displayName);
  }

  clickMessageByUser(item) {
    this.DisplayName = item.DisplayName;
    this.PictureUrl = item.PictureUrl;
    this.apiService.getMessageByUser(item.UserId).subscribe((res: any) => {
      if (res.successful) {
        this.Messages = res.data.map((m) => {   
          return { ...m };
        });
        console.log("res", this.Messages, this.isActive);
      }
    });
  }
  
}
