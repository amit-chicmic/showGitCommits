import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommitListComponent } from "./commit-list/commit-list.component";

const routes: Routes = [
  { path: '', redirectTo: 'commits', pathMatch: 'full' },
  { path: 'commits', component: CommitListComponent, data: { title: 'Commit History' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
