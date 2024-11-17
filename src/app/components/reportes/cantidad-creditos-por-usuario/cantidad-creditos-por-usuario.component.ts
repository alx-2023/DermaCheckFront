import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-cantidad-creditos-por-usuario',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './cantidad-creditos-por-usuario.component.html',
  styleUrl: './cantidad-creditos-por-usuario.component.css'
})
export class CantidadCreditosPorUsuarioComponent implements OnInit{
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
      console.log("Datos recibidos del backend:", data);
      this.barChartLabels = data.map((item) => item.NombreUsuario);
      this.barChartData = [
        {
          
          data: data.map((item) => item.CantidadCreditos),
           
          label: 'Creditos',
          backgroundColor: ['#d7fc58', '#58fc64', '#a2f737', '#91ee1b'], 
          borderColor: '#0d3475', 
          borderWidth: 1
        },
      ];
    }
  );
     
  }
  
}

