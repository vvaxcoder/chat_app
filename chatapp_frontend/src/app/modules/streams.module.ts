import { CommentsComponent } from './../components/comments/comments.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostService } from './../services/post.service';
import { ToolbarComponent } from './../components/toolbar/toolbar.component';
import { TokenService } from './../services/token.service';
import { StreamsComponent } from './../components/streams/streams.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideComponent } from '../components/side/side.component';
import { PostFormComponent } from '../components/post-form/post-form.component';
import { PostsComponent } from '../components/posts/posts.component';

@NgModule({
  declarations: [StreamsComponent, ToolbarComponent, SideComponent, PostFormComponent,
     PostsComponent, CommentsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [StreamsComponent, ToolbarComponent],
  providers: [TokenService, PostService]
})
export class StreamsModule { }
