import { of, interval } from 'rxjs'; 
import { map, tap, take } from 'rxjs/operators';


// interval(n) creates an observable which emits an incrementing integer every n milliseconds.
const obs = interval(1000)
.pipe(
  // take(n) will take 3 emissions before closing the observable.
  take(3),
  // tap: for side effects; in this case, just logging.
  tap((val) => console.log(`[obs:tap] ${val}`))
);

// This will log 3 times to the console bc there are 3 separate emissions to the observer. Remember: think of observables as a river!
obs.subscribe(x => console.warn(`[obs:subscribe] ${x}`));

// Let's try it as a Promise, as we would have handled any async operation without Observables. Any observable can be cast as a Promise by the extension method below.
const prom = interval(1000)
.pipe(
  take(3),
  tap((val) => console.log(`[prom:tap] ${val}`))
).toPromise();

// Promisifying the observables means that they will only emit values once the observable closes!

// This first one resolves the promise on the third emission, when it closes the observable! (take(n) closes the observable after n emissions).
const doProm = () => prom.then((x) => console.warn(`[PROM:THEN] ${x}`));
doProm();

// Because it was Promisified, you can ask for the last emission any time after it closes and it will deliver!
setTimeout(async () => console.info(`[late to the party]: ${await prom}`), 5000);