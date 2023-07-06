import { Component, OnInit, TemplateRef, ViewChild , ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { content } from 'googleapis/build/src/apis/content';
import { ApiService } from "../shared/services/api.service";

interface Option {
  level: string;
  id: string;
  label: string;
}


@Component({
  selector: "app-predict",
  templateUrl: "./predict.component.html",
  styleUrls: ["./predict.component.scss"],
})
export class PredictComponent implements OnInit {
  dateForm: FormGroup;

  @ViewChild("startDateInput", { static: true })
  startDateInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild("endDateInput", { static: true })
  endDateInputRef!: ElementRef<HTMLInputElement>;

  // toggleMonthOnly(checked: boolean) {
  //   const startDateInput = this.startDateInputRef.nativeElement;
  //   const endDateInput = this.endDateInputRef.nativeElement;
  //   startDateInput.type = checked ? 'month' : 'date';
  //   endDateInput.type = checked ? 'month' : 'date';
  // }
  // toggleWeekOnly(checked: boolean) {
  //   const startDateInput = this.startDateInputRef.nativeElement;
  //   const endDateInput = this.endDateInputRef.nativeElement;
  //   startDateInput.type = checked ? 'week' : 'date';
  //   endDateInput.type = checked ? 'week' : 'date';
  // }
  //  Filter Date
  // toggleDateType(dateType: string, checked: boolean) {
  //   const startDateInput = this.startDateInputRef.nativeElement;
  //   const endDateInput = this.endDateInputRef.nativeElement;

  //   switch (dateType) {
  //     case 'day':
  //       startDateInput.type = checked ? 'date' : 'text';
  //       endDateInput.type = checked ? 'date' : 'text';
  //       break;
  //     case 'week':
  //       startDateInput.type = checked ? 'week' : 'text';
  //       endDateInput.type = checked ? 'week' : 'text';
  //       break;
  //     case 'month':
  //       startDateInput.type = checked ? 'month' : 'text';
  //       endDateInput.type = checked ? 'month' : 'text';
  //       break;
  //     case 'year':
  //       startDateInput.type = checked ? 'year' : 'text';
  //       endDateInput.type = checked ? 'year' : 'text';
  //       break;
  //     default:
  //       startDateInput.type = 'text';
  //       endDateInput.type = 'text';
  //       break;
  //   }
  // }

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private apiService: ApiService
  ) {}

  onSubmit() {}
  PredictList1: Option[] = [];
  PredictList2: Option[] = [];
  PredictList3: Option[] = [];
  PredictList4: Option[] = [];
  formAdd: any;
  editMode = false;
  formModel = {
    predict1: null,
    predict2: null,
    predict3: null,
    predict4: null,
  };

  ngOnInit() {
    this.apiService.getPredictList().subscribe((res: any) => {
      this.PredictList1 = res.data.map((data: any) => ({
        id: data.value,
        level: data.lv,
        label: data.lists,
      }));
      console.log("getPredictList", this.PredictList1);
      console.log("formModel", this.formModel);
    });
  }

  onpredict1Change(item) {
    const param = {
      search: JSON.stringify([{ Key_lv: { lv: 1, value: item } }]),
    };
    this.apiService.getPredictList(param).subscribe((res: any) => {
      this.PredictList2 = res.data.map((data: any) => ({
        id: data.value,
        level: data.lv,
        label: data.lists,
      }));
    });
  }

  onpredict2Change(item) {
    const param = {
      search: JSON.stringify([{ Key_lv: { lv: 2, value: item } }]),
    };
    this.apiService.getPredictList(param).subscribe((res: any) => {
      this.PredictList3 = res.data.map((data: any) => ({
        id: data.value,
        level: data.lv,
        label: data.lists,
      }));
      console.log("getPredictList", this.PredictList3);
    });
  }

  onpredict3Change(item) {
    const param = {
      search: JSON.stringify([{ Key_lv: { lv: 3, value: item } }]),
    };
    this.apiService.getPredictList(param).subscribe((res: any) => {
      this.PredictList4 = res.data.map((data: any) => ({
        id: data.value,
        level: data.lv,
        label: data.lists,
      }));
      console.log("getPredictList", this.PredictList4);
    });
  }

  openModel() {
    const modelDiv = document.getElementById("myModal");
    if (modelDiv != null) {
      modelDiv.style.display = "block";
    }
  }

  CloseModel() {
    const modelDiv = document.getElementById("myModal");
    if (modelDiv != null) {
      modelDiv.style.display = "none";
    }
  }

  // EXAMPLE

  // @ViewChild('AddModal') addModal: TemplateRef<any>;

  //   openAddItemModal(item = null) {
  //       this.initialFormAdd(item);

  //       const params = {
  //           windowClass: 'alert-modal capture-modal',
  //           size: 'xl',
  //           centered: true,
  //           scrollable: true,
  //           backdrop: 'static',
  //           keyboard: false
  //       } as any;

  //       this.editMode = item ? true : false;

  //       let modalRef = this.modalService.open(this.addModal, params);
  //       const b = this.formAdd.days.every(day => day.checked);
  //       this.formAdd.checkAll = b;
  //       console.log(this.formAdd.EndTime, this.times);
  //   }

  //   initialFormAdd(item?) {
  //     const data = item || this.tempForm;
  //     this.formAdd = Object.assign({}, data);
  //     this.formAdd.days = this.tempDays.map(m => Object.assign({}, m));

  //     if (item) {
  //         this.formAdd.days.map(m => {
  //             const keys = Object.keys(item);
  //             keys.forEach(f => {
  //                 if (f == m.day) {
  //                     m.checked = item[f] ? true : false;
  //                 }
  //             });
  //         });
  //     }
  // }

  //   @ViewChild('EditModal') editModal: TemplateRef<any>;

  //   openEditItemModal() {
  //       const params = {
  //           windowClass: 'alert-modal capture-modal',
  //           size: 'xl',
  //           centered: true,
  //           scrollable: true,
  //           backdrop: 'static',
  //           keyboard: false
  //       } as any;
  //       let modalRef = this.modalService.open(this.editModal, params);
  //   }

  //   @ViewChild('ConfirmModal') confirmModal: TemplateRef<any>;
  //   openConfirmModal() {
  //       const params = {
  //           windowClass: 'alert-modal capture-modal',
  //           size: 'md',
  //           centered: true,
  //           scrollable: true,
  //           backdrop: 'static',
  //           keyboard: false
  //       } as any;
  //       let day = this.formAdd.days.filter(day => day.checked == true);
  //       if (
  //           this.formAdd.ShiftName == undefined ||
  //           !this.formAdd.ShiftName ||
  //           // !this.formAdd.LateTime ||
  //           !this.formAdd.BeginTime ||
  //           !this.formAdd.EndTime ||
  //           day.length == 0
  //       ) {
  //           this.alert.Error('กรุณาตรวจสอบข้อมูล');
  //       } else {
  //           let modalRef = this.modalService.open(this.confirmModal, params);
  //       }
  //   }
  //   @ViewChild('CancelModal') cancelModal: TemplateRef<any>;
  //   openCancelModal() {
  //       const params = {
  //           windowClass: 'alert-modal capture-modal',
  //           size: 'md',
  //           centered: true,
  //           scrollable: true,
  //           backdrop: 'static',
  //           keyboard: false
  //       } as any;
  //       let modalRef = this.modalService.open(this.cancelModal, params);
  //   }

  //   confirmSave() {
  //       this.PSSaveShiftWork();
  //   }
  //   async PSSaveShiftWork() {
  //       const days = this.formAdd.days;
  //       for (let index = 0; index < days.length; index++) {
  //           const item = days[index];
  //           this.formAdd[item.day] = item.checked ? 1 : 0;
  //       }
  //       const res = await this.api.PSSaveShiftWork(this.formAdd);
  //       if (res.successful) {
  //           this.initialFormAdd();
  //           this.modalService.dismissAll();
  //           this.alert.Success('บันทึกข้อมูลสำเร็จ', '', 3).then(async () => {
  //               await this.GetShiftWork();
  //           });
  //       } else {
  //           this.alert.ErrorNormal();
  //       }
  //   }
  //   confirmCancel() {
  //       this.modalService.dismissAll();
  //   }
}
