import type { PokemonDetailsDTO } from "../../../dtos/pokemon-dtos";

export type GetPokemonEvolutionResponse = Promise<
  undefined | PokemonDetailsDTO[]
>;
