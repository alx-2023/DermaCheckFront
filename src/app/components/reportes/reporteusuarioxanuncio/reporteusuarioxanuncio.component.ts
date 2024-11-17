import { Component, OnInit } from '@angular/core';
import {
  ChartDataset,
  ChartOptions,
  ChartType,
} from './../../../../../node_modules/chart.js/dist/types/index.d';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { UsuarioService } from '../../../services/usuario.service';

Chart.register(...registerables);
@Component({
  selector: 'app-reporteusuarioxanuncio',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reporteusuarioxanuncio.component.html',
  styleUrl: './reporteusuarioxanuncio.component.css'
})
export class ReporteusuarioxanuncioComponent implements OnInit {
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
      this.barChartLabels = data.map((item) => item.nombreUsuario); // de toda la data a través de map itere y solo se quiere el nombre
      this.barChartData = [
        {
          data: data.map((item) => item.cantidadCreditos),
          label: 'Cantidad de Creditos por Usuario',
          backgroundColor: ['#2430e8', '#575fd4', '#373da0', '#95b5ea'],  
          borderColor: '#0d3475',  
          borderWidth: 1  
        },
      ];
    });

}
}
