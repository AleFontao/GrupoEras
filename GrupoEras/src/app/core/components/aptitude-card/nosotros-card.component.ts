import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Worker } from 'src/app/core/models/worker';

@Component({
  selector: 'app-nosotros-card',
  templateUrl: './nosotros-card.component.html',
  styleUrls: ['./nosotros-card.component.scss']
})
export class AptitudeCardComponent implements OnInit {
  @Input()
  worker!:Worker;
  constructor() { }

  ngOnInit() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('card-animation');
        }
      });
    });
    document.querySelectorAll('.card').forEach(element => {
      observer.observe(element);
    })
  }



}
