import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent implements OnInit {
 data= [
   { address: "abcde", date: "2015/02/01", img:"https://images.pexels.com/photos/164693/pexels-photo-164693.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
   { address: "zxcv", date: "2025/02/01", img:"https://images.pexels.com/photos/1164985/pexels-photo-1164985.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
   { address: "qewr", date: "2035/02/01", img:"https://images.pexels.com/photos/1540977/pexels-photo-1540977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
 ]
  constructor() { }

  ngOnInit() {
  }

}
