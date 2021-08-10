import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './components/product-list/product-list.component';

// Location childrens
const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    component: ProductListComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
