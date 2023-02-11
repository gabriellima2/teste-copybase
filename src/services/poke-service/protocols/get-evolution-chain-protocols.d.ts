import type { PokemonEvolutionChainDTO } from "../../../dtos/pokemon-dtos";

export type GetEvolutionChainResponse = Promise<
  string | PokemonEvolutionChainDTO
>;
