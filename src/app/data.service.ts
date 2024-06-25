import { Injectable } from '@angular/core';
import { indice } from 'src/indice';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  tableau_2019:indice[]=[
    {
      annne : 2010,
      indice_annne:1.566
    },
    {
      annne : 2011,
      indice_annne:1.492
    },
    {
      annne : 2012,
      indice_annne:1.421
    },
    {
      annne : 2013,
      indice_annne:1.353
    },
    {
      annne : 2014,
      indice_annne:1.287
    },
    {
      annne : 2015,
      indice_annne:1.223
    },
    {
      annne : 2016,
      indice_annne:1.161
    },
    {
      annne : 2017,
      indice_annne:1.103
    },
    {
      annne : 2018,
      indice_annne:1.049
    },
    {
      annne : 2019,
      indice_annne:1
    },

  ];

  tableau_2021:indice[]=[
    {
      annne : 2010,
      indice_annne:1.767
    },
    {
      annne : 2011,
      indice_annne:1.685
    },
    {
      annne : 2012,
      indice_annne:1.603
    },
    {
      annne : 2013,
      indice_annne:1.523
    },
    {
      annne : 2014,
      indice_annne:1.445
    },
    {
      annne : 2015,
      indice_annne:1.369
    },
    {
      annne : 2016,
      indice_annne:1.297
    },
    {
      annne : 2017,
      indice_annne:1.228
    },
    {
      annne : 2018,
      indice_annne:1.164
    },
    {
      annne : 2019,
      indice_annne:1.104
    },
    {
      annne : 2020,
      indice_annne:1.050
    },
    {
      annne : 2021,
      indice_annne:1
    },

  ];

  getIndiceForYear2019(year: number): number | undefined {
    const entry = this.tableau_2019.find(item => item.annne === year);
    return entry ? entry.indice_annne : undefined;
  }
  getIndiceForYear2021(year: number): number | undefined {
    const entry = this.tableau_2021.find(item => item.annne === year);
    return entry ? entry.indice_annne : undefined;
  }

  
}
