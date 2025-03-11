import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventElement } from '../models/events';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private apiUrl = 'http://localhost:3000/events';
  constructor(private readonly http: HttpClient) {}

  addEvent(eventData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, eventData);
  }

  getAllEvents(): Observable<EventElement[]> {
    return this.http.get<EventElement[]>(this.apiUrl);
  }

  deleteEvent(eventId: number): Observable<any> {
    const url = `${this.apiUrl}/${eventId}`;
    return this.http.delete<any>(url);
  }

  editEvent(eventId: number, eventData: any): Observable<any> {
    const url = `${this.apiUrl}/${eventId}`;
    return this.http.put<any>(url, eventData);
  }

  getEvent(eventId: string): Observable<EventElement> {
    const url = `${this.apiUrl}/${eventId}`;
    return this.http.get<EventElement>(url);
  }
}
