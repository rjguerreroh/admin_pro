import { Component, OnDestroy } from '@angular/core';
import { filter, interval, map, Observable, retry, Subscription, take } from 'rxjs';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: ``
})
export class RxjsComponent implements OnDestroy {
  public intervalSubs: Subscription;
  constructor(){
    /* this.retornaObservable().pipe( retry() ).subscribe({
      next: valor => console.log("sub: ",valor),
      error: error => console.warn('Error:', error),
      complete: () => {
        console.info("Obs terminado");

      }
    })  */
   this.intervalSubs = this.retornaIntervalo().subscribe( console.log )
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number>{
    return interval(1000).pipe(
      take(10),
      map( valor => valor + 1),
      filter( valor => (valor % 2 === 0)),
    );
  }

  retornaObservable(): Observable<number>{
    let i = -1;
    return new Observable<number>( observer => {
      const intervalo = setInterval( () => {
        i++;
        console.log("contador", i)
        observer.next(i);

        if( i === 4){
          clearInterval(intervalo);
          observer.complete();
        }

        if(i === 2){
          clearInterval(intervalo);
          observer.error("i llego al valor de 2")
        }
      }, 1000 )
    });
  }
}
