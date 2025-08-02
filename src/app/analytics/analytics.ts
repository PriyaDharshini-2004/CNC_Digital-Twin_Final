import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

interface Machine {
  name: string;
  oee: number;
  cost: number;
  status: 'maintenance' | 'breakdown' | 'idle' | 'running';
}

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatProgressBarModule],
  templateUrl: './analytics.html',
  styleUrls: ['./analytics.scss']
})
export class AnalyticsComponent {
  machines: Machine[] = Array.from({ length: 30 }, (_, i) => ({
    name: `CNC-${(i + 1).toString().padStart(3, '0')}`,
    oee: Math.floor(Math.random() * 100), // Random OEE for demo
    cost: Math.floor(Math.random() * 80000) + 10000, // Random cost for demo
    status: ['maintenance', 'breakdown', 'idle', 'running'][Math.floor(Math.random() * 4)] as Machine['status']
  }));

  get totalMachines() { return this.machines.length; }
  get runningMachines() { return this.machines.filter(m => m.status === 'running').length; }
  get averageOEE() { return (this.machines.reduce((sum, m) => sum + m.oee, 0) / this.machines.length).toFixed(1); }
  get totalParts() { return 3307; } // Example value
  get totalCost() { return this.machines.reduce((sum, m) => sum + m.cost, 0); }

  get statusCounts() {
    const counts = { maintenance: 0, breakdown: 0, idle: 0, running: 0 };
    this.machines.forEach(m => counts[m.status]++);
    return counts;
  }
  get statusPercentages() {
    const total = this.totalMachines;
    const counts = this.statusCounts;
    return {
      maintenance: (counts.maintenance / total * 100).toFixed(1),
      breakdown: (counts.breakdown / total * 100).toFixed(1),
      idle: (counts.idle / total * 100).toFixed(1),
      running: (counts.running / total * 100).toFixed(1),
    };
  }
}