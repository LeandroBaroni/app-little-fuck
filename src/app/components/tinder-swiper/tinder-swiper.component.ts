import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

interface IUser {
  id: string;
  photo: string;
  name: string;
  age: number;
  distance: string;
}
@Component({
  selector: 'app-tinder-swiper',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './tinder-swiper.component.html',
  styleUrls: ['./tinder-swiper.component.scss']
})
export class TinderSwiperComponent implements OnInit {
  users: Array<IUser> = [
    {
      id: '1',
      photo: '',
      name: 'Leandro Baroni',
      age: 28,
      distance: ''
    },
    {
      id: '2',
      photo: '',
      name: 'Éder Braz da Silva',
      age: 40,
      distance: ''
    },
    {
      id: '3',
      photo: '',
      name: 'Paulo César Baroni',
      age: 52,
      distance: ''
    },
    {
      id: '4',
      photo: '',
      name: 'Fábio Matias Baroni',
      age: 43,
      distance: ''
    },
    {
      id: '5',
      photo: '',
      name: 'Adriana Correa Baroni',
      age: 42,
      distance: ''
    },
    {
      id: '6',
      photo: '',
      name: 'Ana Carolina Da Silva',
      age: 32,
      distance: ''
    },
    {
      id: '7',
      photo: '',
      name: 'Edson Matias Baroni',
      age: 50,
      distance: ''
    },
  ];

  startX: number = 0;
  endX: number = 0;

  constructor() {}

  ngOnInit() {
    console.log(this.users);
  }

  touchStart(evt: any) {
    this.startX = evt.touches[0].pageX
  }

  touchMove(evt: any, index: number) {
    let deltaX = this.startX - evt.touches[0].pageX;
    let deg = deltaX / 10;
    this.endX = evt.touches[0].pageX;

    (<HTMLStyleElement>document.getElementById('card-' + index)).style.transform = "translateX("+ -deltaX+"px) rotate("+ -deg+"deg)";

    if((this.endX - this.startX) < 0) {
      (<HTMLStyleElement>document.getElementById('reject-icon')).style.opacity = String(deltaX / 100);
    } else{
      (<HTMLStyleElement>document.getElementById('accept-icon')).style.opacity = String(-deltaX / 100);
    }
  }

  touchEnd(index: number) {
    if (this.endX > 0) {
      let finalX = this.endX - this.startX;

      if(finalX > -100 && finalX < 100) {
        (<HTMLStyleElement>document.getElementById("card-"+index)).style.transition = ".3s";
        (<HTMLStyleElement>document.getElementById("card-"+index)).style.transform = "translateX(0px) rotate(0deg)";

        setTimeout(() => {
          (<HTMLStyleElement>document.getElementById("card-"+index)).style.transition = "0s";
        }, 350);
      } else if (finalX <= -100 ) {
        (<HTMLStyleElement>document.getElementById("card-"+index)).style.transition = "1s";
        (<HTMLStyleElement>document.getElementById("card-"+index)).style.transform = "translateX(-1000px) rotate(-30deg)";

        setTimeout(() => {
          this.users.splice(index, 1);
        }, 350);
      } else if(finalX >= 100) {
        (<HTMLStyleElement>document.getElementById("card-"+index)).style.transition = "1s";
        (<HTMLStyleElement>document.getElementById("card-"+index)).style.transform = "translateX(1000px) rotate(30deg)";

        setTimeout(() => {
          this.users.splice(index, 1);
        }, 350);
      }

      this.startX = 0;
      this.endX = 0;

      (<HTMLStyleElement>document.getElementById('reject-icon')).style.opacity = "0";
      (<HTMLStyleElement>document.getElementById('accept-icon')).style.opacity = "0";
    }
  }
}
