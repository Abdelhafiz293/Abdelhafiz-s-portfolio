import { Routes } from '@angular/router';
import { AuthGuard, AdminGuard } from './services/auth.guard';
import { Login } from './pages/dashboard/login/login';
import { Admin } from './pages/dashboard/admin/admin';
import { Home } from './pages/home/home';
import { Skills } from './pages/skills/skills';
import { Projects } from './pages/projects/projects';
import { Contact } from './pages/contact/contact';
import { About } from './pages/about/about';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'skills', component: Skills },
  { path: 'projects', component: Projects },
  { path: 'contact', component: Contact },
  {path: 'about', component: About},
  { path: 'dashboard/login', component: Login },
  {
    path: 'dashboard/admin',
    component: Admin,
    canActivate: [AdminGuard, AuthGuard],
  },
  { path: '**', redirectTo: '/home' },
];
