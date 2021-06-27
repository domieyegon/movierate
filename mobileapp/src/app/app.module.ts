import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from '@nativescript/angular'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ItemsComponent } from './item/items.component'
import { ItemDetailComponent } from './item/item-detail.component'
import { AuthModule } from './auth/auth.module'
import { HttpClientModule } from '@angular/common/http'
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, HttpClientModule, AppRoutingModule, AuthModule, NativeScriptUIDataFormModule],
  declarations: [AppComponent, ItemsComponent, ItemDetailComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
