# EventManagementAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.12.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## JSON Server

Run `json-server --watch db.json --port 3000` in root directory to run JSON server at 3000 port.

## Formatting

Used Prettier Vs code extension

## Login - Sign up

This implementation allows users to register and log in while ensuring data validation, unique email registration, and secure authentication handling.

Features
✅ Unique Email Validation – A user cannot register with an already registered email.
✅ Secure Login – Displays a generic "Invalid Credentials" error to prevent email enumeration.
✅ Form Validation – Ensures correct email format and minimum password length.

## Guards

The application restricts access based on user authentication status:

🔒 Auth Guard (authGuard) – Ensures only authenticated users can access protected routes like /events. Unauthenticated users are redirected to the login page (/auth).
🚫 Login Guard (loginGuard) – Prevents logged-in users from accessing the login page. If already logged in, users are redirected to /events.

## Event Management

The event listing page (/events) allows users to view, edit, and delete events with pagination persistence.

Event Listing Features
✅ Pagination Persistence – Maintains the current page and items per page when navigating away and back.
✅ Event Management Actions – Users can view, edit, and delete events.
✅ Date Formatting – Displays event dates in a user-friendly format.

Technical Details

Uses Angular Material Table (MatTableDataSource) for listing events.
Stores paginator state (pageIndex, pageSize) in a service to persist pagination state across navigations.
Uses MatPaginator with \_changePageSize() to maintain pagination settings when returning to the event list.
