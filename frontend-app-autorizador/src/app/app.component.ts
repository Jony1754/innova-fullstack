import { Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { catchError, of, throwError } from 'rxjs';
import { SearchResponse } from 'src/interfaces/CuentaResponse';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private apiUrl = environment.apiUrl;
  public resultData = <SearchResponse[]>[];
  public jsonData = '';
  public consoleMode = false;
  public apiResponses = <SearchResponse[]>[];
  public cuentaForm: FormGroup;
  public transaccionForm: FormGroup;
  public selectedFormType: string = 'cuenta';
  public formTypes: any[];

  constructor(
    private primengConfig: PrimeNGConfig,
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.cuentaForm = this.formBuilder.group({
      id: ['', Validators.required],
      tarjetaActiva: [false, Validators.required],
      limiteDisponible: ['', Validators.required],
    });

    this.transaccionForm = this.formBuilder.group({
      id: [0, Validators.required],
      comerciante: ['', Validators.required],
      cantidad: [0, Validators.required],
      tiempo: ['', Validators.required],
    });

    this.formTypes = [
      { label: 'Cuenta', value: 'cuenta' },
      { label: 'Transacción', value: 'transaccion' },
    ];
  }

  public toggleMode(): void {
    this.consoleMode = !this.consoleMode;
  }

  public processJsonData(): void {
    console.log('jsonData: ', this.jsonData);
    const lines = this.jsonData.split('\n');
    console.log('lines: ', lines);
    this.apiResponses = [];

    for (const line of lines) {
      try {
        const data = JSON.parse(line);

        if (data.cuenta) {
          console.log('data.cuenta: ', data.cuenta);
          this.apiService
            .enviarDatos(`${this.apiUrl + '/cuenta'}`, data.cuenta)
            .pipe<SearchResponse>(
              catchError((err) => {
                console.log(err);
                return of(err.error);
              })
            )
            .subscribe((response: SearchResponse) => {
              this.apiResponses.push(response);
            });
        } else if (data.transaccion) {
          this.apiService
            .enviarDatos(`${this.apiUrl + '/transaccion'}`, data.transaccion)
            .pipe<SearchResponse>(
              catchError((err) => {
                console.log(err);
                return of(err.error);
              })
            )
            .subscribe((response: SearchResponse) => {
              this.apiResponses.push(response);
            });
        }
      } catch (error) {
        console.error('Error al analizar el JSON:', error);
      }
    }
  }

  onSubmit() {
    let data;
    let url = this.apiUrl;

    if (this.selectedFormType === 'cuenta') {
      data = {
        id: this.cuentaForm.value.id,
        tarjeta_activa: this.cuentaForm.value.tarjetaActiva,
        limite_disponible: this.cuentaForm.value.limiteDisponible,
      };
      url += '/cuenta';
    } else if (this.selectedFormType === 'transaccion') {
      data = {
        id: Number(this.transaccionForm.value.id),
        comerciante: this.transaccionForm.value.comerciante,
        cantidad: Number(this.transaccionForm.value.cantidad),
        tiempo: new Date(this.transaccionForm.value.tiempo).toISOString(),
      };

      url += '/transaccion';
    }
    console.log('calling onSubmit with url: ', url, ' and data: ', data);

    this.apiService
      .enviarDatos(url, data)
      .pipe<SearchResponse>(
        catchError((err) => {
          console.log(err);
          return of(err.error);
        })
      )
      .subscribe((response) => {
        console.log('response: ', response);
        return this.apiResponses.unshift(response);
      });
  }
  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
