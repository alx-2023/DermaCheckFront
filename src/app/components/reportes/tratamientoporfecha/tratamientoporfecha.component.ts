import { Component, OnInit } from '@angular/core';
import { TratamientoService } from '../../../services/tratamiento.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tratamientoporfecha',
  standalone: true,
  imports: [
    BaseChartDirective,
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './tratamientoporfecha.component.html',
  styleUrl: './tratamientoporfecha.component.css',
})
export class TratamientoporfechaComponent {
  fechaInicio!: Date;
  tratamientos: any[] = [];
  showChart = false;

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private tratamientoService: TratamientoService) {}

  buscarTratamientosPorFecha(): void {
    if (this.fechaInicio) {
      this.tratamientoService
        .buscarPorFecha(this.fechaInicio)
        .subscribe((data) => {
          this.tratamientos = data;
          if (data.length > 0) {
            this.barChartLabels = data.map((t) => t.nombreTratamiento);

            const duraciones = data.map((t) => {
              const fechaInicio = new Date(t.fechaInicio);
              const fechaFinal = new Date(t.fechaFinal);
              const duracion = Math.floor(
                (fechaFinal.getTime() - fechaInicio.getTime()) /
                  (1000 * 3600 * 24)
              );
              return duracion;
            });

            this.barChartData = [
              {
                data: duraciones,
                label: 'Duración de los tratamientos (días)',
                backgroundColor: ['#4285F4', '#34A853', '#FBBC05', '#EA4335'],
              },
            ];
            this.showChart = true;
          } else {
            this.showChart = false;
          }
        });
    }
  }
}
