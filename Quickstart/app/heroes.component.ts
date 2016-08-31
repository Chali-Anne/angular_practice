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

    add(name: string): void {
        name = name.trim();
        if (!name) {
            return;
        }
        this.heroService.add(name)
            .then(hero => {
                this.heroes.push(hero);
                this.selectedHero = null;
            });
    };
    delete(hero: Hero): void {
        this.heroService.delete(hero.id)
            .then(() => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) {
                    this.selectedHero = null;
                }
            });
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
