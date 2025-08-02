import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  ],
  templateUrl: './reports.html',
  styleUrls: ['./reports.scss']
})
export class ReportsComponent {
  reportTypes = [
    { value: 'oee', label: 'OEE Analysis', icon: 'trending_up' },
    { value: 'production', label: 'Production Report', icon: 'bar_chart' },
    { value: 'cost', label: 'Cost Analysis', icon: 'attach_money' },
    { value: 'utilization', label: 'Machine Utilization', icon: 'settings' },
    { value: 'tool', label: 'Tool Analysis', icon: 'build' },
    { value: 'performance', label: 'Performance Summary', icon: 'description' }
  ];
  dateRanges = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'custom', label: 'Custom Range' }
  ];
  machines = [
    { value: 'all', label: 'All Machines' },
    ...Array.from({ length: 30 }, (_, i) => ({
      value: `CNC-${(i + 1).toString().padStart(3, '0')}`,
      label: `CNC-${(i + 1).toString().padStart(3, '0')}`
    }))
  ];

  selectedReportType = 'oee';
  selectedDateRange = 'today';
  selectedMachine = 'all';
  customStartDate: Date | null = null;
  customEndDate: Date | null = null;

  // Example data
  averageOEE = 36.8;
  runningMachines = 8;
  totalMachines = 30;
  targetOEE = 85;

  // Store the original data for filtering
  originalTopPerformers = [
    { machine: 'CNC-002', oee: 99.9, status: 'running' },
    { machine: 'CNC-014', oee: 98.1, status: 'running' },
    { machine: 'CNC-028', oee: 96.9, status: 'running' },
    { machine: 'CNC-011', oee: 95.3, status: 'running' },
    { machine: 'CNC-025', oee: 92.4, status: 'running' }
  ];
  originalNeedsImprovement = [
    { machine: 'CNC-003', oee: 0, status: 'maintenance' },
    { machine: 'CNC-004', oee: 0, status: 'breakdown' },
    { machine: 'CNC-006', oee: 0, status: 'maintenance' },
    { machine: 'CNC-008', oee: 0, status: 'maintenance' },
    { machine: 'CNC-010', oee: 0, status: 'breakdown' }
  ];

  // Use these for display
  topPerformers = [...this.originalTopPerformers];
  needsImprovement = [...this.originalNeedsImprovement];

  exportReport() {
    // Example: Export top performers as CSV
    const header = 'Machine,OEE,Status\n';
    const rows = this.topPerformers.map(
      row => `${row.machine},${row.oee}%,${row.status}`
    );
    const csvContent = header + rows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  refreshReports() {
    // Filter logic for machine
    let filteredTop = this.originalTopPerformers;
    let filteredNeeds = this.originalNeedsImprovement;

    if (this.selectedMachine !== 'all') {
      filteredTop = filteredTop.filter(row => row.machine === this.selectedMachine);
      filteredNeeds = filteredNeeds.filter(row => row.machine === this.selectedMachine);
    }

    // You can add more filter logic for reportType, dateRange, etc. as needed

    this.topPerformers = filteredTop;
    this.needsImprovement = filteredNeeds;

    // Update stats based on filtered data
    const allOee = [...filteredTop, ...filteredNeeds].map(row => row.oee);
    this.averageOEE = allOee.length ? +(allOee.reduce((a, b) => a + b, 0) / allOee.length).toFixed(1) : 0;
    this.runningMachines = [...filteredTop, ...filteredNeeds].filter(row => row.status === 'running').length;
    this.totalMachines = [...filteredTop, ...filteredNeeds].length;
    console.log('Reports filtered!');
  }
}
