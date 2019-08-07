import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
 
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StorageComponent } from './storage/storage.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BatteryComponent } from './battery/battery.component';
import { RamComponent } from './ram/ram.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { CpuComponent } from './cpu/cpu.component';
import { CustomerSatisfactionComponent } from './customer-satisfaction/customer-satisfaction.component';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { GamingComponent } from './gaming/gaming.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { NewusersComponent } from './newusers/newusers.component';

@NgModule({
  declarations: [
    AppComponent,
    StorageComponent,
    MainNavComponent,
    BatteryComponent,
    RamComponent,
    TemperatureComponent,
    CpuComponent,
    CustomerSatisfactionComponent,
    SuggestionComponent,
    GamingComponent,
    RecommendationComponent,
    NewusersComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [StorageComponent,
                    BatteryComponent,
                    CpuComponent,
                    RamComponent,
                    TemperatureComponent,
                    CustomerSatisfactionComponent,
                    SuggestionComponent,
                    GamingComponent,
                    RecommendationComponent]
})
export class AppModule { }
