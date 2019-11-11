import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Chart } from 'angular-highcharts';

import { AuthUser, Programmi, Schede } from '../model';
import { DashboardService } from '../services/dashboard.service';
@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css']
})
export class ProfiloComponent implements OnInit {

  authUser: AuthUser;
  countdown: any;
  massimale_squat: number;
  massimale_panca: number;
  massimale_stacco: number;
  id_specializzazione: number;
  chart_squat: Chart;
  chart_panca: Chart;
  chart_stacco: Chart;
  prestazioni: any[];

  constructor(
    private dashboardService:DashboardService,
    private spinner: NgxSpinnerService
  ){}

  ngOnInit(){
    this.authUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.id_specializzazione = this.authUser.id_specializzazione;
    this.spinner.show();
    setTimeout(() => {
      if(this.authUser.id_specializzazione == 1){
        this.dashboardService.getProgramma(this.authUser.id_atleta).subscribe((data: Programmi[]) => {
          let programma=null;
          for(let dato of data){
            if(programma == null){
              programma = dato;
            }else if(programma.data_fine < dato.data_inizio){
              programma = dato;
            }
          }
          this.countdown = programma.data_fine;
        });
      }else{
        this.dashboardService.getScheda(this.authUser.id_atleta).subscribe((data: Schede[]) => {
          let scheda=null;
          for(let dato of data){
            if(scheda == null){
              scheda = dato;
            }else if(scheda.data_fine < dato.data_inizio){
              scheda = dato;
            }
          }
          this.countdown = scheda.data_fine;
        });
      }
      this.dashboardService.getMassimaleGrafico(this.authUser.id_atleta).subscribe((data: any[]) => {
        this.prestazioni = data;
        this.setupChart(data);
      });
      this.dashboardService.getMassimale(this.authUser.id_atleta).subscribe((data: any) => {
        for(let dato of data){
          if(dato[0].peso > 0){
            if(dato[0].descrizione == "Panca piana"){
              this.massimale_panca = dato[0].peso;
            }else if(dato[0].descrizione == "Squat"){
              this.massimale_squat = dato[0].peso;
            }else if(dato[0].descrizione == "Stacco da terra"){
              this.massimale_stacco = dato[0].peso;
            }
          }
        }
      });
      this.spinner.hide();
    }, 1000);
  }

  setupChart(prestazioni){
    let vet_panca = [];
    let vet_squat = [];
    let vet_stacco = [];
    for(let prestazione of prestazioni){
      if(prestazione.id_esercizio == 1){
        vet_squat.push(prestazione);
      }
      if(prestazione.id_esercizio == 2){
        vet_panca.push(prestazione);
      }
      if(prestazione.id_esercizio == 3){
        vet_stacco.push(prestazione);
      }
    }
    let chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Grafico squat'
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Squat',
        data: [],
        type: undefined,
      }]
    });
    for(let squat of vet_squat){
      chart.addPoint(+squat.peso);
    }
    this.chart_squat = chart;
    let chart_panca = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Grafico Panca'
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Panca',
        data: [],
        type: undefined,
      }]
    });
    for(let panca of vet_panca){
      chart_panca.addPoint(+panca.peso);
    }
    this.chart_panca = chart_panca;
    let chart_stacco = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Grafico Stacco da terra'
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Stacco da terra',
        data: [],
        type: undefined,
      }]
    });
    for(let stacco of vet_stacco){
      chart_stacco.addPoint(+stacco.peso);
    }
    this.chart_stacco = chart_stacco;
  }
}
