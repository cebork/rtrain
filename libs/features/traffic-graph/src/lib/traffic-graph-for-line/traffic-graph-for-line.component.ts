import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'rtrain-traffic-graph-for-line',
  templateUrl: './traffic-graph-for-line.component.html',
  styleUrls: ['./traffic-graph-for-line.component.css'],
})
export class TrafficGraphForLineComponent implements OnInit{
  lineId = '';

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.lineId = this.activatedRoute.snapshot.paramMap.get('lineId')!;
  }
}
