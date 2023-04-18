import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { MonthlyInterest } from '../interfaces/monthlyInterest';
import { Chart } from 'chart.js/auto';
import { color } from 'chart.js/helpers';

@Component({
  selector: 'app-pie-loan',
  templateUrl: './pie-loan.component.html',
  styleUrls: ['./pie-loan.component.scss'],
})
export class PieLoanComponent implements OnChanges {
  @Input() loanInfo?: MonthlyInterest | null;
  public chart: any;

  // ngOnInit(): void {
  //   this.loanInfo?.subscribe((loan) => {
  //     this.chart = new Chart('myChart', {
  //       type: 'pie',
  //       data: {
  //         labels: ['Loan Amount', 'Total Interest Paid'],
  //         datasets: [
  //           {
  //             data: [loan.loanAmount, loan.totalInterestAmount],
  //             backgroundColor: ['#0883ff', '#f3067c'],
  //             borderWidth: 1,
  //             borderColor: '#fff', // Change border color to white
  //           },
  //         ],
  //       },
  //       options: {
  //         responsive: true,
  //         maintainAspectRatio: false,
  //         plugins: {
  //           legend: {
  //             position: 'bottom',
  //             labels: {
  //               color: '#ffffff',
  //             },
  //           },
  //           title: {
  //             display: true,
  //             text: 'Loan Summary',
  //             color: '#ffffff',
  //           },
  //         },
  //       },
  //     });
  //   });
  // }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loanInfo'] && changes['loanInfo'].currentValue) {
      this.chart = new Chart('myChart', {
        type: 'pie',
        data: {
          labels: ['Loan Amount', 'Total Interest Paid'],
          datasets: [
            {
              data: [
                changes['loanInfo'].currentValue.loanAmount,
                changes['loanInfo'].currentValue.totalInterestAmount,
              ],
              backgroundColor: ['#0883ff', '#f3067c'],
              borderWidth: 1,
              borderColor: '#fff', // Change border color to white
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#ffffff',
              },
            },
            title: {
              display: true,
              text: 'Loan Summary',
              color: '#ffffff',
            },
          },
        },
      });
    }
  }
}
