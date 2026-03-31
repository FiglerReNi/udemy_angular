import {Component} from '@angular/core';
import {trigger, state, style, transition, animate, keyframes, group} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  animations: [
    trigger('divState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        'background-color': 'blue',
        transform: 'translateX(180px)'
      })),
      transition('normal <=> highlighted', animate(300)),
      // transition('highlighted => normal', animate(800))
    ]),
    trigger('wildState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0)  scale(1)'
      })),
      state('highlighted', style({
        'background-color': 'blue',
        transform: 'translateX(180px)  scale(1)'
      })),
      state('shrunken', style({
        'background-color': 'green',
        transform: 'translateX(180px) scale(0.5)'
      })),
      transition('normal <=> highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
      // transition('shrunken <=> *', animate(500))
      transition('shrunken <=> *',[
        //kiindulo style, amire azonnal vált az induláskor
        style({
          'background-color': 'orange',
        }),
        // mennyi miliseconds alatt váltson erre a style-ra az előzőhöz képest
        animate(1000, style({
          borderRadius: '50px'
        })),
        // mennyi idő alatt váltson style nélkülire az előzőhöz képest
        animate(500)
      ])
    ]),
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      // a Domban még nem létező (pl mert kattintásra tűnik elő, * - bármilyen állapot is legyen az előtűnés
      // után a kezdő állapota, ez történjen)
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)]),
      transition('* => void', [
        animate(300, style({
          transform: 'translateX(100px)',
          opacity: 0
        }))]),
    ]),
    trigger('list2', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      // a Domban még nem létező (pl mert kattintásra tűnik elő, * - bármilyen állapot is legyen az előtűnés
      // után a kezdő állapota, ez történjen)
      transition('void => *', [
        // keyframes a benne lévő styl-ok száma szerint osztja el az időt és mindegyik ugyanaddig tart.
        // Ha nem egyenlő arányban akarjuk az offset-el megmondhatjuk melyikre hány % idő jusson
        animate(1000, keyframes([
          style({
            transform: 'translateX(-100px)',
            opacity: 0,
            offset: 0
          }),
          style({
            transform: 'translateX(-50px)',
            opacity: 0.5,
            offset: 0.3
          }),
          style({
            transform: 'translateX(-20px)',
            opacity: 1,
            offset: 0.8
          }),
          style({
            transform: 'translateX(0px)',
            opacity: 1,
            offset: 1
          })
        ]))
      ]),
      transition('* => void', [
        // a group arra jó, hogy egyszerre fusson le két animáció és ne egymás után
        group([
          animate(300, style({
            color: 'red',
          })),
          animate(800, style({
            transform: 'translateX(100px)',
            opacity: 0
          })),
        ])
      ]),
    ])
  ]
})
export class AppComponent {
  state = 'normal';
  wildState = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];

  onAnimate() {
    this.state == 'normal' ? this.state = 'highlighted' : this.state = 'normal';
    this.wildState == 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
  }

  onShrink() {
    this.wildState = 'shrunken';
  }

  onAdd(item) {
    this.list.push(item);
  }

  onDelete(item) {
    this.list.splice(this.list.indexOf(item), 1);
  }

  animationStarted(event) {
    console.log('Start: ' + event);
  }

  animationDone(event) {
    console.log('End: ' + event);
  }
}
