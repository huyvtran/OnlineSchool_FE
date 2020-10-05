import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {
    path: 'home',
    loadChildren: () => import('./home/home.module')
    .then( m => m.HomePageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./Auth/auth-routing/auth-routing.module')
    .then(m => m.AuthRoutingModule)
  },
  {
    path: 'online-school',
    loadChildren: () => import('./Online-School/online-school-routing/online-school-routing.module')
    .then(m => m.OnlineSchoolRoutingModule)
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
