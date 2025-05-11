import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppointmentService } from '@core/http/appointment.service';
import { ErrorResponse } from '@core/models/api';
import { AppointmentResponse } from '@core/models/showings';
import { NgxSpinnerService } from 'ngx-spinner';
import * as firebase from 'firebase';
import { MessagesService, SessionService } from '@core/services';
import { MemberService } from '@core/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

export const snapshotToArray = (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach((childSnapshot: any) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {

  messages: AppointmentResponse [] = [];
  isLoadingResults = true;
  selectedRoom: any;
  selectedContact: any;
  contacts: any[] = [];
  ref = firebase.database().ref('rooms/');

  rooms = [];
  allRooms = [];

  currentUser: any;

  constructor(
    private appointmentService: AppointmentService,
    private spinner: NgxSpinnerService,
    private messagesService: MessagesService,
    private memberService: MemberService,
    private sessionService: SessionService,
    private snackBar: MatSnackBar,
    public datepipe: DatePipe
  ) {
    this.currentUser = this.sessionService.currentUserValue;
   }

  ngOnInit(): void {
    this.getMessages();
    this.getRooms();
  }


  onContactSearch(event) {
    console.log(event);
    this.memberService.searchUserByString(event.query).subscribe(
      (res) => {
        console.log(res);
       this.contacts = res;
      }
    )
  }

  onSelectUser(user) {
    console.log(user);
    this.selectedContact = null;
    this.ref.orderByChild('roomname').equalTo(user.fullname).once('value', (snapshot: any) => {
      if (snapshot.exists()) {
        this.snackBar.open('Room name already exist!');
      } else {
        const newRoom = firebase.database().ref('rooms/').push();
        const currentUser = this.sessionService.currentUserValue;
        const obj = {
          "roomname": user.fullname,
          "createdBy": currentUser.memberName
        }
        newRoom.set(obj);
        this.enterChatRoom(user.fullname);
      }
    });
  }

  private enterChatRoom(roomname: string) {
    const chat = { roomname: '', nickname: '', message: '', date: '', type: '' };
    chat.roomname = roomname;
    const currentUser = this.sessionService.currentUserValue;
    chat.nickname = currentUser.memberName;
    chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    chat.message = `${currentUser.memberName}`;
    chat.type = 'message';
    // const newMessage = firebase.database().ref('chats/').push();
    // newMessage.set(chat);

    const newroomuser = { roomname: '', nickname: '', status: '' };
    newroomuser.roomname = roomname;
    newroomuser.nickname = currentUser.memberName;
    newroomuser.status = 'online';
    const newRoomUser = firebase.database().ref('roomusers/').push();
    newRoomUser.set(newroomuser);

    newroomuser.nickname = roomname;
    const newRoomUser2 = firebase.database().ref('roomusers/').push();
    newRoomUser2.set(newroomuser);
    this.getRooms();

    // firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(roomname).on('value', (resp: any) => {
    //   //room user;
    //   let roomuser = [];
    //   roomuser = snapshotToArray(resp);
    //   //const user = roomuser.find(x => x.nickname === currentUser.memberName);
    //   // if (user !== undefined) {
    //   //   const userRef = firebase.database().ref('roomusers/' + user.key);
    //   //   userRef.update({status: 'online'});
    //   // } else {
    //     const newroomuser = { roomname: '', nickname: '', status: '' };
    //     newroomuser.roomname = roomname;
    //     newroomuser.nickname = currentUser.memberName;
    //     newroomuser.status = 'online';
    //     const newRoomUser = firebase.database().ref('roomusers/').push();
    //     newRoomUser.set(newroomuser);

    //     newroomuser.nickname = roomname;
    //     const newRoomUser2 = firebase.database().ref('roomusers/').push();
    //     newRoomUser2.set(newroomuser);
    //     this.getRooms();
    //   //}
    // });

  }


  private filterRooms() {
    const user = this.sessionService.currentUserValue;
    const name = user.memberName;
    firebase.database().ref('roomusers/').orderByChild('nickname').equalTo(name).on('value', (resp: any) => {
      const roomUsers = snapshotToArray(resp);
      this.rooms = this.allRooms.filter(room => roomUsers.find(roomUser => roomUser.roomname == room.roomname));
      if(this.rooms[0]) {
        this.selectedRoom = this.rooms[0];
      }
      const currentUser = this.sessionService.currentUserValue;
      console.log(this.rooms);
    });

  }


  private getRooms() {
    firebase.database().ref('rooms/').on('value', resp => {
      this.allRooms = [];
      this.allRooms = snapshotToArray(resp);
      this.isLoadingResults = false;
      this.filterRooms();
    });
  }



  private getMessages() {
    this.spinner.show();
    const startDate = new Date('2021-06-27');
    const endDate = new Date('2021-08-08');
    this.appointmentService
      .getAppointmentsByagent(startDate, endDate).subscribe(
        (res) => {
          this.spinner.hide();
          console.log(res);
          this.messages = res.appointmentList;
        },
        (err: ErrorResponse) => {
          // this.alertService.error(err);
          this.spinner.hide();
        }
      );
  }

}
