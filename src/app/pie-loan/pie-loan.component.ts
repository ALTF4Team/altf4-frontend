import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MonthlyInterest } from '../interfaces/monthlyInterest';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-pie-loan',
  templateUrl: './pie-loan.component.html',
  styleUrls: ['./pie-loan.component.scss'],
})
export class PieLoanComponent implements OnInit {
  @Input() loanInfo?: Observable<MonthlyInterest>;
  public chart: any;

  ngOnInit(): void {
    this.loanInfo?.subscribe((loan) => {
      this.chart = new Chart('myChart', {
        type: 'pie',
        data: {
          labels: ['Loan Amount', 'Total Interest Paid'],
          datasets: [
            {
              data: [loan.loanAmount, loan.totalInterestAmount],
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
            tooltip: {
              callbacks: {
                label: function (context) {
                  return context.dataset.label || '';
                },
              },
            },
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
    });
  }
}
