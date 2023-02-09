import type { GetEvolutionChainResponse } from "./protocols/get-evolution-chain-protocols";
import type { GetByNameSpecieResponse } from "./protocols/get-by-name-protocols";
import type { PreviewPokeDTO } from "../../dtos/preview-poke-dto";

const BASE_SPECIE_URL = "https://pokeapi.co/api/v2/pokemon-species/";
const BASE_DETAILS_URL = "https://pokeapi.co/api/v2/pokemon/";

class PokeServices {
  public async getByName(name: string): Promise<PreviewPokeDTO | string> {
    try {
      const response = await fetch(`${BASE_SPECIE_URL}${name.trim()}`);
      if (!response.ok) throw new Error(response.statusText);

      const data: GetByNameSpecieResponse = await response.json();

      const pokeResponse = await fetch(`${BASE_DETAILS_URL}${data.name}`);
      if (!pokeResponse.ok) throw new Error(response.statusText);

      const pokeData: PreviewPokeDTO = await pokeResponse.json();
      return {
        ...pokeData,
        evolution_chain: {
          url: data.evolution_chain.url,
        },
      };
    } catch (err) {
      return (err as Error).message;
    }
  }

  private async getEvolutionChain(
    evolutionChain: string
  ): Promise<PreviewPokeDTO[] | string> {
    try {
      const response = await fetch(evolutionChain);
      if (!response.ok) throw new Error(response.statusText);

      const data: GetEvolutionChainResponse = await response.json();
      const evolutionChainPromises: Promise<PreviewPokeDTO>[] = [];
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
    } catch (err) {
      return (err as Error).message;
    }
  }

  public async getPokemon(name: string): Promise<PreviewPokeDTO[] | string> {
    try {
      const pokeData = await this.getByName(name);
      if (typeof pokeData === "string") throw new Error(pokeData);

      const evolutionChainData = await this.getEvolutionChain(
        pokeData.evolution_chain.url
      );
      if (typeof evolutionChainData === "string")
        throw new Error(evolutionChainData);

      return [pokeData, ...evolutionChainData];
    } catch (err) {
      return (err as Error).message;
    }
  }
}

export const pokeServices = new PokeServices();
