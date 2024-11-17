import { Component, OnInit } from "@angular/core";
import { Chart, ChartDataset, ChartOptions, ChartType, registerables } from "chart.js";
import { BaseChartDirective } from "ng2-charts";
import { RecuperacionService } from "../../../services/recuperacion.service";


Chart.register(...registerables);

@Component({
    selector: 'app-recuperacionesxusuario',
    standalone: true,
    imports: [BaseChartDirective],
    templateUrl: './recuperacionesporusuario.component.html',
    styleUrl: './recuperacionesporusuario.component.css'
})
export class recuperacionesxusuarioComponent implements OnInit {
    barChartOptions: ChartOptions = {
        responsive: true,
    };
    barChartLabels: string[] = [];
    barChartType: ChartType = 'pie';
    barChartLegend = true;
    barChartData: ChartDataset[] = [];
    constructor(private rS: RecuperacionService) {}
    
    ngOnInit(): void {
       this.rS.getQuantity().subscribe(data =>{
        this.barChartLabels=data.map(item => item.nombre)
        this.barChartData=[
            {
                data: data.map(item=>item.count),
                label: 'Cantidad de Recuperaciones por Usuario',
                backgroundColor:['#2430e8','#f4c216','#373da0','#95b5ea'],
                borderColor:'#0d3475',
                borderWidth: 1
            }
        ]
       }) 
    }
}