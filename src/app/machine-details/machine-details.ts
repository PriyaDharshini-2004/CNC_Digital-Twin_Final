import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { NgChartsModule } from 'ng2-charts';
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';


import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-machine-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, NgChartsModule, MatIconModule],
  templateUrl: './machine-details.html',
  styleUrls: ['./machine-details.scss']
})
export class MachineDetailsComponent {
  machineId: string = '';
  machine: any = {};

  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Runtime', 'Idle Time', 'Breakdown'],
    datasets: [{ data: [0, 0, 0], backgroundColor: ['#42a5f5', '#ffa726', '#ef5350'] }]
  };

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [''],
    datasets: [
      {
        data: [this.machine.planned],
        label: 'Planned',
        backgroundColor: '#66bb6a'
      },
      {
        data: [this.machine.actual],
        label: 'Actual',
        backgroundColor: '#29b6f6'
      }
    ]
  };

  machines = [
    { id: 'CNC-001', runtime: '5h 23m', idle: '1h 12m', breakdown: '0h 45m', oee: '92.3%', planned: 200, partId: 'PRT-1234', actual: 180, emp: 'EMP-001', idleReasons: [{ reason: 'Part Changing', time: '0h 20m' }, { reason: 'Tool Changing', time: '0h 10m' }] },
  { id: 'CNC-002', runtime: '4h 50m', idle: '1h 30m', breakdown: '0h 20m', oee: '88.1%', planned: 210, partId: 'PRT-5678', actual: 190, emp: 'EMP-002', idleReasons: [{ reason: 'Part Changing', time: '0h 15m' }, { reason: 'Tool Changing', time: '0h 12m' }] },
  { id: 'CNC-003', runtime: '3h 40m', idle: '2h 10m', breakdown: '0h 30m', oee: '80.2%', planned: 180, partId: 'PRT-3456', actual: 160, emp: 'EMP-003', idleReasons: [{ reason: 'Setup', time: '0h 25m' }] },
  { id: 'CNC-004', runtime: '2h 50m', idle: '3h 20m', breakdown: '0h 40m', oee: '75.0%', planned: 170, partId: 'PRT-7890', actual: 150, emp: 'EMP-004', idleReasons: [{ reason: 'Coolant Check', time: '0h 10m' }] },
  { id: 'CNC-005', runtime: '4h 10m', idle: '1h 45m', breakdown: '0h 35m', oee: '85.6%', planned: 220, partId: 'PRT-9012', actual: 200, emp: 'EMP-005', idleReasons: [{ reason: 'Tool Changing', time: '0h 15m' }] },
  { id: 'CNC-006', runtime: '3h 15m', idle: '2h 30m', breakdown: '0h 20m', oee: '78.9%', planned: 160, partId: 'PRT-1123', actual: 145, emp: 'EMP-006', idleReasons: [{ reason: 'Calibration', time: '0h 20m' }] },
  { id: 'CNC-007', runtime: '5h 45m', idle: '1h 00m', breakdown: '0h 15m', oee: '93.1%', planned: 240, partId: 'PRT-3344', actual: 230, emp: 'EMP-007', idleReasons: [{ reason: 'Material Load', time: '0h 10m' }] },
  { id: 'CNC-008', runtime: '2h 20m', idle: '4h 00m', breakdown: '0h 40m', oee: '60.5%', planned: 130, partId: 'PRT-5566', actual: 110, emp: 'EMP-008', idleReasons: [{ reason: 'Inspection', time: '0h 30m' }] },
  { id: 'CNC-009', runtime: '4h 00m', idle: '2h 00m', breakdown: '0h 30m', oee: '82.0%', planned: 200, partId: 'PRT-7788', actual: 185, emp: 'EMP-009', idleReasons: [{ reason: 'Part Changing', time: '0h 15m' }] },
  { id: 'CNC-010', runtime: '3h 55m', idle: '2h 15m', breakdown: '0h 20m', oee: '83.3%', planned: 190, partId: 'PRT-9900', actual: 170, emp: 'EMP-010', idleReasons: [{ reason: 'Tool Inspection', time: '0h 10m' }] },

  { id: 'CNC-011', runtime: '4h 10m', idle: '1h 50m', breakdown: '0h 25m', oee: '87.2%', planned: 210, partId: 'PRT-2211', actual: 200, emp: 'EMP-011', idleReasons: [{ reason: 'Material Delay', time: '0h 12m' }] },
  { id: 'CNC-012', runtime: '2h 45m', idle: '3h 15m', breakdown: '0h 20m', oee: '72.0%', planned: 150, partId: 'PRT-3345', actual: 135, emp: 'EMP-012', idleReasons: [{ reason: 'Setup', time: '0h 30m' }] },
  { id: 'CNC-013', runtime: '5h 00m', idle: '1h 30m', breakdown: '0h 15m', oee: '90.0%', planned: 230, partId: 'PRT-5567', actual: 215, emp: 'EMP-013', idleReasons: [{ reason: 'Coolant Top-up', time: '0h 10m' }] },
  { id: 'CNC-014', runtime: '4h 25m', idle: '1h 40m', breakdown: '0h 30m', oee: '86.5%', planned: 205, partId: 'PRT-6688', actual: 190, emp: 'EMP-014', idleReasons: [{ reason: 'Tool Change', time: '0h 15m' }] },
  { id: 'CNC-015', runtime: '3h 35m', idle: '2h 20m', breakdown: '0h 25m', oee: '79.4%', planned: 180, partId: 'PRT-1122', actual: 165, emp: 'EMP-015', idleReasons: [{ reason: 'Shift Change', time: '0h 20m' }] },
  { id: 'CNC-016', runtime: '2h 50m', idle: '3h 10m', breakdown: '0h 40m', oee: '70.2%', planned: 140, partId: 'PRT-2233', actual: 125, emp: 'EMP-016', idleReasons: [{ reason: 'Setup Delay', time: '0h 25m' }] },
  { id: 'CNC-017', runtime: '4h 55m', idle: '1h 10m', breakdown: '0h 15m', oee: '91.0%', planned: 225, partId: 'PRT-3346', actual: 210, emp: 'EMP-017', idleReasons: [{ reason: 'Tool Changing', time: '0h 10m' }] },
  { id: 'CNC-018', runtime: '3h 20m', idle: '2h 50m', breakdown: '0h 25m', oee: '77.5%', planned: 170, partId: 'PRT-4455', actual: 155, emp: 'EMP-018', idleReasons: [{ reason: 'Cleaning', time: '0h 20m' }] },
  { id: 'CNC-019', runtime: '4h 35m', idle: '1h 30m', breakdown: '0h 20m', oee: '85.3%', planned: 200, partId: 'PRT-5568', actual: 190, emp: 'EMP-019', idleReasons: [{ reason: 'Tool Calibration', time: '0h 15m' }] },
  { id: 'CNC-020', runtime: '2h 40m', idle: '3h 00m', breakdown: '0h 30m', oee: '68.8%', planned: 160, partId: 'PRT-6677', actual: 140, emp: 'EMP-020', idleReasons: [{ reason: 'Material Shortage', time: '0h 20m' }] },

  { id: 'CNC-021', runtime: '4h 20m', idle: '1h 50m', breakdown: '0h 10m', oee: '88.4%', planned: 210, partId: 'PRT-7789', actual: 200, emp: 'EMP-021', idleReasons: [{ reason: 'Part Load Delay', time: '0h 10m' }] },
  { id: 'CNC-022', runtime: '3h 00m', idle: '2h 30m', breakdown: '0h 40m', oee: '75.2%', planned: 175, partId: 'PRT-8890', actual: 160, emp: 'EMP-022', idleReasons: [{ reason: 'Tool Breakage', time: '0h 30m' }] },
  { id: 'CNC-023', runtime: '5h 10m', idle: '1h 15m', breakdown: '0h 25m', oee: '90.1%', planned: 230, partId: 'PRT-9901', actual: 215, emp: 'EMP-023', idleReasons: [{ reason: 'Setup Time', time: '0h 20m' }] },
  { id: 'CNC-024', runtime: '4h 30m', idle: '1h 45m', breakdown: '0h 15m', oee: '87.7%', planned: 210, partId: 'PRT-1011', actual: 200, emp: 'EMP-024', idleReasons: [{ reason: 'Shift End Delay', time: '0h 10m' }] },
  { id: 'CNC-025', runtime: '3h 10m', idle: '2h 40m', breakdown: '0h 35m', oee: '76.4%', planned: 185, partId: 'PRT-1124', actual: 170, emp: 'EMP-025', idleReasons: [{ reason: 'Tool Cleaning', time: '0h 15m' }] },
  { id: 'CNC-026', runtime: '2h 35m', idle: '3h 10m', breakdown: '0h 25m', oee: '69.5%', planned: 150, partId: 'PRT-2235', actual: 135, emp: 'EMP-026', idleReasons: [{ reason: 'Coolant Issue', time: '0h 20m' }] },
  { id: 'CNC-027', runtime: '4h 00m', idle: '2h 00m', breakdown: '0h 30m', oee: '83.5%', planned: 195, partId: 'PRT-3347', actual: 180, emp: 'EMP-027', idleReasons: [{ reason: 'Tool Alignment', time: '0h 15m' }] },
  { id: 'CNC-028', runtime: '3h 30m', idle: '2h 15m', breakdown: '0h 15m', oee: '80.8%', planned: 180, partId: 'PRT-4456', actual: 165, emp: 'EMP-028', idleReasons: [{ reason: 'Part Setup', time: '0h 10m' }] },
  { id: 'CNC-029', runtime: '4h 45m', idle: '1h 20m', breakdown: '0h 15m', oee: '89.0%', planned: 215, partId: 'PRT-5569', actual: 205, emp: 'EMP-029', idleReasons: [{ reason: 'Inspection Delay', time: '0h 10m' }] },
  { id: 'CNC-030', runtime: '3h 25m', idle: '2h 35m', breakdown: '0h 30m', oee: '78.2%', planned: 190, partId: 'PRT-6678', actual: 175, emp: 'EMP-030', idleReasons: [{ reason: 'Tool Prep', time: '0h 15m' }] }
];

constructor(private route: ActivatedRoute, private location: Location) {
  this.route.params.subscribe(params => {
    this.machineId = params['machineId']?.toUpperCase();
    this.machine = this.machines.find(m => m.id === this.machineId) || this.machines[0];

    const runtime = this.timeToMinutes(this.machine.runtime);
    const idle = this.timeToMinutes(this.machine.idle);
    const breakdown = this.timeToMinutes(this.machine.breakdown);

    this.pieChartData = {
      labels: ['Runtime', 'Idle Time', 'Breakdown'],
      datasets: [
        {
          data: [runtime, idle, breakdown],
          backgroundColor: ['#42a5f5', '#ffa726', '#ef5350']
        }
      ]
    };

    this.barChartData = {
      labels: [''],
      datasets: [
        {
          data: [this.machine.planned],
          label: 'Planned',
          backgroundColor: '#66bb6a'
        },
        {
          data: [this.machine.actual],
          label: 'Actual',
          backgroundColor: '#29b6f6'
        }
      ]
    };
  });
}

private timeToMinutes(timeStr: string): number {
  const match = timeStr.match(/(\d+)h\s*(\d+)m/);
  if (!match) return 0;
  const hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  return hours * 60 + minutes;
}

goBack() {
  this.location.back();
}
}