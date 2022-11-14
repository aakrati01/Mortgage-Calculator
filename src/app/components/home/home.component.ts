import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  period = [
    {value:  0 , viewValue: ' '},
    {value: 1 , viewValue: ' 1 year'},
    {value: 2 , viewValue: ' 2 years'},
    {value: 3 , viewValue: ' 3 years'},
    {value: 4 , viewValue: ' 4 years'},
    {value: 5 , viewValue: ' 5 years'},
    {value: 6 , viewValue: ' 6 years'},
    {value: 7 , viewValue: ' 7 years'},
    {value: 8 , viewValue: ' 8 years'},
    {value: 9 , viewValue: ' 9 years'},
    {value: 10 , viewValue: ' 10 years'},
    {value: 11 , viewValue: ' 11 years'},
    {value: 30 , viewValue: ' 30 years'},
  ];
  frequency = [
    {value: 'acceleratedWeekly', viewValue: 'Accelerated weekly '},
    {value: 'weekly', viewValue: 'Weekly'}, 
    {value: 'acceleratedBiWeekly', viewValue: 'Accelerated Bi-weeekly '},
    {value: 'semiMonthly', viewValue: 'Semi-Monthly(24x per year)'},
    {value: 'monthly', viewValue: 'Monthly (12x per year)'},
  ];

  paymentMonthly: any;
  mAmt : any;
  numberOfPayments: any;
  ratePaymentObj: any;
  interest : any = [];
  sumInterestPayment: any;
  completeObj : any;

  constructor(private fb: FormBuilder) {}

    profileForm = this.fb.group({
      mortgageAmount: [null, Validators.required],
      interestRate: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      period: [ null, Validators.required],
      frequency: [ '', Validators.required],
      term: [ null, Validators.required],
    });

  ngOnInit(): void {}
  
  onSubmit() {
    // TODO: Use EventEmitter with form value
    // @ts-ignore: Object is possibly 'null'
    this.profileForm.value.interestRate = this.profileForm.value.interestRate /100;
    // @ts-ignore: Object is possibly 'null'
    const effectiveRate = Math.pow(1 + this.profileForm.value?.interestRate / 2, 2) - 1;
    const monthlyPeriodicRate = Math.pow(1 + effectiveRate, 1 / 12) - 1;
    // @ts-ignore: Object is possibly 'null'
    const monthlyPayment: number = ((monthlyPeriodicRate * this.profileForm.value?.mortgageAmount) / (1 - Math.pow(1 + monthlyPeriodicRate, -this.profileForm.value?.period*12))).toFixed(2);

    let periodicRate: any = 0;
    let periodicPayment: any = 0;

    switch (this.profileForm.value.frequency) {
      case "monthly":
         // @ts-ignore: Object is possibly 'null'
        this.numberOfPayments = (this.profileForm.value?.period * 12),
        this.paymentMonthly = monthlyPayment;
        periodicPayment = monthlyPayment;
        periodicRate = monthlyPeriodicRate;
        break;
      case "semiMonthly":
         // @ts-ignore: Object is possibly 'null'
        this.numberOfPayments = (this.profileForm.value?.period * 24),
        periodicPayment = (monthlyPayment / 2).toFixed(2);
        periodicRate = Math.pow(1 + effectiveRate, 1 / 24) - 1;
        break;
      case "acceleratedBiWeekly":
        periodicPayment = (monthlyPayment / 2).toFixed(2);
        periodicRate = Math.pow(1 + effectiveRate, 1 / 26) - 1;
        this.paymentMonthly = monthlyPayment;
        break;
      case "biWeekly":
         // @ts-ignore: Object is possibly 'null'
        this.numberOfPayments = (this.profileForm.value?.period * 26),
        periodicPayment = ((monthlyPayment * 12) / 26).toFixed(2);
        periodicRate = Math.pow(1 + effectiveRate, 1 / 26) - 1;
        this.paymentMonthly = monthlyPayment;
        break;
      case "weekly":
         // @ts-ignore: Object is possibly 'null'
        this.numberOfPayments = (this.profileForm.value?.period * 52),
        periodicPayment = ((monthlyPayment * 12) / 52).toFixed(2);
        periodicRate = Math.pow(1 + effectiveRate, 1 / 52) - 1;
        this.paymentMonthly = monthlyPayment;
        break;
      case "acceleratedWeekly":
        console.log(  monthlyPayment / 4);
        periodicPayment = (monthlyPayment / 4).toFixed(2);
        periodicRate = Math.pow(1 + effectiveRate, 1 / 52) - 1;
        this.paymentMonthly = monthlyPayment;
        break;
    }

    this.ratePaymentObj = { effectiveRate, periodicPayment, periodicRate} as const
    this.mAmt = this.profileForm.value?.mortgageAmount
    console.log("The object::", this.ratePaymentObj);

    let balance = this.mAmt;
    let period = 0;
    const paymentHistory = [];

    while (true) {
      const interest = balance * periodicRate;
      let payment = Number(periodicPayment);
      let principal = payment - interest;
      let startingBalance = balance;
      balance = balance - principal;
      if (balance < 0) {
        payment = payment + balance;
        principal = payment - interest;
        balance = 0;
      }
  
      paymentHistory.push({
        period,
        payment,
        principal,
        interest,
        startingBalance,
        endingBalance: balance,
      });
      if (balance === 0) {
        break;
      }
      period++;
    }

    console.log('paymentHistory', paymentHistory);
    // this.interest = (paymentHistory[0].interest).toFixed(2);
    paymentHistory.map((item:any) => {
      this.interest.push(item.interest)
    })
    console.log(this.interest)
    // return paymentHistory;
    let sumInterest = 0; 
    for (let i = 0; i < this.interest.length; i += 1) {
        sumInterest += this.interest[i]
      }
    console.log('sumInterest::',sumInterest) 
    this.sumInterestPayment = sumInterest.toFixed(2);
    this.completeObj = paymentHistory;
    
  }

}
