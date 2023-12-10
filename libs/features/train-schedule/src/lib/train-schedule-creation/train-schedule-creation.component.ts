import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {
  ILineModel, ITrainForScheduleModel, ITrainModel, ITrainScheduleModel,
} from "@rtrain/domain/models";
import {ActivatedRoute, Router} from "@angular/router";
import {
  LineService,
  TrainForScheduleService,
  TrainScheduleService, TrainService,
} from "@rtrain/api";
import {MessageService} from "primeng/api";

@Component({
  selector: 'rtrain-train-schedule-creation',
  templateUrl: './train-schedule-creation.component.html',
  styleUrls: ['./train-schedule-creation.component.css'],
})
export class TrainScheduleCreationComponent {
  @ViewChild('formRef') form!: NgForm;

  lineId = ''
  trainForScheduleId = ''
  line: ILineModel | undefined;
  train: ITrainModel | undefined;
  trainSchedules: ITrainScheduleModel[] = [];
  trainForSchedule: ITrainForScheduleModel | undefined;
  validateForm = false;
  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private lineService: LineService,
      private messageService: MessageService,
      private trainScheduleService: TrainScheduleService,
      private trainForScheduleService: TrainForScheduleService,
      private trainService: TrainService
  ) {
  }

  ngOnInit(): void {
    this.trainForScheduleId = this.activatedRoute.snapshot.paramMap.get("trainId")!;
    this.lineId = this.activatedRoute.snapshot.paramMap.get("lineID")!;
    this.getTrainAndTrainForSchedule();
    this.getTrainSchedule();

  }

  getTrainAndTrainForSchedule(){
    if (this.trainForScheduleId) {
      this.trainForScheduleService.getById(this.trainForScheduleId).subscribe({
        next: (res) => {
          if (res.body) {
            this.train = res.body.train;
            this.trainForSchedule = res.body;
            console.log(res.body)
          }
        },
        complete: () => {
          this.getLine();
        }
      })
    }
  }

  getLine(){
    if (this.lineId) this.lineService.getById(this.lineId).subscribe({
      next: data => {
        if (data.body) this.line = data.body
      },
      complete: () => {
        this.getTrainSchedule();
      }
    });
  }

  getTrainSchedule(){
    if (this.train && this.train.id) {
      this.trainScheduleService.getTrainScheduleForLine(this.lineId, this.train.id, this.trainForScheduleId).subscribe({
        next: (res) => {
          if (res.body) {
            this.convertStringDateToObject(res.body);
          }
        },
        error: (err) => console.error(err)
      })
    }
  }

  saveAll(){
    const trainScheduleCopy = JSON.parse(JSON.stringify(this.trainSchedules))
    trainScheduleCopy.forEach( (tS: ITrainScheduleModel) => {
      if (tS.departureTime) {
        tS.departureTime = new Date(tS.departureTime)
        tS.departureTime.setHours(tS.departureTime.getHours() + 1)
      }
      if (tS.arrivalTime) {
        tS.arrivalTime = new Date(tS.arrivalTime)
        tS.arrivalTime.setHours(tS.arrivalTime.getHours() + 1)
      }
      tS.stationId = tS.station?.id;
      tS.station = undefined;
      tS.trainId = tS.train?.id;
      tS.train = undefined;
      tS.lineId = tS.line?.id;
      tS.line = undefined;
      tS.trainForScheduleId = this.trainForScheduleId
      tS.trainForSchedule = undefined;
    })

    this.trainScheduleService.saveAll(trainScheduleCopy).subscribe({
      error: (error: any) => {
        this.messageService.add({severity: 'error', summary: 'Wystąpił błąd', detail: error.message})
      },
      complete: () => {
        this.messageService.add({severity: 'success', summary: 'Sukces', detail: 'Pomyślnie utworzono lub zmodyfikowano rozkład jazdy'})
        this.changeTrainScheduleState();
      }
    })
  }

  changeTrainScheduleState(){
    this.trainForScheduleService.setTrainForScheduleStateTrue(this.trainForScheduleId).subscribe({})
  }

  convertStringDateToObject(trainSchedules: ITrainScheduleModel[]){
    trainSchedules.forEach(tS => {
      if (tS.arrivalTime != null) tS.arrivalTime = new Date(tS.arrivalTime);
      if (tS.departureTime != null) tS.departureTime = new Date(tS.departureTime)
    })

    this.trainSchedules = trainSchedules;
  }

  checkIfIsValid() {
    let validFlag = false;
    setTimeout(() => {
      this.trainSchedules.forEach(tS => {
        if (tS.arrivalTime && !tS.departureTime) validFlag = true;
      });
      this.validateForm = validFlag;
    },100)

  }

}
