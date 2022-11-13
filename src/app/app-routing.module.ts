import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './others/guards/auth.guard';
import { RefreshGuard } from './others/guards/refresh.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
    canLoad: [RefreshGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard],
    canLoad: [RefreshGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./forgotpassword/forgotpassword.module').then(m => m.ForgotpasswordPageModule),
    canLoad: [RefreshGuard]
  },
  {
    path: 'trips',
    loadChildren: () => import('./trips/trips.module').then(m => m.TripsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'config',
    loadChildren: () => import('./config/config.module').then(m => m.ConfigPageModule),
    canActivate: [AuthGuard],
    canLoad: [RefreshGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AuthGuard],
    canLoad: [RefreshGuard]
  },
  {
    path: 'profile-update',
    loadChildren: () => import('./profile-update/profile-update.module').then(m => m.ProfileUpdatePageModule),
    canActivate: [AuthGuard],
    canLoad: [RefreshGuard]
  },
  {
    path: 'driver',
    loadChildren: () => import('./driver/driver.module').then( m => m.DriverPageModule),
    canActivate: [AuthGuard],
    canLoad: [RefreshGuard]
  },
  {
    path: 'passenger',
    loadChildren: () => import('./passenger/passenger.module').then( m => m.PassengerPageModule),
    canActivate: [AuthGuard],
    canLoad: [RefreshGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./error/error.module').then(m => m.ErrorPageModule),
    canLoad: [RefreshGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
