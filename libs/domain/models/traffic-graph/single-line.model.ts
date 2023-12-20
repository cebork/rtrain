import {ITrainModel} from "../trainModels/train.model";


export interface ISingleLine {
  time: Date | null;
  value: string;
  train: ITrainModel;
}
export class SingleLine implements ISingleLine {
  time: Date | null;
  value: string;
  train: ITrainModel;

  constructor(time: Date | null, value: string, train: ITrainModel) {
    this.time = time;
    this.value = value;
    this.train = train
  }
}
