import { Component, OnInit, TemplateRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule } from '@angular/forms';
import { NgbModal,NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDatepickerModule,NgbDateStruct,NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { content } from 'googleapis/build/src/apis/content';
import { ApiService } from "../shared/services/api.service";
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';


interface Option {
  level: string;
  id: string;
  label: string;
}

interface Horoscopes {
  id: string;
  idn: number;
  timename: string;
  topic: string;
  type: string;
  zodic: string;
  startdate: string;
  enddate: string;
  detail: string;
}


@Component({
  selector: "app-predict",
  templateUrl: "./predict.component.html",
  styleUrls: ["./predict.component.scss"],
  styles: [
		`
			.custom-day {
				text-align: center;
				padding: 0.185rem 0.25rem;
				display: inline-block;
				height: 2rem;
				width: 2rem;
			}
			.custom-day.focused {
				background-color: #e6e6e6;
			}
			.custom-day.range,
			.custom-day:hover {
				background-color: rgb(2, 117, 216);
				color: white;
			}
			.custom-day.faded {
				background-color: rgba(2, 117, 216, 0.5);
			}
		`,
	]
})
export class PredictComponent implements OnInit {
  // EditModal
  editModalVisible = false;

  openEditModal() {
    this.editModalVisible = true;
  }
  // datepicker
  hoveredDate: NgbDate | null = null;

	fromDate: NgbDate;
	toDate: NgbDate | null = null;
  // ****
  horoscopesform!: FormGroup;
  isActive: boolean;

  openModal(value) {
    value.active = true
  }

  closeModal(value) {
    value.active = false
  }


  dataForm: FormGroup;
  horolist: Horoscopes[] = [];


  constructor(
    private formbuilder: FormBuilder,
    private modalService: NgbModal,
    private apiService: ApiService,
    // datepicker
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) { 
    this.fromDate = calendar.getToday();
		this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  // datepicker
  onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}
  // **********

  onSubmit() { }
  PredictList1: Option[] = [];
  PredictList2: Option[] = [];
  PredictList3: Option[] = [];
  PredictList4: Option[] = [];
  editMode = false;
  formModel = {
    predict1: null,
    predict2: null,
    predict3: null,
    predict4: null,
  };

  ngOnInit() {
    // Select Predict From Dropdown
    this.apiService.getPredictList().subscribe((res: any) => {
      this.PredictList1 = res.data.map((data: any) => ({
        id: data.value,
        level: data.lv,
        label: data.lists,
      }));
      console.log("getPredictList", this.PredictList1);
      console.log("formModel", this.formModel);
    });
    // Fetch Data From Api to Table
    this.apiService.getHoroScopes().subscribe((res: any) => {
      this.horolist = res.data.map((data: any) => ({
        idn: data.id,
        timename: data.dooduang_time_name,
        topic: data.dooduang_topic,
        type: data.topic_type,
        zodic: data.zodiac,
        startdate: data.start_date,
        enddate: data.end_date,
        detail: data.dooduang_detail
        // ^^ คำทำนาย
      }));
      console.log("getHoroScopes", this.horolist);
    });

    // Add data
    this.horoscopesform = this.formbuilder.group({
      predict1: ['', Validators.required],
      predict2: ['', Validators.required],
      predict3: ['', Validators.required],
      predict4: ['', Validators.required],
      predictDetail: ['', Validators.required],
    })
  }
  addhoroscopes (data:any) {
    console.log(this.formModel.predict1)
    // this.apiService.getHoroScopes(data).subscribe((res=>{
    //   this.horoscopesform.reset();
    // }))
   
  }
  CancelData(data:any){
    this.horoscopesform.reset();
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
      if (this.formModel.predict1 === "null") {
          this.formModel.predict2 = null;
          this.formModel.predict3 = null;
          this.formModel.predict4 = null;
      }
    });
    console.log("getPredictList", this.PredictList2);
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
      if (this.formModel.predict2 === "null") {
        this.formModel.predict3 = null;
        //   this.formModel.predict4 = null;
      }
    });
    console.log("getPredictList", this.PredictList3);
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

      if (this.formModel.predict3 === "null") {
        this.formModel.predict4 = null;
      }
    });
    console.log("getPredictList", this.PredictList4);
  }
}


