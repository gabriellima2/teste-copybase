import type {
  GetEvolutionChainResponse,
  GetByNameResponse,
  GetSpeciesByNameResponse,
} from "./protocols";
import type {
  PokemonDetailsDTO,
  PokemonDTO,
  PokemonOverviewDTO,
} from "../../dtos/pokemon-dtos";

const BASE_SPECIE_URL = "https://pokeapi.co/api/v2/pokemon-species/";
const BASE_DETAILS_URL = "https://pokeapi.co/api/v2/pokemon/";

class PokeServices {
  private async getEvolutionChain(
    evolutionChain: string
  ): Promise<Pick<PokemonDTO, "name">[]> {
    const response = await fetch(evolutionChain);
    if (!response.ok) throw new Error(response.statusText);

    const data: GetEvolutionChainResponse | undefined = await response.json();
    if (!data) throw new Error("Not Found");

    const evolutionChainPromises: Promise<PokemonOverviewDTO>[] = [];
    let node = data.chain.evolves_to;

    // Semelhante a navegação de uma Lista Encadeada! Navegamos em todas as cadeias de evolução
    while (node.length > 0) {
      const evolutionChainResponse = await fetch(node[0].species.url);
      if (!evolutionChainResponse.ok) throw new Error(response.statusText);

      evolutionChainPromises.push(evolutionChainResponse.json());
      node = node[0].evolves_to;
    }

    const evolutionChainData = await Promise.all(evolutionChainPromises);
    return evolutionChainData;
  }

  private async getSpeciesByName(name: string): GetSpeciesByNameResponse {
    try {
      const response = await fetch(`${BASE_SPECIE_URL}${name.trim()}`);
      if (!response.ok) throw new Error(response.statusText);

      const data: PokemonDTO = await response.json();
      return data;
    } catch (err) {
      return (err as Error).message;
    }
  }

  public async getByName(name: string): GetByNameResponse {
    try {
      const response = await fetch(`${BASE_DETAILS_URL}${name}`);
      if (!response.ok) throw new Error(response.statusText);

      const data: PokemonDetailsDTO = await response.json();
      return data;
    } catch (err) {
      return (err as Error).message;
    }
  }

  public async getPokemon(
    name: string
  ): Promise<PokemonOverviewDTO[] | string> {
    try {
      const pokemonSpecies = await this.getSpeciesByName(name);
      if (typeof pokemonSpecies === "string") throw new Error(pokemonSpecies);

      const pokemonSpeciesEvolutionsChain = await this.getEvolutionChain(
        pokemonSpecies.evolution_chain.url
      );
      const pokemonSpeciesEvolutionsPromise = pokemonSpeciesEvolutionsChain.map(
        (pokeEvo) => this.getByName(pokeEvo.name)
      );
      const pokemonSpeciesEvolutions = await Promise.all(
        pokemonSpeciesEvolutionsPromise
      );
      if (typeof pokemonSpeciesEvolutions[0] === "string")
        throw new Error(pokemonSpeciesEvolutions[0]);

      return [...(pokemonSpeciesEvolutions as PokemonOverviewDTO[])];
    } catch (err) {
      return (err as Error).message;
    }
  }
}

export const pokeServices = new PokeServices();
