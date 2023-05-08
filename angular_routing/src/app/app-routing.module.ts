import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { CategoriesComponent } from './categories/categories.component';
import { UserComponent } from './user/user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';
import { AuthGuard } from './services/guards/auth.guard';
import { DeactivateGuard } from './services/guards/deactivate.guard';
import { TemplateFormComponent } from './template-form/template-form.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
  },
  {
    path:'users',
    component:UsersComponent,
    // canActivate:[AuthGuard],
    canActivateChild:[AuthGuard],
    children:[{
      path:':id/:name',
      component:UserComponent
    },{
      path:':id/:name/edit',
      component:EditUserComponent,
      canDeactivate:[DeactivateGuard]
    }
  ]
  },
  {
  path:'category',
    component:CategoriesComponent
  },
  {
    path:'templateForm',
      component:TemplateFormComponent
    },
  
  {
    path:'not-found',
    component:PageNotfoundComponent
  },
  {
    path:'**',
    redirectTo:'not-found',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
