import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openModel(){
    const modelDiv = document.getElementById('myModal');
    if (modelDiv!=null){
      modelDiv.style.display='block';
    }
  }
  
  CloseModel(){
    const modelDiv = document.getElementById('myModal');
    if (modelDiv!=null){
      modelDiv.style.display='none';
    }
  }

}
