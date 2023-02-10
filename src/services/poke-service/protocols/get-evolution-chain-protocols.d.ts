import type { PokemonDTO } from "../../../dtos/pokemon-dtos";

export type GetEvolutionChainResponse = Promise<
  Pick<PokemonDTO, "name">[] | undefined
>;
