import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {DocumentInfo} from "../models/DocumentInfo";
import {environment} from "../../../../enviroments/environment";
import {HttpClient} from "@angular/common/http";
import {LiveMessageInfo} from "../models/LiveMessageInfo";

@Injectable({
  providedIn: 'root'
})
export class LiveChatService {

  constructor(private http: HttpClient) { }

  sendLiveMessage(liveMessage:LiveMessageInfo):Observable<LiveMessageInfo>{
    return this.http.post<LiveMessageInfo>(environment.apiHost+`liveChat/send`,liveMessage);
  }

  sendLiveResponse(liveMessage:LiveMessageInfo):Observable<LiveMessageInfo>{
    return this.http.post<LiveMessageInfo>(environment.apiHost+`liveChat/respond`,liveMessage);
  }
}
