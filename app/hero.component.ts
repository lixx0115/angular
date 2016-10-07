import { Hero } from './hero';
import { OnInit } from '@angular/core';

import { Router, Params }   from '@angular/router';
import { Component } from '@angular/core';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService} from "./Hero.Service";
@Component({
    moduleId: module.id,
    selector: 'my-heroes',
    providers: [HeroService],
    templateUrl: 'hero.component.html',
    styleUrls: ['hero.component.css']


})


export class HeroesComponent implements OnInit {

    ngOnInit(): void {
        this.getHeroes();
    }
    constructor(private heroService: HeroService, private router: Router) { }

    selectedHero: Hero;
    heroes: Hero[];
    getHeroes(): void {
        this.heroService.getHeroes().then(heros => this.heroes = heros);
    }
    gotoDetail(hero: Hero): void {
        let link = ['/detail', this.selectedHero.id];
        this.router.navigate(link);
    }

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.heroService.create(name)
            .then(hero => {
                this.heroes.push(hero);
                this.selectedHero = null;
            });
    }

}