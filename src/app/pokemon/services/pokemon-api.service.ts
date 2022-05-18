import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

import {CompactPokemonDataResult, FullPokemonDataResult, PaginationAndPokemonData, PaginationData} from "../interfaces/pokemon";

@Injectable({providedIn: 'root'})
export class PokemonApiService {
  private apiUrl: string = 'https://pokeapi.co/api/v2/pokemon';
  private pokemonData: FullPokemonDataResult[] = [];
  private paginationData: PaginationData | undefined;

  constructor(private http: HttpClient) {}

  public getPokemonData() {
    if (this.pokemonData.length < 1) {
      this.fetchPokemonData();
    }

    return this.pokemonData;
  }

  public getPaginationData(): PaginationData | undefined {
    return this.paginationData;
  }

  private fetchPokemonData() {
    this.getCompactPokemonData().subscribe({
      next: (apiResult: PaginationAndPokemonData) => this.handlePokemonData(apiResult),
      error: (error: string) => this.handleError(error),
      complete: () => console.log('completed'),
    })
  }

  private getCompactPokemonData() {
    return this.http.get<CompactPokemonDataResult>(this.apiUrl).pipe(
      map(pokemonResult => {
        return {
          pagination: {
            count: pokemonResult.count,
            next: pokemonResult.next,
            previous: pokemonResult.previous,
          },
          names: pokemonResult.results.map(pokemon => pokemon.name)
        }
      }),
    );
  }

  private handlePokemonData(apiResult: PaginationAndPokemonData) {
    this.paginationData = apiResult.pagination;
    apiResult.names.forEach((name: string) => this.fetchDataByPokemonName(name))
  }

  private fetchDataByPokemonName(name: string) {
    // @ts-ignore
    return this.http.get(`${this.apiUrl}/${name}`).forEach((pokemon: Pokemon) => {
      this.pokemonData.push(pokemon);
    })
  }

  private handleError(error: any) {
    console.error('ApiService::handleError', error);
    return throwError(error);
  }
}
