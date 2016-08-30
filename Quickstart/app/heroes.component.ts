import { Component }            from '@angular/core';
import { Router }               from '@angular/router';
import { OnInit }               from '@angular/core';
import { Hero }                 from './hero';
import { HeroService }          from './hero.service';

@Component({
    selector: 'heroes',
    templateUrl: 'app/heroes.component.html',
    styleUrls: ['app/heroes.component.css'],
    providers: [
        HeroService
    ]
})
export class HeroesComponent implements OnInit {
    constructor(
        private heroService: HeroService,
        private router: Router
    ) { }
    heroes: Hero[];

    ngOnInit(): void {
        this.getHeroes();
    };
    selectedHero: Hero;
    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    };
    getHeroes(): void {
        this.heroService.getHeroes().then(
            heroes => this.heroes = heroes
        );
    };
    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }
}
