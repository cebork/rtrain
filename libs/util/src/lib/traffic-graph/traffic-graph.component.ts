import {AfterViewInit, Component, OnInit, Input, OnDestroy} from '@angular/core';
import * as d3 from 'd3';
import {ISingleLine, IStationNameModel, ITrainScheduleModel, SingleLine} from "@rtrain/domain/models";
import {
  IncidentService,
  RealtimeTrainScheduleService,
  SignalRService,
  StationService,
  TrainScheduleService
} from "@rtrain/api";
import {logging} from "@angular-devkit/core";
import {ITrainScheduleForTrafficGraph} from "../../../../domain/models/train-schedule/train-schedule-for-traffic-graph";
import {IIncidentForTrafficGraphModel} from "../../../../domain/models/incidentModels/incident-for-traffic-graph.model";
import {first, forkJoin, share, tap} from "rxjs";
import {createLogger} from "@microsoft/signalr/dist/esm/Utils";
@Component({
  selector: 'rtrain-traffic-graph',
  templateUrl: './traffic-graph.component.html',
  styleUrls: ['./traffic-graph.component.css'],
})
export class TrafficGraphComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input({required: true}) lineId!: string

  tooltip: any;

  trainSchedules: ITrainScheduleModel[] = [];

  stations: string[] = []
  canvas: any;

  margin = {top: 10, right: 30, bottom: 50, left: 110};
  width = window.innerWidth - 140;
  height = window.innerHeight - 60;

  trainSchedulesDisplay: ITrainScheduleForTrafficGraph[][] = [];
  realtimeTrainScheduleDisplay: ITrainScheduleForTrafficGraph[][] = [];
  incidentsForTrafficGraph: IIncidentForTrafficGraphModel[] = [];

  xScale: any;
  yScale: any;
  currentTransform: any;
  constructor(
    private trainScheduleService: TrainScheduleService,
    private stationService: StationService,
    private realtimeTrainScheduleService: RealtimeTrainScheduleService,
    private incidentService: IncidentService,
    private signalRService: SignalRService
  ) {}

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.initDataCascade();

  }


  ngAfterViewInit(): void {
    this.tooltip = d3.select<HTMLDivElement, unknown>('div#tooltip');
  }

  ngOnDestroy() {
    this.signalRService.disconnect();
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
        this.xScale = this.createXAxis();
        this.yScale = this.createYAxis(this.stations);
        this.listenToIncidentChanges();
        this.listenToRealtimeTrainScheduleChanges();
        this.createClipPath();
        this.createPatterns();
        this.createZoomRect();
        this.createXGuidelines();
        this.createYGuidelines();
        this.createPlannedGraph();
        this.createRealTimeGraph();
        this.createIncidentBox();
        this.createCurrentTimeLine();
        this.initializeZoom();



      });
    }
  }


  listenToIncidentChanges(){
    this.signalRService.addIncidentsListener().subscribe((data) => {
      if (data) this.incidentsForTrafficGraph = data;
      this.createIncidentBox()
      this.update(this.currentTransform)
    })
  }

  listenToRealtimeTrainScheduleChanges(){
    this.signalRService.addRealTimeTrainScheduleListener().subscribe((data) => {
      if (data) this.realtimeTrainScheduleDisplay = data;
      this.createRealTimeGraph()
      this.update(this.currentTransform)
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

  }



  createXAxis(): d3.ScaleTime<number, number> {
    const currentDate = new Date();

    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 2)
    startDate.setDate(startDate.getDate() - 1)
    const xScale = d3.scaleTime()
      .domain([startDate, endDate])
      .range([0, this.width]);

    const xAxis = d3.axisBottom<Date>(xScale)
      .ticks(d3.timeMinute.every(12))
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

  createXGuidelines() {

    const hourlyInterval = d3.timeHour.every(1);
    if (!hourlyInterval) {
      throw new Error("Invalid interval");
    }
      const xAxisTicks = this.xScale?.ticks(hourlyInterval);
      this.canvas.selectAll('.x-guide')
        .data(xAxisTicks)
        .enter().append('line')
        .attr('class', 'x-guide')
        .attr('y1', 0)
        .attr('y2', this.height)
        .attr('x1', (d: any) => this.xScale!(d))
        .attr('x2', (d: any) => this.xScale!(d))
        .attr('stroke', '#ccc') // or any color you prefer
        .attr('stroke-dasharray', '2,2')
        .attr('clip-path', 'url(#clip)');
  }

  createYGuidelines() {
    const yAxisTicks = this.yScale?.domain();

    this.canvas.selectAll('.y-guide')
      .data(yAxisTicks)
      .enter().append('line')
      .attr('class', 'y-guide')
      .attr('x1', 0)
      .attr('x2', this.width)
      .attr('y1', (d: any) => this.yScale!(d))
      .attr('y2', (d: any) => this.yScale!(d))
      .attr('stroke', '#ccc') // or any color you prefer
      .attr('stroke-dasharray', '2,2')
      .attr('clip-path', 'url(#clip)');
  }

  createCurrentTimeLine(){
    const currentTime = new Date();

    const group = this.canvas.append("g")
      .attr('clip-path', 'url(#clip)');

    group.append("line")
      .attr("class", "current-time-line")
      .attr("x1", this.xScale(currentTime))
      .attr("y1", 0)
      .attr("x2", this.xScale(currentTime))
      .attr("y2", this.height)
      .attr("stroke", "yellow")
      .attr("stroke-width", 2);
  }

  createPlannedGraph() {
    this.trainSchedulesDisplay.forEach(innerArray => {
      if (innerArray[0].isOnce){
        this.addSinglePath(innerArray)
      } else {
        for (let i = -3; i < 4; i++) {
          this.addSinglePath(innerArray, i)
        }
      }
    });
  }

  addSinglePath(innerArray: ITrainScheduleForTrafficGraph[], i?: number){
    const parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S");
    const currentDate = new Date();
    if (i)
      currentDate.setDate(currentDate.getDate() + i);
    const movedDate = currentDate.toISOString().split("T")[0];
    let transformedData: ISingleLine[] = [];
    if (innerArray[0].isOnce) {
      transformedData = innerArray.flatMap(schedule => [
        new SingleLine(parseTime(schedule.arrivalTime), schedule.station, schedule.train),
        new SingleLine(parseTime(schedule.departureTime), schedule.station, schedule.train)
      ]);
    }else{
      transformedData = innerArray.flatMap(schedule => [
        new SingleLine(parseTime(movedDate + 'T' + schedule.arrivalTime.split('T')[1].split(".")[0]), schedule.station, schedule.train),
        new SingleLine(parseTime(movedDate + 'T' + schedule.departureTime.split('T')[1].split(".")[0]), schedule.station, schedule.train)
      ]);
    }

    console.log(transformedData)
    const line = d3.line<ISingleLine>()
      .x(d => this.xScale(d.time))
      .y(d => this.yScale(d.value));

    // Create a group and append a path for each schedule
    this.canvas.append("g")
      .attr('clip-path', 'url(#clip)')
      .append("path")
      .datum(transformedData)
      .attr("class", "line-path")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .attr("d", line)
      .style('pointer-events', 'visiblePainted')
      .on("mouseover", this.handleMouseOverTS.bind(this))
      .on("mousemove", this.handleMouseMoveTS.bind(this))
      .on("mouseout", this.handleMouseOutTS.bind(this));
  }

  createRealTimeGraph(){
    this.removeElementsByClass("line-path-realtime")
    const parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S");
    this.realtimeTrainScheduleDisplay.forEach(innerArray => {
      const transformedData = innerArray.flatMap(schedule => [
        new SingleLine(parseTime(schedule.arrivalTime), schedule.station, schedule.train),
        new SingleLine(parseTime(schedule.departureTime), schedule.station, schedule.train)
      ]);

      const line = d3.line<ISingleLine>()
        .x(d => this.xScale(d.time))
        .y(d => this.yScale(d.value));

      const group = this.canvas.append("g")
        .attr('clip-path', 'url(#clip)');

      group.append("path")
        .datum(transformedData)
        .attr("class", "line-path-realtime")
        .attr("fill", "none")
        .attr("stroke", "lime")
        .attr("stroke-width", 1)
        .attr("d", line)
        .attr('clip-path', 'url(#clip)')
        .on("mouseover", this.handleMouseOverRTS.bind(this))
        .on("mousemove", this.handleMouseMoveRTS.bind(this))
        .on("mouseout", this.handleMouseOutRTS.bind(this));
    });
  }

  createIncidentBox() {
    this.removeElementsByClass("incident-box")
    this.incidentsForTrafficGraph.forEach(iFTG => {
      const xPosition = this.xScale(new Date(iFTG.incidentStart));
      const xEndPosition = this.xScale(new Date(iFTG.incidentEnd));
      const boxWidth = Math.max(0, xEndPosition - xPosition);

      const yPosition = this.yScale(iFTG.toStationName);
      const yEndPosition = this.yScale(iFTG.fromStationName);
      const boxHeight = Math.max(0, yEndPosition - yPosition);

      let incidentType = ''
      if (iFTG.incident.fromToClosing === true && iFTG.incident.toFromClosing  === true) incidentType = 'url(#diagonal-hatch-both)'
      if (iFTG.incident.fromToClosing && !iFTG.incident.toFromClosing) incidentType = 'url(#diagonal-hatch-left-b-right-t)'
      if (!iFTG.incident.fromToClosing && iFTG.incident.toFromClosing) incidentType = 'url(#diagonal-hatch-left-t-right-b)'

      const group = this.canvas.append("g")
        .attr('clip-path', 'url(#clip)');

      group.append('rect')
        .datum(iFTG)
        .attr("class", "incident-box")
        .attr('x', xPosition)
        .attr('y', yPosition)
        .attr('width', boxWidth)
        .attr('height', boxHeight)
        .attr('stroke', 'red')
        .attr('fill', incidentType)
        .attr('stroke-width', '2')
        .attr('clip-path', 'url(#clip)')
        .on("mouseover", this.handleMouseOverI.bind(this))
        .on("mousemove", this.handleMouseMoveI.bind(this))
        .on("mouseout", this.handleMouseOutI.bind(this));

    })
  }

  removeElementsByClass(className: string) {
    const elements = document.getElementsByClassName(className);
    const elementsArray = Array.from(elements);
    if (elementsArray.length > 0) {
      for (let i = 0; i < elementsArray.length; i++) {
        const element = elementsArray[i];
        if (element && element.parentNode) {
          element.parentNode.removeChild(element);
        }
      }
    }

  }

  private initializeZoom(): void {
    const initScale = 4
    const currentDate = new Date();

    const xPosition = this.xScale(currentDate.setDate(currentDate.getUTCDate() + 1));

    let centeredXPosition = 0;
    if (xPosition < 1400) {
      centeredXPosition = -xPosition * 2.5;
    } else {
      centeredXPosition = -5077  + xPosition;
    }

    const initialTransform = d3.zoomIdentity.translate(centeredXPosition, 0).scale(initScale);

    const zoomBehavior = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([4, 20])
      .translateExtent([[0, 0], [this.width, this.height]])
      .on('zoom', (event) => {
        this.update(event.transform);
      });

    this.canvas.call(zoomBehavior);


    this.canvas.call(zoomBehavior.transform, initialTransform);
  }

  update(transform: d3.ZoomTransform) {
    this.currentTransform = transform;
    const newXScale = transform.rescaleX(this.xScale);

    this.canvas.select('.x-axis').call(d3.axisBottom<Date>(newXScale)
      .ticks(d3.timeMinute.every(12))
      .tickFormat(d3.timeFormat("%H:%M")));

    this.canvas.selectAll(".x-axis text")
      .attr("transform", "rotate(45)")
      .attr("text-anchor", "start")
      .attr("dy", "-1em")
      .style("font-size", "12px")
      .attr("dx", "2em")

    this.canvas.selectAll('.line-path')
      .attr('transform', `translate(${transform.x},0) scale(${transform.k},1)`)

    this.canvas.selectAll('.line-path-realtime')
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





  createZoomRect(){
    this.canvas.append('rect')
      .attr('class', 'zoom-rect')
      .attr('width', this.width)
      .attr('height', this.height)
      .style('fill', 'none')
      .style('pointer-events', 'all')
  }


  handleMouseOverTS = (event: any, d: any) => {
    try {
      d3.select(event.currentTarget)
        .attr("stroke", "blue")
      this.tooltip
        .style("visibility", "visible")
        .style("opacity", 1)
        .html(`
            <b>Pociąg:</b>
            <br>Ze stacji: ${d && d[0] && d[0].value ? d[0].value : 'brak'}
            <br>Do stacji: ${ d & d[d.length - 1] && d[d.length - 1].value ? d[d.length - 1].value: 'brak'}
            <br>Nazwa: ${d && d[0] && d[0].train && d[0].train.name ? d[0].train.name : 'brak'}
            <br>Kod: ${d && d[0] && d[0].train && d[0].train.code ? d[0].train.code : 'brak'}
            <br>Przewoźnik: ${d && d[0] && d[0].train && d[0].train.transportCompany && d[0].train.transportCompany.name ? d[0].train.transportCompany.name : 'brak'} (${d && d[0] && d[0].train && d[0].train.transportCompany && d[0].train.transportCompany.symbol ? d[0].train.transportCompany.symbol : 'brak'})
            <br>Typ: ${d && d[0] && d[0].train && d[0].train.trainType && d[0].train.trainType.name ? d[0].train.trainType.name : 'brak'} (${d && d[0] && d[0].train && d[0].train.trainType && d[0].train.trainType.symbol ? d[0].train.trainType.symbol : 'brak'})
          `);
    } catch (error) {
      console.error(error);
    }
  };

  handleMouseMoveTS = (event: any, d: any) => {
    this.tooltip
      .style("left", (event.pageX + 10) + "px")
      .style("top", (event.pageY + 10) + "px")
      .html(`
            <b>Pociąg:</b>
            <br>Ze stacji: ${d && d[0] && d[0].value ? d[0].value : 'brak'}
            <br>Do stacji: ${ d & d[d.length - 1] && d[d.length - 1].value ? d[d.length - 1].value: 'brak'}
            <br>Nazwa: ${d && d[0] && d[0].train && d[0].train.name ? d[0].train.name : 'brak'}
            <br>Kod: ${d && d[0] && d[0].train && d[0].train.code ? d[0].train.code : 'brak'}
            <br>Przewoźnik: ${d && d[0] && d[0].train && d[0].train.transportCompany && d[0].train.transportCompany.name ? d[0].train.transportCompany.name : 'brak'} (${d && d[0] && d[0].train && d[0].train.transportCompany && d[0].train.transportCompany.symbol ? d[0].train.transportCompany.symbol : 'brak'})
            <br>Typ: ${d && d[0] && d[0].train && d[0].train.trainType && d[0].train.trainType.name ? d[0].train.trainType.name : 'brak'} (${d && d[0] && d[0].train && d[0].train.trainType && d[0].train.trainType.symbol ? d[0].train.trainType.symbol : 'brak'})
          `);
  }

  handleMouseOutTS = (event: any, d: any) => {
    try {
      d3.select(event.currentTarget)
        .attr("stroke", "black")
        .attr("stroke-width", 1);

      this.tooltip
        .style("visibility", "hidden")
        .style("opacity", 0);

    } catch (error) {
      console.error(error);
    }
  };


  handleMouseOverRTS = (event: any, d: any) => {
    try {
      d3.select(event.currentTarget)
        .attr("stroke", "blue")
      this.tooltip
        .style("visibility", "visible")
        .style("opacity", 1)
        .html(`
            <b>Pociąg:</b>
            <br>Nazwa: ${d[0].train && d[0].train.name ? d[0].train.name : 'brak'}
          `);
    } catch (error) {
      console.error(error);
    }
  };

  handleMouseMoveRTS = (event: any, d: any) => {
    this.tooltip
      .style("left", (event.pageX + 10) + "px")
      .style("top", (event.pageY + 10) + "px")
      .html(`
            <b>Pociąg:</b>
            <br>Ze stacji: ${d[0] && d[0].value ? d[0].value : 'brak'}
            <br>Do stacji: ${d[d.length - 1] && d[d.length - 1].value ? d[d.length - 1].value : 'brak'}
          `);
  }

  handleMouseOutRTS = (event: any, d: any) => {
    try {
      d3.select(event.currentTarget)
        .attr("stroke", "lime")
        .attr("stroke-width", 1);

      this.tooltip
        .style("visibility", "hidden")
        .style("opacity", 0);

    } catch (error) {
      console.error(error);
    }
  };

  handleMouseOverI = (event: any, d: any) => {
    try {
      let incidentType = ''
      let closingDirection = ''
      if (d.incident.fromToClosing === true && d.incident.toFromClosing  === true) {
        incidentType = 'url(#diagonal-hatch-both-hover)'
        closingDirection = 'oba kierunki'
      }
      if (d.incident.fromToClosing && !d.incident.toFromClosing) {
        incidentType = 'url(#diagonal-hatch-left-b-right-t-hover)'
        closingDirection = 'z początkowej do końcowej'
      }
      if (!d.incident.fromToClosing && d.incident.toFromClosing) {
        incidentType = 'url(#diagonal-hatch-left-t-right-b-hover)'
        closingDirection = 'z końcowej do początkowej'
      }
      d3.select(event.currentTarget)
        .attr("stroke", "blue")
        .attr('fill', incidentType)
      this.tooltip
        .style("visibility", "visible")
        .style("opacity", 1)
        .html(`
            <b>Incydent na odcinku ${d && d.fromStationName ? d.fromStationName : 'brak'} - ${d.fromStationName ? d.fromStationName : 'brak'}</b>
            <br>Kierunek blokady: ${closingDirection ? closingDirection : 'brak'}
            <br>Data początkowa: ${d && d.incidentStart ? d.incidentStart : 'brak'}
            <br>Data końcowa: ${d && d.incidentEnd ? d.incidentEnd : 'brak'}
            <br>Kod incydentu: ${d && d.incident && d.incident.incidentCode && d.incident.incidentCode.name ? d.incident.incidentCode.name : 'brak'}
            <br>Nazwa incydentu: ${d && d.incident && d.incident.incidentCode && d.incident.incidentCode.description ? d.incident.incidentCode.description : 'brak'}
          `);
    } catch (error) {
      console.error(error);
    }
  };

  handleMouseMoveI = (event: any, d: any) => {
    let incidentType = ''
    let closingDirection = ''
    if (d.incident.fromToClosing === true && d.incident.toFromClosing  === true) {
      incidentType = 'url(#diagonal-hatch-both-hover)'
      closingDirection = 'oba kierunki'
    }
    if (d.incident.fromToClosing && !d.incident.toFromClosing) {
      incidentType = 'url(#diagonal-hatch-left-b-right-t-hover)'
      closingDirection = 'z początkowej do końcowej'
    }
    if (!d.incident.fromToClosing && d.incident.toFromClosing) {
      incidentType = 'url(#diagonal-hatch-left-t-right-b-hover)'
      closingDirection = 'z końcowej do początkowej'
    }

    this.tooltip
      .style("left", (event.pageX + 10) + "px")
      .style("top", (event.pageY + 10) + "px")
      .html(`
            <b>Incydent na odcinku ${d && d.fromStationName ? d.fromStationName : 'brak'} - ${d.fromStationName ? d.fromStationName : 'brak'}</b>
            <br>Kierunek blokady: ${closingDirection ? closingDirection : 'brak'}
            <br>Data początkowa: ${d && d.incidentStart ? d.incidentStart : 'brak'}
            <br>Data końcowa: ${d && d.incidentEnd ? d.incidentEnd : 'brak'}
            <br>Kod incydentu: ${d && d.incident && d.incident.incidentCode && d.incident.incidentCode.name ? d.incident.incidentCode.name : 'brak'}
            <br>Nazwa incydentu: ${d && d.incident && d.incident.incidentCode && d.incident.incidentCode.description ? d.incident.incidentCode.description : 'brak'}
          `);
  }

  handleMouseOutI = (event: any, d: any) => {
    try {
      let incidentType = ''
      if (d.incident.fromToClosing === true && d.incident.toFromClosing  === true) incidentType = 'url(#diagonal-hatch-both)'
      if (d.incident.fromToClosing && !d.incident.toFromClosing) incidentType = 'url(#diagonal-hatch-left-b-right-t)'
      if (!d.incident.fromToClosing && d.incident.toFromClosing) incidentType = 'url(#diagonal-hatch-left-t-right-b)'
      d3.select(event.currentTarget)
        .attr("stroke", "red")
        .attr('fill', incidentType)

      this.tooltip
        .style("visibility", "hidden")
        .style("opacity", 0);

    } catch (error) {
      console.error(error);
    }
  };



  createPatterns(){
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


    this.canvas.append('defs')
      .append('pattern')
      .attr('id', 'diagonal-hatch-left-b-right-t-hover')
      .attr('patternUnits', 'userSpaceOnUse')
      .attr('width', 15)
      .attr('height', 15)
      .append('path')
      .attr('d', 'M-1,1 l2,-2 M0,15 l15,-15 M14,16 l2,-2')
      .attr('stroke', 'blue')
      .attr('stroke-width', 2)
      .attr('stroke-linecap', 'square');

    this.canvas.append('defs')
      .append('pattern')
      .attr('id', 'diagonal-hatch-left-t-right-b-hover')
      .attr('patternUnits', 'userSpaceOnUse')
      .attr('width', 15)
      .attr('height', 15)
      .append('path')
      .attr('d', 'M0,0 l15,15 M-1,14 l2,2 M14,-1 l2,2')
      .attr('stroke', 'blue')
      .attr('stroke-width', 2)
      .attr('stroke-linecap', 'square');

    this.canvas.append('defs')
      .append('pattern')
      .attr('id', 'diagonal-hatch-both-hover')
      .attr('patternUnits', 'userSpaceOnUse')
      .attr('width', 15)
      .attr('height', 15)
      .append('path')
      .attr('d', 'M0,0 l15,15 M-1,14 l2,2 M14,-1 l2,2 M-1,1 l2,-2 M0,15 l15,-15 M14,16 l2,-2')
      .attr('stroke', 'blue')
      .attr('stroke-width', 2)
      .attr('stroke-linecap', 'square');

  }
}
