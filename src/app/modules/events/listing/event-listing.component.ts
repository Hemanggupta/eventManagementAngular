import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { EventElement } from '../models/events';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-event-listing',
  standalone: true,
  imports: [MatButtonModule, CommonModule, RouterModule, MatTableModule, MatPaginator, MatIconModule],
  templateUrl: './event-listing.component.html',
  styleUrl: './event-listing.component.scss'
})
export class EventListingComponent {
  displayedColumns: string[] = ['name', 'dateTime', 'organizer', 'actions'];
  dataSource = new MatTableDataSource<EventElement>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly eventService: EventsService, private readonly router: Router) {}

  ngOnInit() {
    this.loadEvents();
  }

  ngAfterViewInit() {
    this.restorePaginator();
    this.dataSource.paginator = this.paginator;
  }

  private restorePaginator() {
    setTimeout(() => {
      if (this.paginator) {
        this.paginator.pageIndex = this.eventService.getPageIndex();
        this.paginator.pageSize = this.eventService.getPageSize();
      }
    });
  }

  onPageChange() {
    if (this.paginator) {
      this.eventService.setPageState(this.paginator.pageIndex, this.paginator.pageSize);
    }
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe({
      next: events => {
        events.forEach(event => {
          event.dateTime = event?.dateTime?.split('T')[0];
        });

        this.dataSource.data = events;

        setTimeout(() => {
          if (this.paginator) {
            this.paginator.pageIndex = this.eventService.getPageIndex();
            this.paginator.pageSize = this.eventService.getPageSize();
            this.dataSource.paginator = this.paginator;

            this.paginator._changePageSize(this.paginator.pageSize);
          }
        });
      },
      error: err => console.error('Error fetching events:', err)
    });
  }

  editEvent(event: EventElement) {
    this.router.navigate(['/events/edit', event.id]);
  }

  viewEvent(event: EventElement) {
    this.router.navigate(['/events/view', event.id]);
  }

  deleteEvent(event: EventElement): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(event.id).subscribe(() => {
        this.loadEvents();
      });
    }
  }
}
