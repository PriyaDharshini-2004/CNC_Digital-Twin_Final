import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {  OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-machines',
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
    MatNativeDateModule,
    MatTabsModule,
    HttpClientModule,
    NgChartsModule, 
    MatTableModule,
    MatProgressBarModule
  ],
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss']
})
export class MachinesComponent {
  // View switching
  currentView: 'dashboard' | 'analytics' | 'machine-details' | 'master-data' | 'reports' = 'dashboard';

  // --- Dashboard logic (namespaced with dash_ prefix) ---
  dash_Math = Math;
  dash_lastUpdated = new Date().toLocaleTimeString();
  dash_currentPage = 0;
  dash_itemsPerPage = 3;
  dash_machineCards = [
    { title: 'CNC-001', status: 'idle', part: '-', oee: '51.5%' },
    { title: 'CNC-002', status: 'running', part: 'PRT-7891', oee: '98.6%' },
    { title: 'CNC-003', status: 'maintenance', part: '-', oee: '0%' },
    { title: 'CNC-004', status: 'breakdown', part: '-', oee: '0%' },
    { title: 'CNC-005', status: 'idle', part: '-', oee: '56.6%' },
    { title: 'CNC-006', status: 'maintenance', part: '-', oee: '0%' },
    { title: 'CNC-007', status: 'idle', part: '-', oee: '52.4%' },
    { title: 'CNC-008', status: 'maintenance', part: '-', oee: '0%' },
    { title: 'CNC-009', status: 'running', part: 'PRT-5849', oee: '88.6%' },
    { title: 'CNC-010', status: 'breakdown', part: '-', oee: '0%' },
    { title: 'CNC-011', status: 'running', part: 'PRT-1234', oee: '92.3%' },
    { title: 'CNC-012', status: 'idle', part: '-', oee: '45.2%' },
    { title: 'CNC-013', status: 'running', part: 'PRT-5678', oee: '87.1%' },
    { title: 'CNC-014', status: 'maintenance', part: '-', oee: '0%' },
    { title: 'CNC-015', status: 'running', part: 'PRT-9012', oee: '94.5%' },
    { title: 'CNC-016', status: 'breakdown', part: '-', oee: '0%' },
    { title: 'CNC-017', status: 'idle', part: '-', oee: '58.9%' },
    { title: 'CNC-018', status: 'running', part: 'PRT-3456', oee: '96.2%' },
    { title: 'CNC-019', status: 'maintenance', part: '-', oee: '0%' },
    { title: 'CNC-020', status: 'idle', part: '-', oee: '49.7%' },
    { title: 'CNC-021', status: 'running', part: 'PRT-7890', oee: '91.8%' },
    { title: 'CNC-022', status: 'breakdown', part: '-', oee: '0%' },
    { title: 'CNC-023', status: 'maintenance', part: '-', oee: '0%' },
    { title: 'CNC-024', status: 'running', part: 'PRT-2345', oee: '89.3%' },
    { title: 'CNC-025', status: 'idle', part: '-', oee: '53.6%' },
    { title: 'CNC-026', status: 'running', part: 'PRT-6789', oee: '95.1%' },
    { title: 'CNC-027', status: 'maintenance', part: '-', oee: '0%' },
    { title: 'CNC-028', status: 'breakdown', part: '-', oee: '0%' },
    { title: 'CNC-029', status: 'running', part: 'PRT-0123', oee: '93.7%' },
    { title: 'CNC-030', status: 'idle', part: '-', oee: '47.8%' },
  ];
  dash_alertCards = [
    { title: 'Production Target', desc: 'Alert description 2', time: '19 minutes ago', type: 'info', icon: 'check_circle', iconColor: '#00eaff' },
    { title: 'Tool Wear Alert', desc: 'Alert description 13', time: '49 minutes ago', type: 'warn', icon: 'warning', iconColor: '#ffb300' },
    { title: 'Machine Breakdown', desc: 'Alert description 15', time: '3 hours ago', type: 'error', icon: 'error', iconColor: '#ff5252' },
    { title: 'Tool Wear Alert', desc: 'Alert description 9', time: '3 hours ago', type: 'warn', icon: 'warning', iconColor: '#ffb300' },
    { title: 'Machine Breakdown', desc: 'Alert description 5', time: '4 hours ago', type: 'error', icon: 'error', iconColor: '#ff5252' },
  ];
  dash_toolCards = [
    { tool: 'Tool-001', name: 'Boring Bar', amount: '6,966', percent: '92.2%', life: 'Life Remaining', status: 'ok' },
    { tool: 'Tool-002', name: 'Boring Bar', amount: '17,911', percent: '71.8%', life: 'Life Remaining', status: 'ok' },
    { tool: 'Tool-003', name: 'Drill Bit', amount: '22,382', percent: '67.1%', life: 'Life Remaining', status: 'ok' },
    { tool: 'Tool-004', name: 'Face Mill', amount: '30,117', percent: '30.7%', life: 'Life Remaining', status: 'warn' },
    { tool: 'Tool-005', name: 'Turning Tool', amount: '8,631', percent: '0.3%', life: 'Life Remaining', status: 'error' },
  ];
  dash_machinePerformance: Array<{ [key: string]: string | number }> = [
    { machine: 'CNC-001', status: 'idle', part: '-', runtime: '2h 23m', idle: '6h 12m', parts: 146, oee: '51.5%', cost: '₹9,787' },
    { machine: 'CNC-002', status: 'running', part: 'PRT-7891', runtime: '3h 21m', idle: '6h 2m', parts: 160, oee: '98.6%', cost: '₹9,116' },
    // ... add more rows as needed
  ];
  dash_displayedColumns = ['machine', 'status', 'part', 'runtime', 'idle', 'parts', 'oee', 'cost'];
  get dash_paginatedMachineCards() {
    const start = this.dash_currentPage * this.dash_itemsPerPage;
    return this.dash_machineCards.slice(start, start + this.dash_itemsPerPage);
  }
  dash_nextPage() {
    if ((this.dash_currentPage + 1) * this.dash_itemsPerPage < this.dash_machineCards.length) {
      this.dash_currentPage++;
    }
  }
  dash_prevPage() {
    if (this.dash_currentPage > 0) {
      this.dash_currentPage--;
    }
  }
  dash_exportReport() {
    const header = this.dash_displayedColumns.join(',');
    const rows = this.dash_machinePerformance.map(row =>
      this.dash_displayedColumns.map(col => row[col]).join(',')
    );
    const csvContent = [header, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'machine-performance-report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // --- Analytics logic (namespaced with ana_ prefix) ---
  ana_machines: { name: string; oee: number; cost: number; status: 'maintenance' | 'breakdown' | 'idle' | 'running'; }[] = Array.from({ length: 30 }, (_, i) => ({
    name: `CNC-${(i + 1).toString().padStart(3, '0')}`,
    oee: Math.floor(Math.random() * 100),
    cost: Math.floor(Math.random() * 80000) + 10000,
    status: ['maintenance', 'breakdown', 'idle', 'running'][Math.floor(Math.random() * 4)] as 'maintenance' | 'breakdown' | 'idle' | 'running'
  }));
  get ana_totalMachines() { return this.ana_machines.length; }
  get ana_runningMachines() { return this.ana_machines.filter(m => m.status === 'running').length; }
  get ana_averageOEE() { return (this.ana_machines.reduce((sum, m) => sum + m.oee, 0) / this.ana_machines.length).toFixed(1); }
  get ana_totalParts() { return 3307; }
  get ana_totalCost() { return this.ana_machines.reduce((sum, m) => sum + m.cost, 0); }
  get ana_statusCounts(): { maintenance: number; breakdown: number; idle: number; running: number } {
    const counts: { maintenance: number; breakdown: number; idle: number; running: number } = { maintenance: 0, breakdown: 0, idle: 0, running: 0 };
    this.ana_machines.forEach(m => counts[m.status]++);
    return counts;
  }
  get ana_statusPercentages() {
    const total = this.ana_totalMachines;
    const counts = this.ana_statusCounts;
    return {
      maintenance: (counts.maintenance / total * 100).toFixed(1),
      breakdown: (counts.breakdown / total * 100).toFixed(1),
      idle: (counts.idle / total * 100).toFixed(1),
      running: (counts.running / total * 100).toFixed(1),
    };
  }

  // TODO: Add machine-details, master-data, and reports logic here, namespaced as needed
  det_machineId: string = '';
  det_machine: any = {};
  det_pieChartData: any = {
    labels: ['Runtime', 'Idle Time', 'Breakdown'],
    datasets: [{ data: [0, 0, 0], backgroundColor: ['#42a5f5', '#ffa726', '#ef5350'] }]
  };
  det_barChartData: any = {
    labels: [''],
    datasets: [
      {
        data: [0],
        label: 'Planned',
        backgroundColor: '#66bb6a'
      },
      {
        data: [0],
        label: 'Actual',
        backgroundColor: '#29b6f6'
      }
    ]
  };
  det_machines: any[] = [
    // ...copy all machine objects from machine-details.ts...
  ];
  det_setMachineById(machineId: string) {
    this.det_machineId = machineId;
    const found = this.det_machines.find((m: any) => m && m.id === machineId);
    this.det_machine = found || (this.det_machines.length > 0 ? this.det_machines[0] : {});
    const runtime = this.det_timeToMinutes(this.det_machine.runtime);
    const idle = this.det_timeToMinutes(this.det_machine.idle);
    const breakdown = this.det_timeToMinutes(this.det_machine.breakdown);
    this.det_pieChartData = {
      labels: ['Runtime', 'Idle Time', 'Breakdown'],
      datasets: [
        {
          data: [runtime, idle, breakdown],
          backgroundColor: ['#42a5f5', '#ffa726', '#ef5350']
        }
      ]
    };
    this.det_barChartData = {
      labels: [''],
      datasets: [
        {
          data: [this.det_machine.planned],
          label: 'Planned',
          backgroundColor: '#66bb6a'
        },
        {
          data: [this.det_machine.actual],
          label: 'Actual',
          backgroundColor: '#29b6f6'
        }
      ]
    };
  }
  det_timeToMinutes(timeStr: string): number {
    const match = timeStr.match(/(\d+)h\s*(\d+)m/);
    if (!match) return 0;
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    return hours * 60 + minutes;
  }
  det_goBack() {
    // Implement navigation logic if needed
  }

  // Master Data logic (prefix: mas_)
  mas_summary = [
    { icon: 'precision_manufacturing', label: 'Machines', value: 0 },
    { icon: 'build', label: 'Tools', value: 0 },
    { icon: 'category', label: 'Parts', value: 0 },
    { icon: 'groups', label: 'Employees', value: 0 }
  ];
  mas_formTabs = [
    { label: 'Machines', icon: 'precision_manufacturing' },
    { label: 'Tools', icon: 'build' },
    { label: 'Parts', icon: 'category' },
    { label: 'Employees', icon: 'groups' }
  ];
  mas_selectedFormTab = 0;
  mas_listTabs = [
    { label: 'Machines' },
    { label: 'Tools' },
    { label: 'Parts' },
    { label: 'Employees' }
  ];
  mas_selectedListTab = 0;
  mas_machine = { name: '', make: '', type: '', maintenanceDate: '' };
  mas_tool = {
    name: '', toolId: '', purchasedOn: '', life: '', length: '', die: '',
    material: '', workTime: '', lastUsed: '', supplier: ''
  };
  mas_part = {
    customer: '', cycleTime: '', processId: '', processName: '',
    programNumber: '', feedRate: '', spindleSpeed: ''
  };
  mas_employee = {
    id: '', name: '', joiningDate: '', wage: '', skill: '',
    shift: '', phone: '', bloodGroup: ''
  };
  mas_machines: any[] = [];
  mas_tools: any[] = [];
  mas_parts: any[] = [];
  mas_employees: any[] = [];
  mas_getMachines() { /* ...copy logic from master-data.ts... */ }
  mas_getTools() { /* ...copy logic from master-data.ts... */ }
  mas_getParts() { /* ...copy logic from master-data.ts... */ }
  mas_getEmployees() { /* ...copy logic from master-data.ts... */ }
  mas_createMachine() { /* ...copy logic from master-data.ts... */ }
  mas_createTool() { /* ...copy logic from master-data.ts... */ }
  mas_createPart() { /* ...copy logic from master-data.ts... */ }
  mas_createEmployee() { /* ...copy logic from master-data.ts... */ }
  mas_isMachineFormValid() { /* ...copy logic from master-data.ts... */ }
  mas_isToolFormValid() { /* ...copy logic from master-data.ts... */ }
  mas_isPartFormValid() { /* ...copy logic from master-data.ts... */ }
  mas_isEmployeeFormValid() { /* ...copy logic from master-data.ts... */ }

  // Reports logic (prefix: rep_)
  rep_reportTypes = [
    { value: 'oee', label: 'OEE Analysis', icon: 'trending_up' },
    { value: 'production', label: 'Production Report', icon: 'bar_chart' },
    { value: 'cost', label: 'Cost Analysis', icon: 'attach_money' },
    { value: 'utilization', label: 'Machine Utilization', icon: 'settings' },
    { value: 'tool', label: 'Tool Analysis', icon: 'build' },
    { value: 'performance', label: 'Performance Summary', icon: 'description' }
  ];
  rep_dateRanges = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'custom', label: 'Custom Range' }
  ];
  rep_machines = [
    { value: 'all', label: 'All Machines' },
    ...Array.from({ length: 30 }, (_, i) => ({
      value: `CNC-${(i + 1).toString().padStart(3, '0')}`,
      label: `CNC-${(i + 1).toString().padStart(3, '0')}`
    }))
  ];
  rep_selectedReportType = 'oee';
  rep_selectedDateRange = 'today';
  rep_selectedMachine = 'all';
  rep_customStartDate: Date | null = null;
  rep_customEndDate: Date | null = null;
  rep_averageOEE = 36.8;
  rep_runningMachines = 8;
  rep_totalMachines = 30;
  rep_targetOEE = 85;
  rep_topPerformers = [
    { machine: 'CNC-002', oee: 99.9, status: 'running' },
    { machine: 'CNC-014', oee: 98.1, status: 'running' },
    { machine: 'CNC-028', oee: 96.9, status: 'running' },
    { machine: 'CNC-011', oee: 95.3, status: 'running' },
    { machine: 'CNC-025', oee: 92.4, status: 'running' }
  ];
  rep_needsImprovement = [
    { machine: 'CNC-003', oee: 0, status: 'maintenance' },
    { machine: 'CNC-004', oee: 0, status: 'breakdown' },
    { machine: 'CNC-006', oee: 0, status: 'maintenance' },
    { machine: 'CNC-008', oee: 0, status: 'maintenance' },
    { machine: 'CNC-010', oee: 0, status: 'breakdown' }
  ];
  rep_exportReport() {
    const header = 'Machine,OEE,Status\n';
    const rows = this.rep_topPerformers.map(
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

  getTabIndex(): number {
    switch (this.currentView) {
      case 'dashboard': return 0;
      case 'analytics': return 1;
      case 'machine-details': return 2;
      case 'master-data': return 3;
      case 'reports': return 4;
      default: return 0;
    }
  }
  setTabIndex(index: number): void {
    switch (index) {
      case 0: this.currentView = 'dashboard'; break;
      case 1: this.currentView = 'analytics'; break;
      case 2: this.currentView = 'machine-details'; break;
      case 3: this.currentView = 'master-data'; break;
      case 4: this.currentView = 'reports'; break;
      default: this.currentView = 'dashboard';
    }
  }
} 