import {Component, OnInit} from '@angular/core';
import {PokemonApiService} from "./pokemon/services/pokemon-api.service";
import {Observable} from "rxjs";

import {Pokemon} from "./pokemon/interfaces/pokemon";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-pokemon-api';

  public pokemons: Pokemon[] = [];

  constructor(private pokemonApiService: PokemonApiService) {}

  ngOnInit() {
    this.pokemons = this.pokemonApiService.getPokemonData()
  }
}
