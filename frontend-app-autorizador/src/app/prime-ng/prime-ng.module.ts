import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    MenuModule,
    InputSwitchModule,
    MenubarModule,
    BlockUIModule,
    DividerModule,
    CalendarModule,
    CheckboxModule,
    ToggleButtonModule,
    ButtonModule,
    InputTextareaModule,
    ToolbarModule,
    InputTextModule,
    CardModule,
    DropdownModule,
    FieldsetModule,
    PanelModule,
  ],
})
export class PrimeNgModule {}
