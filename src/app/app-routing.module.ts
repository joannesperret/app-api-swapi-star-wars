import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sw-personnages',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'random-user-list',
    loadChildren: () => import('./pages/random-user-list/random-user-list.module').then( m => m.RandomUserListPageModule)
  },
  {
    path: 'sw-personnages',
    loadChildren: () => import('./pages/sw-personnages/sw-personnages.module').then( m => m.SwPersonnagesPageModule)
  },
  {
    path: 'sw-details/:id',
    loadChildren: () => import('./pages/sw-details/sw-details.module').then( m => m.SwDetailsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}