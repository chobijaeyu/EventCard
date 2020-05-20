import { Component, OnInit, ChangeDetectionStrategy, Renderer2, ContentChildren, ElementRef, QueryList, ViewChild, AfterContentInit, AfterViewInit, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { CdkDragMove, CdkDragDrop, moveItemInArray, CdkDragEnd } from '@angular/cdk/drag-drop';
import { order } from '../order';
import { Queue } from '../queue';
import { Subject } from 'rxjs';
import { delay, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { trigger, transition, animate, style } from '@angular/animations';
import { DragCardDirective } from '../directive/drag-card.directive';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
  animations: [
    trigger("swipe", [
      // transition('* => *', [
      //   animate("0.5s cubic-bezier(.17,.67,.83,.67)")
      // ])
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 }))
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {
  data = [
    { address: "abcde", date: "2015/02/01", img: "https://images.pexels.com/photos/164693/pexels-photo-164693.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
    { address: "zxcv", date: "2025/02/01", img: "https://images.pexels.com/photos/1164985/pexels-photo-1164985.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
    { address: "qewr", date: "2035/02/01", img: "https://images.pexels.com/photos/1540977/pexels-photo-1540977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
  ]
  MAX_COUNT = 3
  isVisible = (i) => i <= this.MAX_COUNT - 1
  multiplier = (i) => i === 0 ? 1 : 1.1;

  x = (i) => this.isVisible(i) ? i * 28 / this.multiplier(i) : (this.MAX_COUNT - 1) * 28
  y = 0
  sc = (i) => this.isVisible(i) ? 1 / (this.MAX_COUNT / (this.MAX_COUNT * this.multiplier(i) - i)) : 1 / this.MAX_COUNT
  opacity = (i) => this.isVisible(i) ? 1 / (this.MAX_COUNT / (this.MAX_COUNT - i)) : 0
  zindex = (i) => this.data.length - i
  boxShadow = (i) => i === 0 ? '0 10px 40px rgba(0, 0, 0, .2)' : '0 0px 0px rgba(0, 0, 0, .2)'

  transf = (i) => `translate3d(${this.x(i)}px, 0px, 0px) scale(${this.sc(i)})`

  q1: Queue<order> = new Queue()
  q2: Queue<order> = new Queue()

  private nextSubject: Subject<Queue<order>> = new Subject()
  private prevSubject: Subject<Queue<order>> = new Subject()

  isNextTrigger: boolean
  isPrevTrigger: boolean
  totalItems = this.data.length
  currentIndex: number

  private slidesIndex = 0;


  constructor(
    private rd2: Renderer2,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.data.forEach(x => {
      this.q1.enqueue(x)
    })

    this.nextSubject.pipe(
      delay(333),
    ).subscribe(x => {
      this.q1.enqueue(this.q1.dequeue())
      this.cdr.markForCheck()
    })

    this.prevSubject.pipe(
    ).subscribe(x => {
      this.q1.join(this.q1.out())
      this.cdr.markForCheck()
    })
  }

  ondrag(ev: CdkDragMove, i: number) {
    this.isNextTrigger = ev.distance.x <= -100 && i !== this.totalItems
    this.isPrevTrigger = ev.distance.x >= 24
    if (this.isNextTrigger) {
      this.rd2.setStyle(ev.source.element.nativeElement, "transform", `translate3d(-20rem, 0px, 0px) scale(1)`)
      document.dispatchEvent(new Event('mouseup'));
      this.isNextTrigger = false
      this.onNext(ev, i)
      return
    }
    if (this.isPrevTrigger) {
      document.dispatchEvent(new Event('mouseup'));
      this.isPrevTrigger = false
      this.onPrev(ev, i)
      return
    }
  }

  onDragEnded(event: CdkDragEnd): void {
    console.log(this.isNextTrigger, this.isPrevTrigger)
    if (!this.isNextTrigger && !this.isPrevTrigger) {
      event.source._dragRef.reset();
    }
  }

  onNext(ev: CdkDragMove, i: number) {
    // this.q1.enqueue(this.q1.dequeue())
    this.nextSubject.next(this.q1)
  }

  onPrev(ev: CdkDragMove, i: number) {
    this.prevSubject.next(this.q1)
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.q1._queue, event.previousIndex, event.currentIndex);
  }

}
