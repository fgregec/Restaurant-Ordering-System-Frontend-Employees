import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection: HubConnection | null = null;

  startConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5078/myhub') // Replace with your SignalR hub URL
      .build();

    this.hubConnection.start().catch(err => console.error(err.toString()));
  }

  addUpdateListener(callback: (message: string) => void) {
    this.hubConnection?.on('ReceiveUpdate', (message: string) => {
      callback(message);
    });
  }
  
}
