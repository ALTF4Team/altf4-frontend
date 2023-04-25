import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MonthlyInterest } from '../interfaces/monthlyInterest';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-pie-loan',
  templateUrl: './pie-loan.component.html',
  styleUrls: ['./pie-loan.component.scss'],
})
export class PieLoanComponent implements OnChanges {
  @Input() loanInfo?: MonthlyInterest | null;
  public chart: any;

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
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  const value = context.formattedValue || context.raw;
                  if (value) {
                    label += value + ' EUR';
                  }
                  return label;
                },
              },
            },
            legend: {
              position: 'bottom',
              align: 'start',

              labels: {
                color: '#ffffff',
                font: {
                  size: 16,
                },
                padding: 20,
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
