import { Component, Input, OnInit }         from '@angular/core';
import { ActivatedRoute, Params }           from '@angular/router';
import { Hero }                             from './hero';
import { HeroService }                      from './hero.service';

@Component({
    selector: 'hero-detail',
    templateUrl: 'app/hero-detail.component.html'
})

export class HeroDetailComponent implements OnInit {
    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute
    ) { }
    @Input()
    hero: Hero;

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.heroService.getHero(id).then(hero =>
                this.hero = hero);
        });
    };

    back(): void {
        window.history.back();
    }
}