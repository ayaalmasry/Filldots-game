import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {Observable} from 'rxjs';


// import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  dots = Array.from(Array(189).keys());
  
  color=["red","yellow","green","blue","violet","pink","gray","black"]
  randomColorIndex: number=0;
  counter:number = 25;
  isGameStarted: boolean=false;
  myInterval: any;
  isGameEnded: boolean = false;
  isWon = false;
  cleanCount = 0;
  dirtyCount = 0;

  
  ngOnInit(){
    console.log(this.dots);
    
  }
  @ViewChildren('dotsRef') dotRefs:QueryList<any> | undefined;
  changeDetection(dot:any){
    this.randomColorIndex = Math.floor(Math.random() * 10);
    if (!this.isGameEnded) {
      dot.classList.add(this.color[this.randomColorIndex]);
      this.checkGameStatus();
    }

  }
  reset(){
    this.dots=[];
  }
  restart(){
    console.log(this.dots)
    this.changeDetection(this.dots)
   
  }

  ngOnDestroy(): void {
    clearInterval(this.myInterval);
  }


  startTimer() {
    this.isGameStarted = true;
    this.myInterval = setInterval(() => {
      if (this.counter > 1) {
        this.counter--;
      } else {
        this.isGameEnded = true;
      }
    }, 1000);
  }


  checkGameStatus() {
    this.cleanCount = 0;
    this.dirtyCount = 0;
    this.dotRefs?.forEach((dot) => {
      if (dot.nativeElement.classList.length > 1) {
        this.dirtyCount++;
      } else {
        this.cleanCount++;
      }
    });
    if (!this.isGameStarted) {
      this.startTimer();
    }
    if (this.dirtyCount == 160) {
      this.isWon = true;
      this.isGameEnded = true;
    }
  }


 
  


  

}