import {Component, OnInit} from '@angular/core';
import {PokemonApiService} from "./pokemon/services/pokemon-api.service";

import {CompactPokemon, Pagination, PokemonApiDataResult} from "./pokemon/interfaces/pokemon";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public pokemons: CompactPokemon[] = [];
  public pagination: Pagination = {count: 0};

  constructor(private pokemonApiService: PokemonApiService) {}

  ngOnInit() {
    this.pokemonApiService.getPokemonData().subscribe({
      next: apiResult => {
        this.pokemons = apiResult.results;
        this.pagination = {
          count: apiResult.count,
          next: apiResult.next,
          previous: apiResult.previous
        }
      }
    });
  }
}
