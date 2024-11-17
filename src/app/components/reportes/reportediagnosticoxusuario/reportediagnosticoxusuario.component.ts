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
  selector: 'app-reportediagnosticoxusuario',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reportediagnosticoxusuario.component.html',
  styleUrl: './reportediagnosticoxusuario.component.css'
})
export class ReportediagnosticoxusuarioComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private eS: UsuarioService) {}

  ngOnInit(): void {
    this.eS.getQuantity().subscribe(data=>{
      this.barChartLabels=data.map(item=>item.nombres)
      this.barChartData=[
        {
          data:data.map(item=>item.count),
          label:'Cantidad de Diagnosticos por Usuario',
          backgroundColor:['#2430e8','#f4c216','#373da0','#95b5ea'],
          borderColor:'#0d3475',
          borderWidth:1
        }
      ]
    })
  }
}
