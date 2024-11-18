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
  selector: 'app-cantidad-enfermedadespor-usuario',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './cantidad-enfermedadespor-usuario.component.html',
  styleUrl: './cantidad-enfermedadespor-usuario.component.css'
})
export class CantidadEnfermedadesporUsuarioComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private uS: UsuarioService) {}

  ngOnInit(): void {
    this.uS.obtenerCantidadEnfermades().subscribe(data=>{
      this.barChartLabels=data.map(item=>item.nombreUsuario)
      this.barChartData=[
        {
          data:data.map(item=>item.cantidadEnfermedades),
          label:'Cantidad de Enfermedades por Usuario',
          backgroundColor:['#2430e8','#f4c216','#373da0','#95b5ea'],
          borderColor:'#0d3475',
          borderWidth:1
        }
      ]
    })
  }
  }
