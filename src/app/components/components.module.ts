import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { VideojsRecordComponent } from './videojs-record/videojs-record.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ProgressBarComponent,
        ToolbarComponent,
        VideojsRecordComponent
    ],
    exports: [
        ProgressBarComponent,
        ToolbarComponent,
        VideojsRecordComponent
    ]
})
export class ComponentsModule {}