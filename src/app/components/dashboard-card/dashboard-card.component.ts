import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {

  @Input('firstDoseTotal') firstDoseTotal;
  @Input('secondDoseTotal') secondDoseTotal;
  @Input('totalDose') totalDose;
  constructor() { }

  ngOnInit(): void {
  }

}
