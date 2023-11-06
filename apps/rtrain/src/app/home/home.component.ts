import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {NumberValue} from "d3";
import {Data} from "@angular/router";
@Component({
  selector: 'rtrain-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  // @ViewChild('myCanvas')
  // canvasRef: ElementRef<HTMLCanvasElement> | undefined
  // ctx: CanvasRenderingContext2D | null | undefined;
  //
  cities = ['Łuków', 'Krynka', 'Dziewule', 'Radomyśl', 'Siedlce']

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // // Declare the chart dimensions and margins.
    // const width = 900;
    // const height = 800;
    // const marginTop = 50;
    // const marginRight = 50;
    // const marginBottom = 50;
    // const marginLeft = 50;
    // const rightEdgeTransform = width - marginRight
    //
    // const data = [
    //   {x: 1000, y: "Łuków"},
    //   {x: 2500, y: "Krynka"},
    //   {x: 4000, y: "Dziewule"},
    //   {x: 5500, y: "Radomyśl"},
    //   {x: 7000, y: "Siedlce"}
    // ];
    //
    // // Declare the x (horizontal position) scale.
    // const x = d3.scaleTime()
    //   .domain([Date.now(), Date.now() + 24 * 60 * 60 * 1000])
    //   .range([marginLeft, width - marginRight]);
    //
    // const xAxis = d3.axisBottom(x)
    //   .ticks(d3.timeHour.every(1))
    //   .tickFormat((domainValue, index) => {
    //     if (domainValue instanceof Date) {
    //       return d3.timeFormat("%H:%M")(domainValue);
    //     }
    //     return String(domainValue);  // or handle NumberValue differently if needed
    //   });
    //
    // const xAxisTop = d3.axisTop(x)
    //   .ticks(d3.timeHour.every(1))
    //   .tickFormat((domainValue, index) => {
    //     if (domainValue instanceof Date) {
    //       return d3.timeFormat("%H:%M")(domainValue);
    //     }
    //     return String(domainValue);  // or handle NumberValue differently if needed
    //   });
    //
    // // Declare the y (vertical position) scale.
    // const y = d3.scaleBand()
    //   .domain(this.cities)
    //   .range([0, height - marginTop - marginBottom])
    //   .padding(0.1);
    //
    // // Create the SVG container.
    // const svg = d3.select("svg")
    //   .attr("width", width)
    //   .attr("height", height);
    //
    // // Add the x-axis.
    // svg.append("g")
    //   .attr("transform", `translate(0,${height - marginBottom})`)
    //   .call(xAxis)
    //   .selectAll("text")
    //   .attr("transform", "rotate(45)")  // Rotate by 90 degrees
    //   .attr("dy", "0.35em")  // Adjust y position
    //   .attr("x", 5)  // Adjust x position if necessary
    //   .attr("y", 15)  // Move the labels slightly away from the ticks
    //   .style("text-anchor", "start");
    //
    // svg.append("g")
    //   .attr("transform", `translate(0,50)`)  // Position it at the top
    //   .call(xAxisTop)
    //   .selectAll("text")
    //   .attr("transform", "rotate(315) translate(0,-10)")
    //   // .attr("transform", `translate(0,-10)`)
    //   .attr("dy", "0")
    //   .attr("x", 0)  // Adjust if necessary
    //   .attr("y", 0)  // Adjust if necessary
    //   .style("text-anchor", "start");
    //
    // // Add the y-axis.
    // svg.append("g")
    //   .attr("transform", `translate(${marginLeft},0) translate(0,${marginBottom})`)
    //   .call(d3.axisLeft(y));
    //
    // svg.append("g")
    //   .attr("transform", `translate(${rightEdgeTransform},0) translate(0,${marginBottom})`)
    //   .call(d3.axisRight(y));
    //
    // svg.append("path")
    //   .datum(data)
    //   .attr("fill", "none")
    //   .attr("stroke", "steelblue")
    //   .attr("stroke-width", 1.5)
    //   .attr("d", d3.line(0, 123)
    //   )
    //
    // svg.node();

    // const width = 640;
    // const height = 400;
    // const marginTop = 20;
    // const marginRight = 20;
    // const marginBottom = 30;
    // const marginLeft = 40;
    // const data: [{"value": number, "date": string}] = [
    //   {
    //     "date": "2020-05-12T12:19:00+00:00",
    //     "value": 20
    //   },
    // {
    //   "value": 50,
    //   "date": "2020-05-14T12:19:00+00:00"
    // },
    // {
    //   "value": 30,
    //   "date": "2020-05-16T12:19:00+00:00"
    // },
    // {
    //   "value": 80,
    //   "date": "2020-05-18T12:19:00+00:00"
    // },
    // {
    //   "value": 55,
    //   "date": "2020-05-20T12:19:00+00:00"
    // },
    // {
    //   "value": 60,
    //   "date": "2020-05-22T12:19:00+00:00"
    // },
    // {
    //   "value": 45,
    //   "date": "2020-05-24T12:19:00+00:00"
    // },
    // {
    //   "value": 30,
    //   "date": "2020-05-26T12:19:00+00:00"
    // },
    // {
    //   "value": 40,
    //   "date": "2020-05-28T12:19:00+00:00"
    // },
    // {
    //   "value": 70,
    //   "date": "2020-05-30T12:19:00+00:00"
    // },
    // {
    //   "value": 63,
    //   "date": "2020-06-01T12:19:00+00:00"
    // },
    // {
    //   "value": 40,
    //   "date": "2020-06-03T12:19:00+00:00"
    // },
    // {
    //   "value": 50,
    //   "date": "2020-06-05T12:19:00+00:00"
    // },
    // {
    //   "value": 75,
    //   "date": "2020-06-07T12:19:00+00:00"
    // },
    // {
    //   "value": 20,
    //   "date": "2020-06-09T12:19:00+00:00"
    // },
    // {
    //   "value": 50,
    //   "date": "2020-06-11T12:19:00+00:00"
    // },
    // {
    //   "value": 80,
    //   "date": "2020-06-13T12:19:00+00:00"
    // },
    // {
    //   "value": 75,
    //   "date": "2020-06-15T12:19:00+00:00"
    // },
    // {
    //   "value": 82,
    //   "date": "2020-06-17T12:19:00+00:00"
    // },
    // {
    //   "value": 55,
    //   "date": "2020-06-19T12:19:00+00:00"
    // },
    // {
    //   "value": 35,
    //   "date": "2020-06-21T12:19:00+00:00"
    // },
    // {
    //   "value": 34,
    //   "date": "2020-06-23T12:19:00+00:00"
    // },
    // {
    //   "value": 45,
    //   "date": "2020-06-25T12:19:00+00:00"
    // },
    // {
    //   "value": 58,
    //   "date": "2020-06-27T12:19:00+00:00"
    // },
    // {
    //   "value": 34,
    //   "date": "2020-06-29T12:19:00+00:00"
    // },
    // {
    //   "value": 60,
    //   "date": "2020-07-01T12:19:00+00:00"
    // },
    // {
    //   "value": 75,
    //   "date": "2020-07-03T12:19:00+00:00"
    // },
    // {
    //   "value": 80,
    //   "date": "2020-07-05T12:19:00+00:00"
    // },
    // {
    //   "value": 29,
    //   "date": "2020-07-07T12:19:00+00:00"
    // },
    // {
    //   "value": 40,
    //   "date": "2020-07-09T12:19:00+00:00"
    // },
    // {
    //   "value": 54,
    //   "date": "2020-07-11T12:19:00+00:00"
    // },
    // {
    //   "value": 67,
    //   "date": "2020-07-13T12:19:00+00:00"
    // },
    // {
    //   "value": 90,
    //   "date": "2020-07-15T12:19:00+00:00"
    // },
    // {
    //   "value": 84,
    //   "date": "2020-07-17T12:19:00+00:00"
    // },
    // {
    //   "value": 43,
    //   "date": "2020-07-19T12:19:00+00:00"
    // }
    // ];
    // if (d3 && data){
    //   const svg = d3.select("svg")
    //     .attr("width", width)
    //     .attr("height", height);
    //
    //   const svgInner = svg
    //     .append("g")
    //     .style("transform", "translate(" + marginLeft + "px, " + marginLeft + "px)");
    //
    //
    //   const xAxisBottom = d3.scaleTime().domain(d3.extent(data, d => {
    //     if (d.date && d.value){
    //       return new Date(d.date)
    //     }
    //
    //   }));
    //   const yAxisLeft = d3
    //     .scaleLinear()
    //     .domain([d3.max(data, d => d.value)! + 1, d3.min(data, d => d.value)! - 1])
    //     .range([0, height - 2 * marginLeft]);
    //
    //
    //
    //   const line = d3.line()
    //     .x((d) => xAxisBottom(d.length))
    //     .y((d) => yAxisLeft(d.length))
    //     .curve(d3.curveCatmullRom.alpha(0.5));
    //
    //   svg.append("g")
    //     .attr("transform", `translate(0,${height - marginBottom})`)
    //     .call(d3.axisBottom(xAxisBottom));
    //
    //   svg.append("g")
    //     .attr("transform", `translate(${marginLeft},0)`)
    //     .call(d3.axisLeft(yAxisLeft));

    // svg.append("g")
    //   .attr("transform", `translate(0,${marginTop})`)
    //   .call(d3.axisBottom(xAxisTop));
    //
    // svg.append("g")
    //   .attr("transform", `translate(${width-marginRight},0)`)
    //   .call(d3.axisLeft(yAxisRight));

    // svg.node()

    const margin = {top: 10, right: 30, bottom: 30, left: 60};
    const width = 460 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const data = [
      [
        {"date": new Date('2018-04-14'), "value": 8140.71},
        {"date": new Date('2018-04-15'), "value": 8338.42},
        {"date": new Date('2018-04-16'), "value": 8371.15},
        {"date": new Date('2018-04-17'), "value": 8285.96},
        {"date": new Date('2018-04-18'), "value": 8197.8},
        {"date": new Date('2018-04-19'), "value": 8298.69},
        {"date": new Date('2018-04-20'), "value": 8880.23},
        {"date": new Date('2018-04-21'), "value": 8997.57},
        {"date": new Date('2018-04-22'), "value": 9001.64},
        {"date": new Date('2018-04-23'), "value": 8958.55}
      ],
      [
        {"date": new Date('2018-04-27'), "value": 8285.96},
        {"date": new Date('2018-04-26'), "value": 8097.8},
        {"date": new Date('2018-04-25'), "value": 8298.69},
        {"date": new Date('2018-04-24'), "value": 8080.23},
        {"date": new Date('2018-04-23'), "value": 8097.57},
      ]

    ]
    const flatMap = data.flat()
    const svg = d3.select("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    const test = d3.extent(flatMap, (d) => d.date)
    if (test[0] && test[1]){
      const x = d3.scaleTime()
        .domain(test)
        .range([0, width])

      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      const y = d3.scaleLinear()
        .domain( [8000, 9200])
        .range([ height, 0 ])

      svg.append("g")
        .call(d3.axisLeft(y));

      data.forEach( dat => {
        const line = d3.line<{date: Date; value: number}>()
          .x(d => x(d.date))
          .y(d => y(d.value));

        svg.append("path")
          .datum(dat)
          .attr("fill", "none")
          .attr("stroke", "#69b3a2")
          .attr("stroke-width", 1.5)
          .attr("d", line)
      })


    }



  }
}
