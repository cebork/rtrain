import {Component, OnInit} from '@angular/core';
import {ITrainModel} from "../../../../../domain/models/trainModels/train.model";

@Component({
  selector: 'rtrain-trains',
  templateUrl: './trains.component.html',
  styleUrls: ['./trains.component.css'],
})
export class TrainsComponent implements OnInit{
  trains!: ITrainModel | any

  cols!: {field: string, header: string}[];
  ngOnInit() {
    this.initTable()
  }


  initTable(){
    this.cols = [
      { field: 'code', header: 'Kod' },
      { field: 'name', header: 'Nazwa' },
      { field: 'wagonNumber', header: 'Ilość wagonów' },
      { field: 'scheduled', header: 'Czy w rozkładzie jazdy?' }
    ];
  }
}
