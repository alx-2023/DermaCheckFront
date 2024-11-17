import { Component, OnInit } from "@angular/core";
import { Chart, ChartDataset, ChartOptions, ChartType, registerables } from "chart.js";
import { BaseChartDirective } from "ng2-charts";
import { ArticulosdermatologicosService } from "../../../services/articulosdermatologicos.service";


Chart.register(...registerables);

@Component({
    selector: 'app-revistasxusuario',
    standalone: true,
    imports: [BaseChartDirective],
    templateUrl: './revistasporusuario.component.html',
    styleUrl: './revistasporusuario.component.css'
})
export class revistasporusuarioComponent implements OnInit {
    barChartOptions: ChartOptions = {
        responsive: true,
    };
    barChartLabels: string[] = [];
    barChartType: ChartType = 'pie';
    barChartLegend = true;
    barChartData: ChartDataset[] = [];
    constructor(private aS: ArticulosdermatologicosService) {}
    
    ngOnInit(): void {
       this.aS.getQuantity().subscribe(data =>{
        this.barChartLabels=data.map(item => item.nombre)
        this.barChartData=[
            {
                data: data.map(item=>item.cantidad),
                label: 'Cantidad de Recuperaciones por Usuario',
                backgroundColor:['#2430e8','#f4c216','#373da0','#95b5ea'],
                borderColor:'#0d3475',
                borderWidth: 1
            }
        ]
       }) 
    }
}