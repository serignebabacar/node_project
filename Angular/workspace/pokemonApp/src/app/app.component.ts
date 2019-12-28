import { Component, OnInit } from '@angular/core';
import {Pokemon} from "./pokemon";
import {LIST_POKEMONS} from "./shared/list.pokemon";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit{
  title = 'Application de pokemon ';
  pokemons: Pokemon[];

  ngOnInit(): void{
    this.pokemons = LIST_POKEMONS;
  }
  selectPokemon(selectedPokemon:Pokemon): void{
    alert('le pokemon selectionne est '+selectedPokemon.name);
  }
}
