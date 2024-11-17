import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { Component, OnInit } from '@angular/core';
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
    this.uS.obtenerCantidadEnfermades().subscribe((data) => {
      console.log("Datos recibidos del backend:", data);
      this.barChartLabels = data.map((item) => item.nombreUsuario);
      this.barChartData = [
        {
          data: data.map((item) => item.CantidadEnfermedades),
          label: 'Cantidad Enfermedades',
          backgroundColor: ['#d7fc58', '#58fc64', '#a2f737', '#91ee1b'],

          borderColor: '#0d3475',
          borderWidth: 1.4,
        },
      ];
      console.log("Labels:", this.barChartLabels);
      console.log("Data:", this.barChartData);
      
    });
  }
  
}
