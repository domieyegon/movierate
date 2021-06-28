import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptFormsModule, NativeScriptModule } from '@nativescript/angular'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ItemsComponent } from './item/items.component'
import { ItemDetailComponent } from './item/item-detail.component'
import { HttpClientModule } from '@angular/common/http'
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { AuthComponent } from './auth/auth.component'

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule,
    HttpClientModule,
    AppRoutingModule,
    NativeScriptUIDataFormModule,
    NativeScriptFormsModule,
  ],
  declarations: [AppComponent,
    ItemsComponent,
    ItemDetailComponent,
    AuthComponent
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
