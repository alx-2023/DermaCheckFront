import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { routes } from '../../../app.routes';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listimage',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './listimage.component.html',
  styleUrl: './listimage.component.css',
})
export class ListimageComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  edicion: boolean = false;
  idDiagnostico: number = 0;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    routes;
    this.route.params.subscribe((data: Params) => {
      this.idDiagnostico = data['idDiagnostico'];
      this.edicion = data['idDiagnostico'] != null;
    });
    this.form = this.fb.group({
      imgPrincipal: ['', Validators.required],
      image2: ['', Validators.required],
      image3: ['', Validators.required],
      image4: ['', Validators.required],
    });
  }
}
