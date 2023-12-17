import {AfterViewInit, Component, OnInit, Input} from '@angular/core';
import * as d3 from 'd3';
import {ISingleLine, IStationNameModel, ITrainScheduleModel} from "@rtrain/domain/models";
import {IncidentService, RealtimeTrainScheduleService, StationService, TrainScheduleService} from "@rtrain/api";
import {logging} from "@angular-devkit/core";
import {ITrainScheduleForTrafficGraph} from "../../../../domain/models/train-schedule/train-schedule-for-traffic-graph";
import {IIncidentForTrafficGraphModel} from "../../../../domain/models/incidentModels/incident-for-traffic-graph.model";
import {forkJoin, tap} from "rxjs";
@Component({
  selector: 'rtrain-traffic-graph',
  templateUrl: './traffic-graph.component.html',
  styleUrls: ['./traffic-graph.component.css'],
})
export class TrafficGraphComponent implements OnInit {
  @Input({required: true}) lineId!: string

  trainSchedules: ITrainScheduleModel[] = [];

  stations: string[] = []
  canvas: any;

  margin = {top: 10, right: 30, bottom: 50, left: 110};
  width = window.innerWidth - 140;
  height = window.innerHeight - 60;

  trainSchedulesDisplay: ITrainScheduleForTrafficGraph[][] = [];
  realtimeTrainScheduleDisplay: ITrainScheduleForTrafficGraph[][] = [];
  incidentsForTrafficGraph: IIncidentForTrafficGraphModel[] = [];

  constructor(
    private trainScheduleService: TrainScheduleService,
    private stationService: StationService,
    private realtimeTrainScheduleService: RealtimeTrainScheduleService,
    private incidentService: IncidentService
  ) {
  }

  ngOnInit(): void {
    this.initDataCascade();
  }

  initDataCascade() {
    forkJoin({
      stations: this.loadStations(),
      trainSchedules: this.loadTrainSchedules(),
      realTimeTrainSchedules: this.loadRealTimeTrainSchedules(),
      incidents: this.loadIncidents()
    }).subscribe({
      complete: () => this.tryCreateGraph()
    });
  }


  loadStations() {
    return this.stationService.getStationsForTrafficGraph(this.lineId).pipe(
      tap((res) => {
        if (res.body) this.stations = res.body.map((s) => s.name).filter((str): str is string => str !== undefined);
      })
    );
  }

  loadTrainSchedules() {
    return this.trainScheduleService.getTrainScheduleForTrafficGraph(this.lineId).pipe(
      tap((res) => {
        if (res.body) this.trainSchedulesDisplay = res.body;
      })
    );
  }

  loadRealTimeTrainSchedules() {
    return this.realtimeTrainScheduleService.getRealtimeTrainScheduleForTrafficGraph(this.lineId).pipe(
      tap((res) => {
        if (res.body) this.realtimeTrainScheduleDisplay = res.body;
      })
    );
  }

  loadIncidents() {
    return this.incidentService.getAllIncidentsForTrafficGraph(this.lineId).pipe(
      tap((res) => {
        if (res.body) this.incidentsForTrafficGraph = res.body;
      })
    );
  }

  tryCreateGraph(){
    if (this.stations) {
      setTimeout(() => {
        this.createCanvas();
        const x = this.createXAxis();
        const y = this.createYAxis(this.stations);
        this.createClipPath();
        this.createScatter();
        this.createXGuidelines(x);
        this.createYGuidelines(y);
        this.createGraph(x, y);
        this.createRealTimeGraph(x, y);
        this.initializeZoom(x, y);
        this.createCurrentTimeLine(x);
        this.createPatterns();
        this.createRedDashedBox(x, y)
      });
    }
  }

  createRedDashedBox(xAxis: any, yAxis: any) {
    this.incidentsForTrafficGraph.forEach(iFTG => {
      const xPosition = xAxis(new Date(iFTG.incidentStart));
      const xEndPosition = xAxis(new Date(iFTG.incidentEnd));
      const boxWidth = Math.max(0, xEndPosition - xPosition);

      const yPosition = yAxis(iFTG.toStationName);
      const yEndPosition = yAxis(iFTG.fromStationName);
      const boxHeight = Math.max(0, yEndPosition - yPosition);

      let incidentType = ''
      console.log(iFTG)
      if (iFTG.incident.fromToClosing === true && iFTG.incident.toFromClosing  === true) incidentType = 'url(#diagonal-hatch-both)'
      if (iFTG.incident.fromToClosing && !iFTG.incident.toFromClosing) incidentType = 'url(#diagonal-hatch-left-b-right-t)'
      if (!iFTG.incident.fromToClosing && iFTG.incident.toFromClosing) incidentType = 'url(#diagonal-hatch-left-t-right-b)'

      const group = this.canvas.append("g")
        .attr('clip-path', 'url(#clip)');

      group.append('rect')
        .attr("class", "incident-box")
        .attr('x', xPosition)
        .attr('y', yPosition)
        .attr('width', boxWidth)
        .attr('height', boxHeight)
        .attr('stroke', 'red')
        .attr('fill', incidentType)
        .attr('stroke-width', '2')
        .attr('clip-path', 'url(#clip)');

    })
  }




  createCanvas() {
    this.canvas = d3.select("svg")
      .style("background-color", "#777")
      .style("color", "white")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
    .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
      // .attr('clip-path', 'url(#clip)');

  }



  createXAxis(): d3.ScaleTime<number, number> {
    const currentDate = new Date();

    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1)
    startDate.setDate(startDate.getDate() - 1)
    const xScale = d3.scaleTime()
      .domain([startDate, endDate])
      .range([0, this.width]);

    const xAxis = d3.axisBottom<Date>(xScale)
      .ticks(d3.timeMinute.every(15))
      .tickFormat(d3.timeFormat("%H:%M"));

    this.canvas.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${this.height})`)

      .call(xAxis);

    this.canvas.selectAll(".x-axis text")
      .attr("transform", "rotate(45)")
      .attr("text-anchor", "start")
      .attr("dy", "-1em")
      .style("font-size", "12px")
      .attr("dx", "2em");


    return xScale;
  }

  createYAxis(domain: any[]): d3.ScaleBand<string>{
    const yAxis = d3.scaleBand()
      .domain( domain)
      .paddingInner(1)
      .range([ this.height , 0 ])


    this.canvas.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yAxis))


    return yAxis;
  }

  createClipPath() {
    this.canvas.append("defs").append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("x", 0)
      .attr("y", 0)

  }

  createScatter(){
    this.canvas.append("g")
      .attr("clip-path", "url(#clip)")
  }

  createXGuidelines(xScale: d3.ScaleTime<number, number>) {

    const hourlyInterval = d3.timeHour.every(1);
    if (!hourlyInterval) {
      throw new Error("Invalid interval");
    }


    const xAxisTicks = xScale.ticks(hourlyInterval);

    this.canvas.selectAll('.x-guide')
      .data(xAxisTicks)
      .enter().append('line')
      .attr('class', 'x-guide')
      .attr('y1', 0)
      .attr('y2', this.height)
      .attr('x1', (d:any) => xScale(d))
      .attr('x2', (d:any) => xScale(d))
      .attr('stroke', '#ccc') // or any color you prefer
      .attr('stroke-dasharray', '2,2')
      .attr('clip-path', 'url(#clip)');

  }

  createYGuidelines(yScale: d3.ScaleBand<string>) {
    const yAxisTicks = yScale.domain();

    this.canvas.selectAll('.y-guide')
      .data(yAxisTicks)
      .enter().append('line')
      .attr('class', 'y-guide')
      .attr('x1', 0)
      .attr('x2', this.width)
      .attr('y1', (d:any) => yScale(d))
      .attr('y2', (d:any) => yScale(d))
      .attr('stroke', '#ccc') // or any color you prefer
      .attr('stroke-dasharray', '2,2')
      .attr('clip-path', 'url(#clip)');
  }

  createCurrentTimeLine(xScale: d3.ScaleTime<number, number>){
    const currentTime = new Date();

    const group = this.canvas.append("g")
      .attr('clip-path', 'url(#clip)');

    group.append("line")
      .attr("class", "current-time-line")
      .attr("x1", xScale(currentTime))
      .attr("y1", 0)
      .attr("x2", xScale(currentTime))
      .attr("y2", this.height)
      .attr("stroke", "yellow")
      .attr("stroke-width", 2);
  }

  createGraph(xAxis: any, yAxis: any) {
    const parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S");
    this.trainSchedulesDisplay.forEach(innerArray => {
      const transformedData = innerArray.map(d => ({
        departureTime: parseTime(new Date().toISOString().split('T')[0] + d.arrivalTime),
        arrivalTime: parseTime(new Date().toISOString().split('T')[0] + d.departureTime),
        from: d.station,
        to: d.station
      })).flatMap(d => [
        { time: d.departureTime, value: d.from },
        { time: d.arrivalTime, value: d.to }
      ]);
      const line = d3.line<ISingleLine>()
        .x(d => xAxis(d.time))
        .y(d => yAxis(d.value));

      const group = this.canvas.append("g")
        .attr('clip-path', 'url(#clip)');

      group.append("path")
        .datum(transformedData)
        .attr("class", "line-path")
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("d", line)
        .attr('clip-path', 'url(#clip)');
    });
  }

  createRealTimeGraph(xAxis: any, yAxis: any){
    const parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S");
    this.realtimeTrainScheduleDisplay.forEach(innerArray => {
      const transformedData = innerArray.map(d => ({
        departureTime: parseTime(new Date().toISOString().split('T')[0] + d.arrivalTime),
        arrivalTime: parseTime(new Date().toISOString().split('T')[0] + d.departureTime),
        from: d.station,
        to: d.station
      })).flatMap(d => [
        { time: d.departureTime, value: d.from },
        { time: d.arrivalTime, value: d.to }
      ]);
      const line = d3.line<ISingleLine>()
        .x(d => xAxis(d.time))
        .y(d => yAxis(d.value));

      const group = this.canvas.append("g")
        .attr('clip-path', 'url(#clip)');

      group.append("path")
        .datum(transformedData)
        .attr("class", "line-path")
        .attr("fill", "none")
        .attr("stroke", "lime")
        .attr("stroke-width", 2)
        .attr("d", line)
        .attr('clip-path', 'url(#clip)');
    });
  }

  private initializeZoom(xScale: d3.ScaleTime<number, number>, yScale: d3.ScaleBand<string>): void {
    const zoomBehavior = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([4, 20]) // Keep your scale extent starting at 4
      .translateExtent([[0, 0], [this.width, this.height]]) // Set translate extent to restrict panning
      .on('zoom', (event) => {
        // Enforce the minimum scale of 4
        if (event.transform.k < 4) {
          event.transform.k = 4;
        }
        this.update(event.transform, xScale);
      });

    this.canvas.append('rect')
      .attr('width', this.width)
      .attr('height', this.height)
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .call(zoomBehavior);

    const initialScale = 4.0; // Set your desired initial scale
    // const initialTranslate = [
    //   -initialScale * this.margin.left,
    //   -initialScale * this.margin.top
    // ];
    const initialTransform = d3.zoomIdentity
      .translate(0,0)
      .scale(initialScale);
    this.canvas.call(zoomBehavior.transform, initialTransform);

    this.update(initialTransform, xScale);


  }

  update(transform: d3.ZoomTransform, xScale: d3.ScaleTime<number, number>) {
    // console.log(transform)
    const newXScale = transform.rescaleX(xScale);
    this.canvas.select('.x-axis').call(d3.axisBottom<Date>(newXScale)
      .ticks(d3.timeMinute.every(15))
      .tickFormat(d3.timeFormat("%H:%M")));

    this.canvas.selectAll(".x-axis text")
      .attr("transform", "rotate(45)")
      .attr("text-anchor", "start")
      .attr("dy", "-1em")
      .style("font-size", "12px")
      .attr("dx", "2em");

    this.canvas.selectAll('.line-path')
      .attr('transform', `translate(${transform.x},0) scale(${transform.k},1)`)

    const currentTime = new Date();
    this.canvas.select('.current-time-line')
      .attr('x1', newXScale(currentTime))
      .attr('x2', newXScale(currentTime))
      .attr("stroke", "yellow")
      .attr("stroke-width", 2);

    this.canvas.select('.incident-box')
      .attr('transform', `translate(${transform.x},0) scale(${transform.k},1)`)

    this.canvas.selectAll('.x-guide')
      .attr('x1', (d:any) => newXScale(d))
      .attr('x2', (d:any) => newXScale(d));
  }


  createPatterns(){
    //
    this.canvas.append('defs')
      .append('pattern')
      .attr('id', 'diagonal-hatch-left-b-right-t')
      .attr('patternUnits', 'userSpaceOnUse')
      .attr('width', 15)
      .attr('height', 15)
      .append('path')
      .attr('d', 'M-1,1 l2,-2 M0,15 l15,-15 M14,16 l2,-2')
      .attr('stroke', 'red')
      .attr('stroke-width', 2)
      .attr('stroke-linecap', 'square');

    this.canvas.append('defs')
      .append('pattern')
      .attr('id', 'diagonal-hatch-left-t-right-b')
      .attr('patternUnits', 'userSpaceOnUse')
      .attr('width', 15)
      .attr('height', 15)
      .append('path')
      .attr('d', 'M0,0 l15,15 M-1,14 l2,2 M14,-1 l2,2')
      .attr('stroke', 'red')
      .attr('stroke-width', 2)
      .attr('stroke-linecap', 'square');

    this.canvas.append('defs')
      .append('pattern')
      .attr('id', 'diagonal-hatch-both')
      .attr('patternUnits', 'userSpaceOnUse')
      .attr('width', 15)
      .attr('height', 15)
      .append('path')
      .attr('d', 'M0,0 l15,15 M-1,14 l2,2 M14,-1 l2,2 M-1,1 l2,-2 M0,15 l15,-15 M14,16 l2,-2')
      .attr('stroke', 'red')
      .attr('stroke-width', 2)
      .attr('stroke-linecap', 'square');
  }

}
