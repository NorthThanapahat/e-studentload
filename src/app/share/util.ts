import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoadingComponent } from '../modal/loading/loading.component';
import { AlertComponent } from '../modal/forget-password/alert.component';

@Injectable()
export class UtilProvider {

  loading :any;
  constructor(private dialog: MatDialog) {

  }
  ConfigDialog(width:string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = width;

    return dialogConfig;
  }

  readThis(inputValue: any): any {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.readAsDataURL(file);

    return myReader;
  }
  
  ShowLoading() {
    this.loading =  this.dialog.open(LoadingComponent,{
      panelClass:"background-transperent",
      disableClose:true
    });
  }
  HideLoading(){
    this.loading.close();
  }
  
  AlertMessage(title: string, content: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.panelClass = "popup-modal"
    dialogConfig.data = { title: title, body: content };

    this.dialog.open(AlertComponent, dialogConfig);
  }
}