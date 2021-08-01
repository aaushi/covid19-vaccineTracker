import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { vaccinationData } from '../modals/vaccinationData';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  arr;
  VaccinationData: vaccinationData[] = [];
  private vaccineURL = 'http://api.covid19india.org/csv/latest/vaccine_doses_statewise_v2.csv';
  constructor(private http: HttpClient) { }
  getVaccineData() {

    return this.http.get(this.vaccineURL, { responseType: 'text' })
      .pipe(map(
        result => {
          let col;
          this.arr = result.split("\n");
          console.log("length of arr=" + this.arr.length);
          // this.arr.forEach(row => {

          //   col = row.split(",");
          //   console.log(col);
          //   row.forEach(element => {
          //     this.VaccinationData.push({
          //       state: col[1],
          //       firstDose: col[2],
          //       secondDose: col[3],
          //       totalDose: col[3],
          //     });

          //   });

          // });
          const rawData:vaccinationData[]=[];
          for (let i = 1; i < this.arr.length; i++) {
            
            //console.log(this.arr[i]);
            const eachRow=this.arr[i].split(",");
            //console.log(eachRow);
            const cs={
              state: eachRow[1],
              firstDose: eachRow[2],
              secondDose: eachRow[3],
              totalDose: eachRow[4].replace(/(\r\n|\n|\r)/gm, ""),
            };
            //console.log(cs);
            
            let temp:vaccinationData;
            // if(rawData[cs.state]){
            //   temp.firstDose+=cs.firstDose,
            //   temp.secondDose+=cs.secondDose;
            //   temp.totalDose+=cs.totalDose;
            // }
            // csonol
            temp=rawData[cs.state];
            //console.log("rawdata");
            //console.log(rawData[cs.state])
            
            if(temp){
              temp.firstDose=Number(cs.firstDose)+Number(temp.firstDose);
              temp.secondDose=Number(cs.secondDose)+Number(temp.secondDose);
              temp.totalDose=Number(cs.totalDose)+Number(temp.totalDose);;
              rawData[cs.state]=temp;
            }
            else{
              rawData[cs.state]=cs;
            }

           
          }
          console.log(Object.values(rawData));
           return Object.values(rawData);
          //console.log(this.VaccinationData.length);
          //console.log(this.VaccinationData);
          // console.log(this.VaccinationData);
        }

      ));

  }
}
