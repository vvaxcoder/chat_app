import { StreamsComponent } from './../components/streams/streams.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [StreamsComponent],
  imports: [
    CommonModule
  ],
  exports: [StreamsComponent]
})
export class StreamsModule { }
