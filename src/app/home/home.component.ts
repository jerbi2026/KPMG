import { indice } from 'src/indice';
import { montant } from 'src/montant';
import { DataService } from './../data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private _date_acq: Date = new Date();
  cout_acq: number = 0;
  taux_amortissement: number = 0;
  date_rev: number = 2019;
  periode: number = 0;
  amortissement_cumule: number = 0;
  vcn :number = 0;

  montant_amortissement_cumule = 0;

  table_rev:montant[]=[];

  valeur_acquisition_rev = 0;

  vcn_apres_rev = 0;
  

  indice_anne=0;

  type_immob = 'immobilisation';

  isTauxAmortissementDisabled: boolean = false;
  isDateRevDisabled: boolean = false;


  constructor(private DataService: DataService) {
    this._date_acq = new Date();
  }

  get date_acq(): string {
    return this._date_acq.toISOString().split('T')[0];
  }

  set date_acq(value: string) {
    this._date_acq = new Date(value);
  }

  onTypeChange() {
    if (this.type_immob === 'terrain') {
      this.taux_amortissement = 0;
      this.isTauxAmortissementDisabled = true;
      this.date_rev = 2021;
      this.isDateRevDisabled = true;
    } else if (this.type_immob === 'immeuble_batis') {
      this.isTauxAmortissementDisabled = false;
      this.date_rev = 2021;
      this.isDateRevDisabled = true;
    } else {
      this.isTauxAmortissementDisabled = false;
      this.isDateRevDisabled = false;
    }
  }

  calcul_vcn() {
    if (!(this._date_acq instanceof Date) || isNaN(this._date_acq.getTime())) {
      console.error('date_acq is not a valid Date object');
      return;
    }

    const month = this._date_acq.getMonth();
    const day = this._date_acq.getDate();
    const year = this._date_acq.getFullYear();
    if(day>=5){
      this.periode = (360 - (month * 30+day)) / 360;
    }
    else{
      this.periode = (360 - (month * 30)) / 360;
    }
    

    const nb_annee = this.date_rev - year;
    const taux_amortissement = this.taux_amortissement / 100;

    this.amortissement_cumule = this.cout_acq * taux_amortissement * this.periode;
    
    let mont_rev = 0;
        let ligne_tab : montant={
          annee: 0,
          montant_amortissement: 0,
          indice: 0,
          montant_rev: 0
      }
    if(this.date_rev==2019){
        const indice = this.DataService.getIndiceForYear2019(year);
       
      if(indice){
        this.indice_anne = indice;
        this.valeur_acquisition_rev = this.cout_acq * indice;
          mont_rev = this.amortissement_cumule*indice;
          ligne_tab ={
            annee: year,
            montant_amortissement: this.amortissement_cumule,
            indice:indice,
            montant_rev: mont_rev
        };
        
    }
    }
    else{
      const indice = this.DataService.getIndiceForYear2021(year);
      
      if(indice){
        this.indice_anne = indice;
        this.valeur_acquisition_rev = this.cout_acq * indice;
          mont_rev = this.amortissement_cumule*indice;
          ligne_tab ={
            annee: year,
            montant_amortissement: this.amortissement_cumule,
            indice:indice,
            montant_rev: mont_rev
        };
        
    }

    }
    
    this.table_rev.push(ligne_tab)


    for (let i = 1; i < nb_annee+1; i++) {
      const year = this._date_acq.getFullYear() + i;
      let amortis_annee =  this.cout_acq * taux_amortissement;
      if(this.date_rev==2019){
        const indice = this.DataService.getIndiceForYear2019(year);
        
        if(indice){
          mont_rev = amortis_annee*indice;
          ligne_tab ={
            annee: year,
            montant_amortissement: amortis_annee,
            indice:indice,
            montant_rev: mont_rev
        };
    }
    }
    else{
      const indice = this.DataService.getIndiceForYear2021(year);
        
      if(indice && mont_rev){
          mont_rev = amortis_annee*indice;
          ligne_tab ={
            annee: year,
            montant_amortissement: amortis_annee,
            indice:indice,
            montant_rev: mont_rev
        };
    }

    }
    this.table_rev.push(ligne_tab);

     
    this.amortissement_cumule += this.cout_acq * taux_amortissement;
    if(this.amortissement_cumule>= this.cout_acq){
      this.amortissement_cumule = this.cout_acq;
      this.table_rev.pop();
      break;
    }
    }

    for (let i =0 ; i<this.table_rev.length;i++){
      this.montant_amortissement_cumule += this.table_rev[i].montant_rev;
    }
    


    this.vcn = this.cout_acq-this.amortissement_cumule;
    this.vcn_apres_rev = this.valeur_acquisition_rev -this.montant_amortissement_cumule; 
    
    
    
    let resultat = document.getElementById('resultat');
    if(resultat){
      resultat.style.display='block';
    }
  }

  

}
