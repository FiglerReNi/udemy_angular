import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {exhaustMap, map, take, tap} from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import {AuthService} from "../auth/auth.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://test-cce06-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    //a take arra jó, hogy egyszer kiolvassuk az utolsó usert és automatikusan leiratkozik, nem kell az unsubcribe külön
    //exhaustMap -> mivel két pipe hívásunk van és nem ágízhatjuk egymásba őket, mert a belsőnek az eredménye
    //kell a végén, ezért ezzel egy nagy egységbe tudjuk tenni a kettőt. Az exhaustMap-ben visszakapjuk az első pipe értékét és
    //ezt használjuk a láncban a http hívásnál, és ez arra is jó, hogy biztosan nem indul el a következő hívás
    //ameddig ez nem végez
    // return this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.http
      .get<Recipe[]>(
        'https://test-cce06-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
        // , {params: new HttpParams().set('auth', user.token)}
      )
    // }),
    .pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      }))
    // return this.http
    //   .get<Recipe[]>(
    //     'https://test-cce06-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
    //   )
    //   .pipe(
    //     map(recipes => {
    //       return recipes.map(recipe => {
    //         return {
    //           ...recipe,
    //           ingredients: recipe.ingredients ? recipe.ingredients : []
    //         };
    //       });
    //     }),
    //     tap(recipes => {
    //       this.recipeService.setRecipes(recipes);
    //     })
    //   )
  }
}
