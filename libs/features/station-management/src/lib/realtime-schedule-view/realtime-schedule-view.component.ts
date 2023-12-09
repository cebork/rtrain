import {Component, OnDestroy, OnInit} from '@angular/core';
import {RealtimeTrainScheduleService} from "@rtrain/api";
import {AuthState, getAccount} from "@rtrain/shell/auth";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {AccountModel, IRealtimeTrainScheduleModel} from "@rtrain/domain/models";

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
    private store: Store<AuthState>
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
            if (res.body) this.realtimeTrainSchedules = res.body
          },
          complete: () => this.startInterval()
        })
      }
    }, 100)

  }

  checkIfToday(scheduleForDay: Date | undefined) {
    if (scheduleForDay){
      const newDate = new Date(scheduleForDay)
      console.log(newDate.toDateString()===new Date().toDateString())
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
    return this.closestSchedule && schedule === this.closestSchedule;
  }

  ngOnDestroy() {
    // Clear the interval when the component is destroyed
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

}
