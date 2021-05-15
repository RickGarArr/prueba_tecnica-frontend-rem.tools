import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { VideojsRecordComponent } from './videojs-record/videojs-record.component';
import { SignaturePadComponent } from './signature-pad/signature-pad.component';
import { DataFormComponent } from './data-form/data-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        ProgressBarComponent,
        ToolbarComponent,
        VideojsRecordComponent,
        SignaturePadComponent,
        DataFormComponent
    ],
    exports: [
        ProgressBarComponent,
        ToolbarComponent,
        VideojsRecordComponent,
        SignaturePadComponent,
        DataFormComponent
    ]
})
export class ComponentsModule {}