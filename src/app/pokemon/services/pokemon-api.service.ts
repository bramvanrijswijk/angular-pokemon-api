import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

import {PokemonResult, Pokemon} from "../interfaces/pokemon";

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {
  private apiUrl: string = 'https://pokeapi.co/api/v2/pokemon';
  private pokemonData: Pokemon[] = [];

  constructor(private http: HttpClient) {}

  public getPokemonData() {
    if (this.pokemonData.length < 1) {
      this.fetchPokemonData()
    }

    return this.pokemonData;
  }

  private fetchPokemonData() {
    this.getPokemonNames().subscribe({
      next: (pokemonNames: string[]) => pokemonNames.forEach((name) => this.fetchDataByPokemonName(name)),
      error: (error: string) => this.handleError(error),
      complete: () => console.log('completed'),
    })
  }

  private fetchDataByPokemonName(name: string) {
    // @ts-ignore
    return this.http.get(`${this.apiUrl}/${name}`).forEach((pokemon: Pokemon) => {
      this.pokemonData.push(pokemon);
    })
  }

  private getPokemonNames() {
    return this.http.get<PokemonResult>(this.apiUrl).pipe(
      map(pokemonResult => {
        return pokemonResult.results.map(pokemon => pokemon.name);
      })
    );
  }

  private handleError(error: any) {
    console.error('ApiService::handleError', error);
    return throwError(error);
  }
}
