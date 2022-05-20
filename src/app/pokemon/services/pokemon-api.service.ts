import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {PokemonApiDataResult} from "../interfaces/pokemon";

@Injectable({providedIn: 'root'})
export class PokemonApiService {
  private apiUrl: string = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  public getPokemonData(): Observable<PokemonApiDataResult> {
    return this.http.get<PokemonApiDataResult>(this.apiUrl).pipe(
      map(response => {
        return {
          count: response.count,
          next: response.next,
          previous: response.previous,
          results: response.results.map(pokemon => {
            return {
              name: pokemon.name,
              url: pokemon.url,

              // todo: move to separate method
              id: parseInt(pokemon.url.split('/pokemon/')[1])
            }
          })
        }
      })
    );
  }
}
