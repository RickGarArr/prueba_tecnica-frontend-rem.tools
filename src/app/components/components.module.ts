import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { WebCamDivComponent } from './web-cam-div/web-cam-div.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ProgressBarComponent,
        ToolbarComponent,
        WebCamDivComponent
    ],
    exports: [
        ProgressBarComponent,
        ToolbarComponent,
        WebCamDivComponent
    ]
})
export class ComponentsModule {}