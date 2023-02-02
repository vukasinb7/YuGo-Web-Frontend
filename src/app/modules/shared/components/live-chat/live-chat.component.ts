import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";

@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.css']
})
export class LiveChatComponent {
  chatboxPopup=false;
  popupOpacity=0;

  openIcon="forum";

  /*boolean chatBoxMaximize=false;
  boolean chatBoxPanel=false;
  boolean chatBoxMinimize=false;*/
  /*ngOnInit(): void {

    const chatbox = jQuery.noConflict();


    chatbox(() => {
      chatbox(".chatbox-open").click(() =>
        chatbox(".chatbox-popup, .chatbox-close").fadeIn()
      );

      chatbox(".chatbox-close").click(() =>
        chatbox(".chatbox-popup, .chatbox-close").fadeOut()
      );

      chatbox(".chatbox-maximize").click(() => {
        chatbox(".chatbox-popup, .chatbox-open, .chatbox-close").fadeOut();
        chatbox(".chatbox-panel").fadeIn();
        chatbox(".chatbox-panel").css({ display: "flex" });
      });

      chatbox(".chatbox-minimize").click(() => {
        chatbox(".chatbox-panel").fadeOut();
        chatbox(".chatbox-popup, .chatbox-open, .chatbox-close").fadeIn();
      });

      chatbox(".chatbox-panel-close").click(() => {
        chatbox(".chatbox-panel").fadeOut();
        chatbox(".chatbox-open").fadeIn();
      });
    });
  }*/


  open() {
    this.chatboxPopup=!this.chatboxPopup;
    if (this.chatboxPopup){
      this.openIcon="close";
      this.popupOpacity=1;}
    else{
      this.openIcon="forum;"
    this.popupOpacity=0;}
  }
}
