import {AfterViewInit, Component, OnInit, Input} from '@angular/core';
import * as d3 from 'd3';
import {ISingleLine} from "@rtrain/domain/models";
@Component({
  selector: 'rtrain-traffic-graph',
  templateUrl: './traffic-graph.component.html',
  styleUrls: ['./traffic-graph.component.css'],
})
export class TrafficGraphComponent implements OnInit, AfterViewInit{
  // @Input({required: true}) lineId!: string
  // @Input() trainSchedules: any[] = []
  // @Input() trainRealTimeSchedules: any[] = []
  cities = ['Łuków', 'Krynka', 'Dziewule', 'Radomyśl', 'Siedlce']
  canvas: any;

  margin = {top: 10, right: 30, bottom: 50, left: 60};
  width = 630;
  height = 400;

  trainSchedulesDisplay = [
    [
      {"departureTime": 'T11:10:00', "arrivalTime": 'T11:40:00', "from": 'Łuków', "to": 'Krynka'},
      {"departureTime": 'T12:20:00', "arrivalTime": 'T12:50:00', "from": 'Krynka', "to": 'Dziewule'},
      {"departureTime": 'T13:30:00', "arrivalTime": 'T14:00:00', "from": 'Dziewule', "to": 'Radomyśl'},
      {"departureTime": 'T14:40:00', "arrivalTime": 'T15:10:00', "from": 'Radomyśl', "to": 'Siedlce'},
      {"departureTime": 'T15:50:00', "arrivalTime": 'T16:20:00', "from": 'Siedlce', "to": 'Siedlce'},
    ],
    [
      {"departureTime": 'T17:10:00', "arrivalTime": 'T17:40:00', "from": 'Łuków', "to": 'Krynka'},
      {"departureTime": 'T18:20:00', "arrivalTime": 'T18:50:00', "from": 'Krynka', "to": 'Dziewule'},
      {"departureTime": 'T19:30:00', "arrivalTime": 'T20:00:00', "from": 'Dziewule', "to": 'Radomyśl'},
      {"departureTime": 'T20:40:00', "arrivalTime": 'T21:10:00', "from": 'Radomyśl', "to": 'Siedlce'},
      {"departureTime": 'T21:50:00', "arrivalTime": 'T22:20:00', "from": 'Siedlce', "to": 'Siedlce'},
    ],
  ];


  ngOnInit(): void {
    // console.log(this.lineId)
  }

  ngAfterViewInit(): void {
    this.createCanvas();
    const x = this.createXAxis()
    const y = this.createYAxis(this.cities)
    this.createClipPath();
    this.createScatter();
    this.createXGuidelines(x);
    this.createYGuidelines(y)
    this.createGraph(x, y);
    this.initializeZoom(x, y)
    this.createCurrentTimeLine(x)
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
    this.canvas.append("line")
      .attr("class", "current-time-line")
      .attr("x1", xScale(currentTime))
      .attr("y1", 0)
      .attr("x2", xScale(currentTime))
      .attr("y2", this.height)
      .attr("stroke", "red")
      .attr("stroke-width", 2);
  }

  createGraph(xAxis: any, yAxis: any) {
    const parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S");
    this.trainSchedulesDisplay.forEach(innerArray => {
      const transformedData = innerArray.map(d => ({
        arrivalTime: parseTime(new Date().toISOString().split('T')[0] + d.arrivalTime),
        departureTime: parseTime(new Date().toISOString().split('T')[0] + d.departureTime),
        from: d.from,
        to: d.to
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
    console.log(transform)
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
      .attr("stroke", "red")
      .attr("stroke-width", 2);


    this.canvas.selectAll('.x-guide')
      .attr('x1', (d:any) => newXScale(d))
      .attr('x2', (d:any) => newXScale(d));
  }
}
