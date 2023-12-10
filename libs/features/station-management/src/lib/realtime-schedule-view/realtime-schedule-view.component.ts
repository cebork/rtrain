import {Component, OnDestroy, OnInit} from '@angular/core';
import {RealtimeTrainScheduleService} from "@rtrain/api";
import {AuthState, getAccount} from "@rtrain/shell/auth";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {AccountModel, IRealtimeTrainScheduleModel, ITrainScheduleModel} from "@rtrain/domain/models";
import {MessageService} from "primeng/api";

@Component({
  selector: 'rtrain-realtime-schedule-view',
  templateUrl: './realtime-schedule-view.component.html',
  styleUrls: ['./realtime-schedule-view.component.css'],
})
export class RealtimeScheduleViewComponent implements OnInit, OnDestroy{

  account$: Observable<AccountModel | null>;
  account: AccountModel | undefined;
  realtimeTrainSchedules: IRealtimeTrainScheduleModel[] = [];
  closestSchedule: any;
  intervalId: any;

  constructor(
    private realtimeTrainScheduleService :RealtimeTrainScheduleService,
    private store: Store<AuthState>,
    private messageService: MessageService
  ) {
    this.account$ = this.store.select(getAccount);
  }

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadRealTimeTrainSchedule();
  }

  loadCurrentUser(){
    this.account$.subscribe({
      next: (data) => {
        if (data) this.account = data;
      }
    })
  }

  loadRealTimeTrainSchedule(){
    setTimeout(() => {
      if (this.account && this.account.stationId) {
        this.realtimeTrainScheduleService.getTodaySchedule(this.account.stationId).subscribe({
          next: (res) => {
            if (res.body) this.convertStringDateToObject(res.body)
          },
          complete: () => this.startInterval()
        })
      }
    }, 100)

  }

  checkIfToday(scheduleForDay: Date | undefined) {
    if (scheduleForDay){
      const newDate = new Date(scheduleForDay)
      return newDate.toDateString() === new Date().toDateString()
    }
    return false;
  }

  startInterval() {
    this.intervalId = setInterval(() => {
      this.findClosestSchedule();
    }, 30000); // 30000 milliseconds = 30 seconds
    this.findClosestSchedule(); // Also run it immediately
  }

  findClosestSchedule() {
    let closestDiff = Number.MAX_SAFE_INTEGER;
    const now = new Date();

    this.realtimeTrainSchedules.forEach((schedule) => {
      if (schedule && schedule.trainSchedule && schedule.trainSchedule.arrivalTime){
        const scheduleDate = new Date(schedule.trainSchedule.arrivalTime.toString());
        const diff = Math.abs(now.getTime() - scheduleDate.getTime());
        if (diff < closestDiff) {
          closestDiff = diff;
          this.closestSchedule = schedule;
        }
      }

    });
  }

  isClosest(schedule: any): boolean {
    console.log(2, this.closestSchedule);
    console.log(1, schedule)
    return this.closestSchedule && schedule === this.closestSchedule;
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  save(realTimeTrainSchedule: IRealtimeTrainScheduleModel) {
    const copy = {...realTimeTrainSchedule}
    copy.trainSchedule = undefined;
    copy.train = undefined;
    this.addHourOnSave(copy)
    setTimeout(() => {
      if (this.account && this.account.stationId) {
        this.realtimeTrainScheduleService.saveRealTime(copy, this.account?.stationId).subscribe({
          error: (err) => {
            console.error(err)
            this.messageService.add({severity: 'error', summary: 'Błąd', detail: 'Podczas operacji zapisu wystąpił nieoczekiwany błąd'})
          },
          complete: () => {
            this.findClosestSchedule();
            this.messageService.add({severity: 'success', summary: 'Sukces', detail: 'Operacja wykonana pomyślnie'})
          }
        })
      }
    });
  }

  convertStringDateToObject(realtimeTrainSchedules: IRealtimeTrainScheduleModel[]){
    realtimeTrainSchedules.forEach(rTS => {
      if (rTS.realTimeArrivalTime != null) rTS.realTimeArrivalTime = new Date(rTS.realTimeArrivalTime);
      if (rTS.realTimeDepartureTime != null) rTS.realTimeDepartureTime = new Date(rTS.realTimeDepartureTime)
    })
    this.realtimeTrainSchedules = realtimeTrainSchedules;
  }

  addHourOnSave(realtimeTrainSchedules: IRealtimeTrainScheduleModel){
      if (realtimeTrainSchedules.realTimeArrivalTime != null) realtimeTrainSchedules.realTimeArrivalTime.setHours(realtimeTrainSchedules.realTimeArrivalTime.getHours() + 1)
      if (realtimeTrainSchedules.realTimeDepartureTime != null) realtimeTrainSchedules.realTimeDepartureTime.setHours(realtimeTrainSchedules.realTimeDepartureTime.getHours() + 1)
  }

}
