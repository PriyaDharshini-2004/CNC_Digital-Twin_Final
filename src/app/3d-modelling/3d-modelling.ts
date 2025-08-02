import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-3d-modelling',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressBarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './3d-modelling.html',
  styleUrls: ['./3d-modelling.scss']
})
export class Modelling3dComponent implements AfterViewInit {
  machines = [
    { value: 'cnc1', label: 'CNC1 (TM08)', description: '3-Axis Milling Machine' },
    { value: 'cnc2', label: 'CNC2 (TC06)', description: '5-Axis Turning Center' }
  ];

  selectedMachine = this.machines[0];
  selectedModelPath = './assets/3d/CNC1SingleDoor.glb';

  machineSelect = new FormControl(this.selectedMachine.value);

  isCNC1DoorOpen = false;
  isCNC2DoorOpen = false;

  @ViewChild('cnc1Viewer') cnc1ViewerRef!: ElementRef;
  @ViewChild('cnc2Viewer') cnc2ViewerRef!: ElementRef;

  constructor() {
    this.machineSelect.valueChanges.subscribe(value => {
      this.selectedMachine = this.machines.find(machine => machine.value === value) || this.machines[0];

      if (value === 'cnc1') {
        this.selectedModelPath = './assets/3d/CNC1SingleDoor.glb';
      } else if (value === 'cnc2') {
        this.selectedModelPath = './assets/3d/CNC2DoubleDoor.glb';
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const viewer1: any = this.cnc1ViewerRef?.nativeElement;
      const viewer2: any = this.cnc2ViewerRef?.nativeElement;

      if (viewer1) {
        viewer1.addEventListener('load', () => this.trackDoorStatus(viewer1, 'cnc1'));
      }

      if (viewer2) {
        viewer2.addEventListener('load', () => this.trackDoorStatus(viewer2, 'cnc2'));
      }
    }, 1000); // Delay to ensure model loads
  }

  trackDoorStatus(viewer: any, machine: 'cnc1' | 'cnc2') {
    const update = () => {
      if (!viewer?.model) return;

      const doorNode = viewer.model.getObjectByName('Door'); // Replace with your actual door mesh name

      if (doorNode) {
        const isOpen = doorNode.rotation.y > 0.3 || doorNode.position.x > 0.1; // customize as needed

        if (machine === 'cnc1') {
          this.isCNC1DoorOpen = isOpen;
        } else {
          this.isCNC2DoorOpen = isOpen;
        }
      }

      requestAnimationFrame(update);
    };

    update();
  }

  fullscreenModel() {
    const viewer = document.querySelector('model-viewer') as any;
    if (viewer?.requestFullscreen) {
      viewer.requestFullscreen();
    }
  }

  rotateModel() {
    const viewer = document.querySelector('model-viewer') as any;
    if (viewer?.resetTurntableRotation) {
      viewer.resetTurntableRotation();
    } else {
      viewer.rotationPerSecond = '45deg';
    }
  }

  get cnc1Status(): string {
    return this.getStatus(this.isCNC1DoorOpen);
  }

  get cnc2Status(): string {
    return this.getStatus(this.isCNC2DoorOpen);
  }

  getStatus(isDoorOpen: boolean): string {
    return isDoorOpen ? 'Idle' : 'Running'; // You can enhance this logic
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Idle': return 'sandybrown';
      case 'Breakdown': return 'red';
      case 'Running': return 'green';
      default: return 'gray';
    }
  }
}
