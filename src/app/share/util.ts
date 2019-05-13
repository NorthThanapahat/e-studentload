import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ForgetPasswordComponent } from '../modal/forget-password/forget-password.component';

@Injectable()
export class UtilProvider {

    
    constructor(private dialog: MatDialog) { 
      
    }
    
    AlertMessage(title: string, content: string) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.maxWidth = "70%";
        dialogConfig.panelClass = "popup-modal"
        dialogConfig.data = { title: title, text: content};
    
        this.dialog.open(ForgetPasswordComponent, dialogConfig);
      }
}