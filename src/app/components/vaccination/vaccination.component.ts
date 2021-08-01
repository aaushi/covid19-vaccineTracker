import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { vaccinationData } from 'src/app/modals/vaccinationData';


@Component({
  selector: 'app-vaccination',
  templateUrl: './vaccination.component.html',
  styleUrls: ['./vaccination.component.scss']
})

export class VaccinationComponent implements OnInit {
  

  constructor(private dataService:DataServiceService) { }
  firstDoseTotal=0;
  secondDoseTotal=0;
  totalDose=0;
  selectedDoseType='secondDoseTotal';
  globalData:vaccinationData[];
  dataTable=[];
  chart={
    PieChart:'PieChart',
    ColumnChart:'ColumnChart',
    height:500,
    options:{
      is3D: true
      }
    
  }
  ngOnInit(): void {

    this.dataService.getVaccineData().subscribe(
      {
      next:(result)=>{
        this.globalData=result;
        console.log(result);
        result.forEach(cs => {
          if(cs.state!=='Total'){
            this.firstDoseTotal=cs.firstDose+this.firstDoseTotal;
            this.secondDoseTotal=cs.secondDose+this.secondDoseTotal;
            this.totalDose=cs.totalDose+this.totalDose;
          }
        });
        this.firstDoseTotal=this.numDifferentiation(this.firstDoseTotal);
        this.secondDoseTotal=this.numDifferentiation(this.secondDoseTotal);
        this.totalDose=this.numDifferentiation(this.totalDose);
        this.initChart();
      }
     
    });
   
  }
  onGetVaccineDataButton():void{
  
  }
  numDifferentiation(value) {
    let val:any = Math.abs(value)
    // console.log("******");
    // console.log(val);
    if(isNaN(val)){
      //console.log("val is nan");
      return 0;
    }
    else if (val >= 10000000) {
      val = (val / 10000000).toFixed(2) + ' Cr';
    } else if (val >= 100000) {
      val = (val / 100000).toFixed(2) + ' Lac';
    } 
    return val;
  }

  initChart(){
    console.log("init chart");
    console.log(this.selectedDoseType);
    this.dataTable=[];
    //this.dataTable.push(["state","doseType"]);
    console.log(this.globalData);
    this.globalData.forEach(res=>{
      if(res.state!=='Total'){
        if(this.selectedDoseType==='firstDoseTotal')
        {
          console.log("selected first dose");
          this.dataTable.push([res.state,res.firstDose]);
        } 
        else if(this.selectedDoseType==='secondDoseTotal'){
          console.log("selected second dose");
          this.dataTable.push([res.state,res.secondDose]);
          
        }
        else if(this.selectedDoseType==='totalDose'){
          console.log("selected total dose");
          this.dataTable.push([res.state,res.totalDose]);
        }    
      }
        
    });
  
  }
  updateChart(event:any){
    console.log(event.value);
    this.selectedDoseType=event.value;
    this.initChart();
   
  }
}
