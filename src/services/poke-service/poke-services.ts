import type {
  GetPokemonByNamesResponse,
  GetByNameResponse,
  GetSpeciesByNameResponse,
  GetAllResponse,
  GetEvolutionChainResponse,
} from "./protocols";
import type {
  PokemonDetailsDTO,
  PokemonDTO,
  PokemonEvolutionChainDTO,
} from "../../dtos/pokemon-dtos";
import { http } from "../http";

const BASE_SPECIE_URL = "https://pokeapi.co/api/v2/pokemon-species/";
const BASE_DETAILS_URL = "https://pokeapi.co/api/v2/pokemon/";

class PokeServices {
  public async getByName(name: string): GetByNameResponse {
    try {
      if (!name) throw new Error("Name parameter is required");
      const response = await http.get(`${BASE_DETAILS_URL}${name.trim()}`);
      if (!response.ok) throw new Error(response.statusText);

      const data: PokemonDetailsDTO = await response.json();
      return data;
    } catch (err) {
      return (err as Error).message;
    }
  }

  public async getAll(name: string): GetAllResponse {
    try {
      if (!name) throw new Error("Name parameter is required");
      const pokemonSpecies = await this.getSpeciesByName(name);
      if (typeof pokemonSpecies === "string") throw new Error(pokemonSpecies);

      const evolutionChain = await this.getEvolutionChain(
        pokemonSpecies.evolution_chain.url
      );
      if (typeof evolutionChain === "string") throw new Error(evolutionChain);

      const pokemonNames = this.getEvolutionChainPokemonNames(evolutionChain);
      const pokemons = await this.getPokemonByNames(pokemonNames);
      if (typeof pokemons === "string") throw new Error(pokemons);

      return [...pokemons];
    } catch (err) {
      return (err as Error).message;
    }
  }

  public async getEvolutionChain(url: string): GetEvolutionChainResponse {
    try {
      if (!url) throw new Error("URL parameter is required");
      const response = await http.get(url);
      if (!response.ok) throw new Error(response.statusText);

      const data: PokemonEvolutionChainDTO = await response.json();
      return data;
    } catch (err) {
      return (err as Error).message;
    }
  }

  public async getPokemonByNames(
    pokemonNames: string[]
  ): GetPokemonByNamesResponse {
    try {
      if (pokemonNames.length <= 0)
        throw new Error("Pokemon names parameter is required");
      const pokemonEvolutionsPromise = pokemonNames.map((name) =>
        this.getByName(name)
      );
      const pokemonEvolutions = await Promise.all(pokemonEvolutionsPromise);
      if (typeof pokemonEvolutions[0] === "string")
        throw new Error(pokemonEvolutions[0]);

      return pokemonEvolutions as PokemonDetailsDTO[];
    } catch (err) {
      return (err as Error).message;
    }
  }

  public async getSpeciesByName(name: string): GetSpeciesByNameResponse {
    try {
      if (!name) throw new Error("Name parameter is required");
      const response = await http.get(`${BASE_SPECIE_URL}${name.trim()}`);
      if (!response.ok) throw new Error(response.statusText);

      const data: PokemonDTO = await response.json();
      return data;
    } catch (err) {
      return (err as Error).message;
    }
  }

  private getEvolutionChainPokemonNames({
    chain,
  }: PokemonEvolutionChainDTO): string[] {
    const evolutionChainPokemonNames: string[] = [];

    // Iteramos em evoluções encadeadas de forma linear
    while (Object.keys(chain).length > 1) {
      const evolutionsLength = chain.evolves_to.length;
      evolutionChainPokemonNames.push(chain.species.name);

      // Iteramos em sub-evoluções (desvios) não acessadas pelo While
      if (evolutionsLength > 1) {
        for (let i = 1; i < evolutionsLength; i++) {
          evolutionChainPokemonNames.push(chain.evolves_to[i].species.name);
        }
      }
      chain = chain.evolves_to[0] || {};
    }
    return evolutionChainPokemonNames;
  }
}

export const pokeServices = new PokeServices();
