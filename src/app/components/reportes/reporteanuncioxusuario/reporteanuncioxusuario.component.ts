import { Component, OnInit } from '@angular/core';
import {
  ChartDataset,
  ChartOptions,
  ChartType,
} from './../../../../../node_modules/chart.js/dist/types/index.d';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { AnuncioService } from '../../../services/anuncio.service';

Chart.register(...registerables);

@Component({
  selector: 'app-reporteanuncioxusuario',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reporteanuncioxusuario.component.html',
  styleUrl: './reporteanuncioxusuario.component.css'
})
export class ReporteanuncioxusuarioComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private dS: AnuncioService) {}

  ngOnInit(): void {
    this.dS.getQuantity().subscribe(data=>{
      this.barChartLabels=data.map(item=>item.nombres)
      this.barChartData=[
        {
          data:data.map(item=>item.count),
          label:'Cantidad de Anuncios por Usuario',
          backgroundColor:['#2430e8','#f4c216','#373da0','#95b5ea'],
          borderColor:'#0d3475',
          borderWidth:1
        }
      ]
    })
  }
}
