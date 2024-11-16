import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { UsuarioService } from '../../../../services/usuario.service';

Chart.register(...registerables);
@Component({
  selector: 'app-reporte-cantidad-creditos',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reporte-cantidad-creditos.component.html',
  styleUrl: './reporte-cantidad-creditos.component.css'
})
export class ReporteCantidadCreditosComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private uS: UsuarioService) {}
  ngOnInit(): void {
    this.uS.obtenerCantidad().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.NombreUsuario);
      this.barChartData = [
        {
          data: data.map((item) => item.CantidadCreditos),
          label: 'Cantidad de Creditos por usuario',
          backgroundColor: ['#2C2894', '#2430e8', '#070299'],
          borderColor: '#160FDE',
          borderWidth: 1,
        },
      ];
    });
  }

}
