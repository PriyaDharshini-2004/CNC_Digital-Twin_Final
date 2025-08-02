import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-master-data',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    HttpClientModule
  ],
  templateUrl: './master-data.html',
  styleUrls: ['./master-data.scss']
})
export class MasterDataComponent implements OnInit {
  constructor(private http: HttpClient) {}

  summary = [
    { icon: 'precision_manufacturing', label: 'Machines', value: 0 },
    { icon: 'build', label: 'Tools', value: 0 },
    { icon: 'category', label: 'Parts', value: 0 },
    { icon: 'groups', label: 'Employees', value: 0 }
  ];

  formTabs = [
    { label: 'Machines', icon: 'precision_manufacturing' },
    { label: 'Tools', icon: 'build' },
    { label: 'Parts', icon: 'category' },
    { label: 'Employees', icon: 'groups' }
  ];
  selectedFormTab = 0;

  listTabs = [
    { label: 'Machines' },
    { label: 'Tools' },
    { label: 'Parts' },
    { label: 'Employees' }
  ];
  selectedListTab = 0;

  // Form models
  machine = { name: '', make: '', type: '', maintenanceDate: '' };
  tool = {
    name: '', toolId: '', purchasedOn: '', life: '', length: '', die: '',
    material: '', workTime: '', lastUsed: '', supplier: ''
  };
  part = {
    customer: '', cycleTime: '', processId: '', processName: '',
    programNumber: '', feedRate: '', spindleSpeed: ''
  };
  employee = {
    id: '', name: '', joiningDate: '', wage: '', skill: '',
    shift: '', phone: '', bloodGroup: ''
  };

  // Lists
  machines: any[] = [];
  tools: any[] = [];
  parts: any[] = [];
  employees: any[] = [];

  ngOnInit(): void {
    this.getMachines();
    this.getTools();
    this.getParts();
    this.getEmployees();
  }

  // === API: GET ===
  getMachines() {
    this.http.get<any[]>('http://localhost:5000/api/master/machines').subscribe({
      next: (data) => {
        this.machines = data;
        this.summary[0].value = data.length;
      },
      error: (err) => console.error('Error fetching machines:', err)
    });
  }

  getTools() {
    this.http.get<any[]>('http://localhost:5000/api/master/tools').subscribe({
      next: (data) => {
        this.tools = data;
        this.summary[1].value = data.length;
      },
      error: (err) => console.error('Error fetching tools:', err)
    });
  }

  getParts() {
    this.http.get<any[]>('http://localhost:5000/api/master/parts').subscribe({
      next: (data) => {
        this.parts = data;
        this.summary[2].value = data.length;
      },
      error: (err) => console.error('Error fetching parts:', err)
    });
  }

  getEmployees() {
    this.http.get<any[]>('http://localhost:5000/api/master/employees').subscribe({
      next: (data) => {
        this.employees = data;
        this.summary[3].value = data.length;
      },
      error: (err) => console.error('Error fetching employees:', err)
    });
  }

  // === API: POST ===
  createMachine() {
    this.http.post('http://localhost:5000/api/master/machines', this.machine).subscribe({
      next: () => {
        this.getMachines();
        alert('Machine created');
        this.machine = { name: '', make: '', type: '', maintenanceDate: '' };
      },
      error: (err) => {
        console.error('Machine creation failed:', err);
        alert('Error creating machine');
      }
    });
  }

  createTool() {
    this.http.post('http://localhost:5000/api/master/tools', this.tool).subscribe({
      next: () => {
        this.getTools();
        alert('Tool created');
        this.tool = {
          name: '', toolId: '', purchasedOn: '', life: '', length: '', die: '',
          material: '', workTime: '', lastUsed: '', supplier: ''
        };
      },
      error: (err) => {
        console.error('Tool creation failed:', err);
        alert('Error creating tool');
      }
    });
  }

  createPart() {
    this.http.post('http://localhost:5000/api/master/parts', this.part).subscribe({
      next: () => {
        this.getParts();
        alert('Part created');
        this.part = {
          customer: '', cycleTime: '', processId: '', processName: '',
          programNumber: '', feedRate: '', spindleSpeed: ''
        };
      },
      error: (err) => {
        console.error('Part creation failed:', err);
        alert('Error creating part');
      }
    });
  }

  createEmployee() {
    this.http.post('http://localhost:5000/api/master/employees', this.employee).subscribe({
      next: () => {
        this.getEmployees();
        alert('Employee created');
        this.employee = {
          id: '', name: '', joiningDate: '', wage: '', skill: '',
          shift: '', phone: '', bloodGroup: ''
        };
      },
      error: (err) => {
        console.error('Employee creation failed:', err);
        alert('Error creating employee');
      }
    });
  }

  // === Validation ===
  isMachineFormValid() {
    const m = this.machine;
    return m.name && m.make && m.type && m.maintenanceDate;
  }

  isToolFormValid() {
    const t = this.tool;
    return t.name && t.toolId && t.purchasedOn && t.life && t.length &&
           t.die && t.material && t.workTime && t.lastUsed && t.supplier;
  }

  isPartFormValid() {
    const p = this.part;
    return p.customer && p.cycleTime && p.processId && p.processName &&
           p.programNumber && p.feedRate && p.spindleSpeed;
  }

  isEmployeeFormValid() {
    const e = this.employee;
    return e.id && e.name && e.joiningDate && e.wage &&
           e.skill && e.shift && e.phone && e.bloodGroup;
  }
}
