import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PricingComponent } from './pricing/pricing.component';
//import { PricingComponent } from './pricing/pricing.component';

const routes: Routes = [
  {
    path:'',pathMatch: 'full' ,redirectTo:'pricing'
  },
  {path: 'pricing',component:PricingComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: false, onSameUrlNavigation: 'reload' })  
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
