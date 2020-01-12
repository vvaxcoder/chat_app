import { ToolbarComponent } from './../components/toolbar/toolbar.component';
import { TokenService } from './../services/token.service';
import { StreamsComponent } from './../components/streams/streams.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [StreamsComponent, ToolbarComponent],
  imports: [
    CommonModule
  ],
  exports: [StreamsComponent, ToolbarComponent],
  providers: [TokenService]
})
export class StreamsModule { }
