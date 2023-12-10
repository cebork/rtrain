import {Component, OnDestroy, OnInit} from '@angular/core';
import {SignalRService} from "@rtrain/api";

@Component({
  selector: 'rtrain-traffic-lines-view',
  templateUrl: './traffic-lines-view.component.html',
  styleUrls: ['./traffic-lines-view.component.css'],
})
export class TrafficLinesViewComponent implements OnInit, OnDestroy{


  constructor(
    private signalRService: SignalRService
  ) {
  }

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.addTrafficGraphListener();
  }
  ngOnDestroy(): void {
    this.signalRService.disconnect();
  }

}
