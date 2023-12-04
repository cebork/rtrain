import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {
  ILineModel, ITrainModel, ITrainScheduleModel,
} from "@rtrain/domain/models";
import {ActivatedRoute, Router} from "@angular/router";
import {
  LineService,
  TrainForScheduleService,
  TrainScheduleService,
} from "@rtrain/api";
import {MessageService} from "primeng/api";
import removeLibraryGeneratorSimpleModuleNameOption
  from "@nx/angular/src/migrations/update-16-0-0/remove-library-generator-simple-module-name-option";
import * as ts from "@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript";

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

  x = new Date()

  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private lineService: LineService,
      private messageService: MessageService,
      private trainScheduleService: TrainScheduleService,
      private trainForScheduleService: TrainForScheduleService
  ) {
    console.log(this.x)
  }

  ngOnInit(): void {
    this.trainForScheduleId = this.activatedRoute.snapshot.paramMap.get("trainId")!;
    this.lineId = this.activatedRoute.snapshot.paramMap.get("lineID")!;
    this.getTrain();
    this.getTrainSchedule();

  }

  getTrain(){
    if (this.trainForScheduleId) {
      this.trainForScheduleService.getById(this.trainForScheduleId).subscribe({
        next: (res) => {
          if (res.body) this.train = res.body.train;
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
      this.trainScheduleService.getTrainScheduleForLine(this.lineId, this.train.id).subscribe({
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
    console.log('fresh', )
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
    })
    console.log(this.trainSchedules)
    this.trainScheduleService.saveAll(trainScheduleCopy).subscribe({
      error: (error: any) => {
        this.messageService.add({severity: 'error', summary: 'Wystąpił błąd', detail: error.message})
      },
      complete: () => {
        this.messageService.add({severity: 'success', summary: 'Sukces', detail: 'Pomyślnie utworzono lub zmodyfikowano rozkład jazdy'})
      }
    })
  }

  convertStringDateToObject(trainSchedules: ITrainScheduleModel[]){
    trainSchedules.forEach(tS => {
      if (tS.arrivalTime != null) tS.arrivalTime = new Date(tS.arrivalTime);
      if (tS.departureTime != null) tS.departureTime = new Date(tS.departureTime)
    })

    this.trainSchedules = trainSchedules;
  }
}
