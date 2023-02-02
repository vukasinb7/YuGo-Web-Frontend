import {Component, ElementRef, HostBinding, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {Button} from "primeng/button";
import {LiveChatService} from "../../services/live.chat.service";
import {AuthService} from "../../../core/services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ImageService} from "../../../core/services/image.service";
import {take} from "rxjs";
import {UserService} from "../../services/user.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.css']
})
export class LiveChatComponent implements OnInit{
  chatboxPopup=false;
  popupOpacity=0;

  openIcon="forum";
  message: any;
  @Input()
  @Output()
  id=-1;
  popupVisibility="hidden";
  profilePicture: any;
  title_name: any;

  bottom=0;
  right=0;
  buttonColor="#fad02c";
  tooltipText="";


  constructor(private renderer: Renderer2, private el: ElementRef, private liveChatService:LiveChatService,
              private authService:AuthService,private sanitizer: DomSanitizer, private imageService:ImageService,private userService:UserService) {

  }
  ngOnInit() {
    this.loadData()

  }
  loadData(){
    if (this.authService.getRole()==="ADMIN"){
      this.userService.getUserById(this.id).pipe(take(1)).subscribe({
        next:(info) => {
      this.imageService.getProfilePicture(info.profilePicture).then(resp => {
        const objectURL = URL.createObjectURL(resp);
        this.profilePicture = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.title_name=info.name+" "+info.surname;
        this.tooltipText=info.name+" "+info.surname;
      });}});
    }
    else{
      this.profilePicture="assets/img/ADMIN_AVATAR.png"
      this.title_name="Support Team"
    }
  }

  open() {
    this.chatboxPopup=!this.chatboxPopup;
    if (this.chatboxPopup){
      this.openIcon="close";
      this.popupOpacity=1;
      this.popupVisibility="visible"
      this.buttonColor="#fad02c";}

    else{
      this.openIcon="forum;";
      this.popupOpacity=0;
      this.popupVisibility="hidden";
      this.buttonColor="#fad02c";}
  }
  addMessage(message:string,who:string) {
    if(message==="") {
      message = this.message;
    }
    const newElement = this.renderer.createElement('li');
    this.renderer.setProperty(newElement, 'innerHTML',message);
    this.renderer.addClass(newElement,who);
    this.renderer.appendChild(this.el.nativeElement.querySelector("#messages-list"), newElement);


  }
  sendMessage(message:string,who:string){
    this.addMessage(message,who);
    if (this.authService.getRole()!=="ADMIN") {
      this.liveChatService.sendLiveMessage({userId: this.authService.getId(), message: this.message}).subscribe(() => {
          this.message="";
      });
    }else{
      this.liveChatService.sendLiveResponse({userId: this.id, message: this.message}).subscribe(()=>{
        this.message="";
      });
    }
  }
}
