import { Component, OnInit } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StorageComponent } from './storage/storage.component';
import { BatteryComponent } from './battery/battery.component';
import { RamComponent } from './ram/ram.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { CpuComponent } from './cpu/cpu.component';
import { GetAverageService } from './get-average.service'
import { stats } from '../assets/data_structure'
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { NotificationService } from "./notification.service";
import {NewusersComponent} from './newusers/newusers.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private swUpdate: SwUpdate, public dialog: MatDialog, private getState: GetAverageService, private notification: NotificationService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  public typeofCustomer: Boolean = true;
  public newCustomer: Boolean = false;
  public oldCustomer: Boolean = false;

  //Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  public DiskpieChartLabels: Label[];
  public DiskpieChartData: SingleDataSet;
  public DiskpieChartType: ChartType;
  public DiskpieChartLegend = true;
  public DiskpieChartPlugins = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
   xAxes: [
    {
        display: false
    }
  ],
   yAxes: [
      {
        display: true
    }
]
}
  };
  public BattbarChartLabels: Label[];
  public BattbarChartType: ChartType = 'horizontalBar';
  public BattbarChartLegend = false;
  public BattbarChartPlugins = [];
  public BattbarChartData: ChartDataSets[];


  public RAMpieChartLabels: Label[];
  public RAMpieChartData: SingleDataSet;
  public RAMpieChartType: ChartType;
  public RAMpieChartLegend = true;
  public RAMpieChartPlugins = [];

  public CpupieChartLabels: Label[];
  public CpupieChartData: SingleDataSet;
  public CpupieChartType: ChartType;
  public CpupieChartLegend = true;
  public CpupieChartPlugins = [];

  public TempBarChartLabels: Label[];
  public TempBarChartType: ChartType = 'horizontalBar';
  public TempBarChartLegend = false;
  public TempBarChartPlugins: [];
  public TempBarChartData: ChartDataSets[];


  data: stats;
  dataCollected = false;
  ramAvg: number;
  cpuAvg: number;
  diskAvg: number;
  tempAvg: number;
  batteryAvg: number;

  ngOnInit() {

    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm("New version available. Load new version?")) {
          window.location.reload();
        }
      });
    }

    this.getState.getAverage()
      .then((res: stats) => {
        this.data = res;
        this.dataCollected = true;
      })
      .then(() => {
        this.DiskpieChartLabels = [['Average', 'Usage:',this.data.diskAvg.toString() + '%'], ['Average', 'Available:', (100 - this.data.diskAvg).toString() + '%']];
        this.DiskpieChartData = [this.data.diskAvg, 100 - this.data.diskAvg];
        this.DiskpieChartType = 'pie';

        this.BattbarChartLabels = ['Battery Life = ' + this.data.batteryAvg.toString() + '%'];
        this.BattbarChartType = "horizontalBar";
        this.BattbarChartLegend = false;
        this.BattbarChartData = [
          { data: [this.data.batteryAvg], stack: 'a' },
          { data: [100-this.data.batteryAvg], stack:'a' }
        ];

        this.RAMpieChartLabels = [['Average', 'Usage:',this.data.ramAvg.toString() + '%'], ['Average', 'Available:', (100 - this.data.ramAvg).toString() + '%']];
        this.RAMpieChartData = [this.data.ramAvg, 100 - this.data.ramAvg];
        this.RAMpieChartType = 'pie';

        this.CpupieChartLabels = [['Average', 'Usage:',this.data.cpuAvg.toString() + '%'], ['Average', 'Available:', (100 - this.data.cpuAvg).toString() + '%']];
        this.CpupieChartData = [this.data.cpuAvg, 100 - this.data.cpuAvg];
        this.CpupieChartType = 'pie';

        this.TempBarChartLabels = ['Temperature = ' + this.data.tempAvg.toString() + '*C'];
        this.TempBarChartType = "horizontalBar";
        this.TempBarChartLegend = false;
        this.TempBarChartData = [
          { data: [this.data.tempAvg], stack: 'a' },
          { data: [100-this.data.batteryAvg], stack:'a' }
        ];

      });
  }

  decideCustomer(value){
    this.typeofCustomer = false;
    if (value == "New Customer") {
      this.newCustomer = true;
    } else {
      this.oldCustomer = true;
    }
  }

  openStorage(): void {
    const dialogRef = this.dialog.open(StorageComponent, {
      width: 'auto',
      height: 'auto',
      data: { diskAvg: this.data.diskAvg }
    });
  }
  openBattery(): void {
    const dialogRef = this.dialog.open(BatteryComponent, {
      width: 'auto',
      height: 'auto',
      data: { batteryAvg: this.data.batteryAvg }
    });
  }

  openRAM(): void {
    const dialogRef = this.dialog.open(RamComponent, {
      width: 'auto',
      height: 'auto',
      data: { ramAvg: this.data.ramAvg }
    });
  }
  openTemperature(): void {
    const dialogRef = this.dialog.open(TemperatureComponent, {
      width: 'auto',
      height: 'auto',
      data: { tempAvg: this.data.tempAvg }
    });
  }
  openCPU(): void {
    const dialogRef = this.dialog.open(CpuComponent, {
      width: 'auto',
      height: 'auto',
      data: { cpuAvg: this.data.cpuAvg }
    });
  }

  sendNotification(): void{
    this.notification.nodeCall();
  }
}
