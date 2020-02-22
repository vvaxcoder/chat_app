import { FollowersComponent } from './../components/followers/followers.component';
import { FollowingComponent } from './../components/following/following.component';
import { PeopleComponent } from './../components/people/people.component';
import { AuthGuard } from './../services/auth.guard';
import { StreamsComponent } from './../components/streams/streams.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommentsComponent } from '../components/comments/comments.component';
import { NotificationsComponent } from '../components/notifications/notifications.component';

const routes: Routes = [
  {
    path: 'streams',
    component: StreamsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'post/:id',
    component: CommentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'people',
    component: PeopleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'people/following',
    component: FollowingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'people/followers',
    component: FollowersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class StreamsRoutingModule { }
