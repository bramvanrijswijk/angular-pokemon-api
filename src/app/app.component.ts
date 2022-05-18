import {Component, OnInit} from '@angular/core';
import {PokemonApiService} from "./pokemon/services/pokemon-api.service";
import {Observable} from "rxjs";

import {FullPokemonDataResult, PaginationData} from "./pokemon/interfaces/pokemon";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public pokemons: FullPokemonDataResult[] = [];
  public paginationData: PaginationData | undefined;

  constructor(private pokemonApiService: PokemonApiService) {}

  ngOnInit() {
    this.pokemons = this.pokemonApiService.getPokemonData();
    this.paginationData = this.pokemonApiService.getPaginationData();
  }
}
