import {Component, Input, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {FormsService} from "../forms.service";
import {CCValidator} from "../../validators/cc.validator";
import {ApiService} from "../../API/api.service";
@Component({
  selector: 'app-ccForm',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [FormsService, ApiService]
})
export class FormComponent implements OnInit {
  paymentForm: FormGroup;
  ccType: string;
  formSent: boolean = false;
  @Input() selectedForm: string;
  @Input() amount: number = 0;
  constructor(private formsService: FormsService,
              private api: ApiService) { }

  ngOnInit() {
       this.paymentForm = this.formsService.forms[this.selectedForm];
       this.paymentForm.valueChanges.subscribe((data) => {
         console.log(this.amount);
         if(data.cardNumber != null){
           let type = CCValidator.getCardType(`${data.cardNumber}`);
           if(type == 'none'){
             this.ccType = null;
           }else{
             this.ccType = type;
           }
         }
       })
  }

  onSubmit() {
    this.api.sendPayment(this.paymentForm.value).then(() => {
      this.formSent = true;
    })

  }
}