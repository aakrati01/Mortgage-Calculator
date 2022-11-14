import { Component, Input, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  @Input() principalAmt: any;
  @Input() numberOfPayments: any;
  @Input() mortgageAmt: any;
  @Input() interest: any;
  @Input() sumInterestPayment: any;
  @Input() completeObj: any;

  highchart : any
  payment: any =[];
  endingBalance: any = [];
  constructor() { }

  ngOnInit(){ }

  ngOnChanges(){
    this.completeObj?.map((el:any) => {
      this.payment.push(el.period)
      this.endingBalance.push(el.endingBalance)
    })
    this.highchart = new Chart({
      chart: {
        type: 'area',
        marginTop: 60
      },
      title: {
        text: 'Payment History',
        style : {
          marginTop: 60
        }
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: this.payment,
        tickInterval: 20,
        title: { text: 'Number of Payments' },
      },
      yAxis: {
        categories : this.principalAmt,
        tickInterval: 5000,
        title: { text: 'CAD $' },
        min: 0,
      },
      series: [  
        {
          type:'area',  
          name: 'Regular Payments',
          data:  this.endingBalance//dynamic data
        }
      ]
      });
  }
}
