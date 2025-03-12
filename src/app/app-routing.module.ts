import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { AuthorizedLayoutComponent } from './layout/authorized-layout/authorized-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'events',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent),
    canActivate: [loginGuard]
  },
  {
    path: 'events',
    component: AuthorizedLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./modules/events/listing/event-listing.component').then(m => m.EventListingComponent)
      },
      {
        path: 'add',
        loadComponent: () => import('./modules/events/add-edit/event-add-edit.component').then(m => m.EventAddEditComponent)
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./modules/events/add-edit/event-add-edit.component').then(m => m.EventAddEditComponent)
      },
      {
        path: 'view/:id',
        loadComponent: () => import('./modules/events/add-edit/event-add-edit.component').then(m => m.EventAddEditComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
