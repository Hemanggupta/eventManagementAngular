import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { EventElementParam } from '../models/events';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-event-add-edit',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './event-add-edit.component.html',
  styleUrl: './event-add-edit.component.scss'
})
export class EventAddEditComponent implements OnInit {
  isViewMode = false;
  isEditMode = false;
  eventForm!: FormGroup;
  eventTypes = ['Conference', 'Workshop', 'Meetup', 'Webinar'];

  constructor(private readonly fb: FormBuilder, private readonly eventService: EventsService, private readonly router: Router) {}

  ngOnInit(): void {
    // Check if the form is in edit mode
    this.initializeForm();
    if (this.router.url.includes('events/edit')) {
      this.isEditMode = true;
    }
    if (this.router.url.includes('events/view')) {
      this.isViewMode = true;
    }
    if (this.isEditMode || this.isViewMode) {
      this.getDataById();
    }
  }

  initializeForm(): void {
    this.eventForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      dateTime: ['', Validators.required],
      location: ['', Validators.required],
      description: [''],
      organizer: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  private getDataById(): void {
    const eventId = this.router.url.split('/').pop() ?? '';
    this.eventService.getEvent(eventId).subscribe({
      next: response => {
        this.eventForm.patchValue(response);
        if (this.isViewMode) {
          this.eventForm.disable();
        }
      },
      error: error => {
        console.error('Error fetching event:', error);
        alert('Failed to fetch event details!');
      }
    });
  }

  submitEvent() {
    if (this.eventForm.valid) {
      const payload: EventElementParam = this.eventForm.value;
      payload.dateTime = payload.dateTime.split('T')[0];
      this.eventService.addEvent(this.eventForm.value).subscribe({
        next: response => {
          this.eventService.setPageState(0, 5); // index and size
          alert('Event added successfully!');
          this.router.navigate(['/events']);
        },
        error: error => {
          console.error('Error saving event:', error);
          alert('Failed to add event!');
        }
      });
    }
  }
}
