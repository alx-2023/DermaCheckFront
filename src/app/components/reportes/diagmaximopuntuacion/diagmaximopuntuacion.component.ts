import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { DiagnosticoService } from '../../../services/diagnostico.service';
Chart.register(...registerables);

@Component({
  selector: 'app-diagmaximopuntuacion',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './diagmaximopuntuacion.component.html',
  styleUrl: './diagmaximopuntuacion.component.css'
})
export class DiagmaximopuntuacionComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = []; 
  barChartType: ChartType = 'pie'; 
  barChartLegend = true; 
  barChartData: ChartDataset[] = [];

  constructor(private dS: DiagnosticoService) {}

  ngOnInit(): void {
    this.dS.diagnosticoMaxPunt().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.idDiagnostico.toString());
      this.barChartData = [
        {
          data: data.map((item) => item.puntuacion),
          label: 'Puntuación',
          backgroundColor: ['#d7fc58', '#58fc64', '#a2f737', '#91ee1b'], 
          borderColor: '#0d3475', 
          borderWidth: 1
        },
      ];
    });
  }
}
