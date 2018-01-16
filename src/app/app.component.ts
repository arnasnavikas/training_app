import { Component,ViewChild,AfterViewInit, ElementRef } from '@angular/core';
interface pratimu{
  number: number,
  description: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit  {
  constructor(){}
  // @ViewChild('videoTag') videoDom : ElementRef
  // @ViewChild('videoSrc') videoSrc : ElementRef
  // @ViewChild('fontMusic') fontMusic : ElementRef
  @ViewChild('timeUpSignal') timeUpAlert : ElementRef
  // @ViewChild('musicSrc') musicSrc : ElementRef
  ngAfterViewInit(){
  }
  pratimai : Array<pratimu> = [ {number:0,description:'Sokinejimas per virvute..'},
                                {number:1,description:'Keliais paliesti delnus..'},
                                {number:2,description:'Spyriai i uzpakali..'},
                                {number:3,description:'Rankos aukstyn, kojos i praskest..'},
                                {number:4,description:'Greitas trypciojimas kojomis..'},
                                {number:5,description:'Kopimas i kalna ..'},
                                {number:6,description:'Dviratukas ...'}
                               ]
  pratimo_laikas = 45
  paprasta_pertrauka = 15
  ilgoji_pertrauka = 60
  pratimo_nr = 0
  round = 1
  seconds = this.pratimo_laikas
  pratimo_pavadinimas = this.pratimai[this.pratimo_nr].description
  timer_running = false
  startButton = this.timer_running == false ? "start" : "stop" 
  pertrauka = false
  milisecond_timer // holds miliseconds interval
  
  workout_time(){
    if(this.pratimo_nr < this.pratimai.length-1)
      this.pratimo_nr++
    else
      this.pratimo_nr= 0
    this.pratimo_pavadinimas = this.pratimai[this.pratimo_nr].description
    this.pertrauka = false
    this.seconds = this.pratimo_laikas-1
    // this.loadVideo(this.pratimo_nr)
  }
  resting_time(){
    if(this.pratimo_nr == this.pratimai.length-1){
      this.pratimo_pavadinimas = 'ilgoji pertrauka'
      this.seconds = this.ilgoji_pertrauka-1
      if(this.round == 5){
        this.start_stop()
        console.log('5 roundas baigesi');
        return
      }
      this.round++
    }
    else{
      this.seconds = this.paprasta_pertrauka-1
      this.pratimo_pavadinimas = 'pertrauka'
    }
    this.pertrauka = true
    // this.loadVideo('timeout')
  }
  decrease_second = ()=>{
      switch (true) {
        case this.seconds == 0 && !this.pertrauka:
          this.timeUpAlert.nativeElement.pause()
          this.timeUpAlert.nativeElement.currentTime = 0
          this.resting_time()
          break;
        case this.seconds == 0 && this.pertrauka:
          this.timeUpAlert.nativeElement.pause()
          this.timeUpAlert.nativeElement.currentTime = 0
          this.workout_time()
          break;
        case this.seconds > 0:
          if(this.seconds <= 3){
            this.timeUpAlert.nativeElement.play()
          }
          this.seconds --
          break;
        default:
          break;
      }
  }
  start_stop(){
    if(this.timer_running){
      // this.fontMusic.nativeElement.pause()
      this.startButton = 'start'
      clearInterval(this.milisecond_timer)
      this.timer_running = false
      // this.videoDom.nativeElement.pause()
      this.timeUpAlert.nativeElement.pause()
    }else{
      // this.fontMusic.nativeElement.play()
      if(this.seconds <=3)
        this.timeUpAlert.nativeElement.play()
      this.startButton = 'stop'
      this.milisecond_timer = setInterval(this.decrease_second,1000)
      this.timer_running = true
      // this.loadVideo(this.pratimo_nr)
      // this.videoDom.nativeElement.play()
    }
  }

  reset(){
    //cheks if interval is declared, and reset all values to default if true
    if(this.milisecond_timer){
      clearInterval(this.milisecond_timer)
      this.seconds = this.pratimo_laikas
      this.startButton = 'start'
      this.timer_running = false
      this.pratimo_nr = 0
      this.pertrauka = false
      this.pratimo_pavadinimas = this.pratimai[this.pratimo_nr].description
      this.round = 1
      // this.fontMusic.nativeElement.pause()
      // this.fontMusic.nativeElement.currentTime = 0
      // this.videoSrc.nativeElement.src = 'assets/videos/0.mp4'
      // this.videoDom.nativeElement.load()
    }
  }
  // loadVideo(name){
    // this.videoSrc.nativeElement.src = 'assets/videos/'+name+'.mp4'
    // this.videoDom.nativeElement.load()
    // this.videoDom.nativeElement.play()
    // this.videoDom.nativeElement.muted = true
  // }
  //changes workout time
  setTime(laikas,pozicija){
    // this.videoDom.nativeElement.pause()
    // this.fontMusic.nativeElement.pause()
    //check if input value is valid number
    if(parseInt(laikas) < 0 || isNaN(parseInt(laikas)))
      return
    // stops timer if inputing new values when timer is runnig
    if(this.timer_running){
      this.startButton = 'start'
      clearInterval(this.milisecond_timer)
      this.timer_running = false
    }
    switch (pozicija) {
      case 0:
        this.seconds = laikas
        this.pratimo_laikas = laikas
        break;
      case 1:
        this.paprasta_pertrauka = laikas
        break;
      case 2:
        this.ilgoji_pertrauka = laikas
        break;
    
      default:
        break;
    }
  }
}