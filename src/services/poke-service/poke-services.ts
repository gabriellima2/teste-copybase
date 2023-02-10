import type {
  GetEvolutionChainResponse,
  GetPokemonEvolutionResponse,
  GetByNameResponse,
  GetSpeciesByNameResponse,
  GetAllResponse,
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
      const pokemonSpecies = await this.getSpeciesByName(name);
      if (!pokemonSpecies) throw new Error();

      const pokemonEvolutionChain = await this.getPokemonEvolutionChain(
        pokemonSpecies.evolution_chain.url
      );
      if (!pokemonEvolutionChain) throw new Error();

      const pokemonEvolution = await this.getPokemonEvolution(
        pokemonEvolutionChain
      );
      if (!pokemonEvolution) throw new Error();

      return [...pokemonEvolution];
    } catch (err) {
      return (err as Error).message;
    }
  }

  private async getPokemonEvolution(
    evolutionsChain: Pick<PokemonDTO, "name">[]
  ): GetPokemonEvolutionResponse {
    try {
      const pokemonEvolutionsPromise = evolutionsChain.map((evolution) =>
        this.getByName(evolution.name)
      );
      const pokemonEvolutions = await Promise.all(pokemonEvolutionsPromise);
      if (typeof pokemonEvolutions[0] === "string")
        throw new Error(pokemonEvolutions[0]);

      return pokemonEvolutions as PokemonDetailsDTO[];
    } catch (err) {
      return;
    }
  }

  private async getSpeciesByName(name: string): GetSpeciesByNameResponse {
    try {
      const response = await http.get(`${BASE_SPECIE_URL}${name.trim()}`);
      if (!response.ok) throw new Error(response.statusText);

      const data: PokemonDTO = await response.json();
      return data;
    } catch (err) {
      return;
    }
  }

  private async getPokemonEvolutionChain(
    evolutionChain: string
  ): GetEvolutionChainResponse {
    try {
      const response = await http.get(evolutionChain);
      if (!response.ok) throw new Error(response.statusText);

      const data: PokemonEvolutionChainDTO = await response.json();

      const evolutionChainPromises: Promise<PokemonDTO>[] = [];
      let chain = data.chain;

      // Semelhante a navegação de uma Lista Encadeada! Navegamos em toda a cadeia de evolução, mas somente de forma linear
      while (Object.keys(chain).length > 1) {
        const evolutionChainResponse = await http.get(chain.species.url);
        if (!evolutionChainResponse.ok) throw new Error(response.statusText);

        evolutionChainPromises.push(evolutionChainResponse.json());
        chain = chain.evolves_to[0] || {};
      }

      const evolutionChainData = await Promise.all(evolutionChainPromises);
      return evolutionChainData;
    } catch (err) {
      return;
    }
  }
}

export const pokeServices = new PokeServices();
