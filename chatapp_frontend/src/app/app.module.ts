import { CookieService } from 'ngx-cookie-service';
import { StreamsRoutingModule } from './modules/streams-routing.module';
import { StreamsModule } from './modules/streams.module';
import { AuthRoutingModule } from './modules/auth-routing.module';
import { AuthModule } from './modules/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AuthRoutingModule,
    StreamsModule,
    StreamsRoutingModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
