import { Component, OnInit } from '@angular/core';
import { vaccinationData } from 'src/app/modals/vaccinationData';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {

  constructor(private dataService: DataServiceService) { }
  stateList: string[] = [];
  data:vaccinationData[]=[];
  firstDoseTotal:string;
  secondDoseTotal:string;
  totalDose:string;
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
      result => {
        this.data=result;
      result.forEach(cs => {
        if (cs.state !== 'Total') {
          this.stateList.push(cs.state);
          this.firstDoseTotal=this.numDifferentiation(cs.firstDose);
            this.secondDoseTotal=this.numDifferentiation(cs.secondDose);
            this.totalDose=this.numDifferentiation(cs.totalDose);
        }
      });
      this.initChart();
    }
      
    );
  }
  numDifferentiation(value) {
    let val:any = Math.abs(value)
    if (val >= 10000000) {
      val = (val / 10000000).toFixed(2) + ' Cr';
    } else if (val >= 100000) {
      val = (val / 100000).toFixed(2) + ' Lac';
    }
    return val;
  }

  updateValues(state:string){
    console.log(state);
    this.data.forEach(cs=>{
      if(state=== cs.state)
      {
              this.firstDoseTotal=this.numDifferentiation(cs.firstDose);
              this.secondDoseTotal=this.numDifferentiation(cs.secondDose);
              this.totalDose=this.numDifferentiation(cs.totalDose);
      }
    })
    
  }

  initChart(){
    console.log("init chart");
    console.log(this.selectedDoseType);
    this.dataTable=[];
    //this.dataTable.push(["state","doseType"]);
    console.log(this.data);
    // this.data.forEach(res=>{
    //   if(res.state!=='Total'){
    //     if(this.selectedDoseType==='firstDoseTotal')
    //     {
    //       console.log("selected first dose");
    //       this.dataTable.push([res.state,res.firstDose]);
    //     } 
    //     else if(this.selectedDoseType==='secondDoseTotal'){
    //       console.log("selected second dose");
    //       this.dataTable.push([res.state,res.secondDose]);
          
    //     }
    //     else if(this.selectedDoseType==='totalDose'){
    //       console.log("selected total dose");
    //       this.dataTable.push([res.state,res.totalDose]);
    //     }    
    //   }
        
    // });
  
  }

}
