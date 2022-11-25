import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-certification-card',
  templateUrl: './certification-card.component.html',
  styleUrls: ['./certification-card.component.scss']
})
export class CertificationCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('card-certification-animation');
        }
      });
    });
    document.querySelectorAll('.card-certification').forEach(element => {
      observer.observe(element);
    })
  }

}
