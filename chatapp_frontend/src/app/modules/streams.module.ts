import { TokenService } from './../services/token.service';
import { StreamsComponent } from './../components/streams/streams.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [StreamsComponent],
  imports: [
    CommonModule
  ],
  exports: [StreamsComponent],
  providers: [TokenService]
})
export class StreamsModule { }
