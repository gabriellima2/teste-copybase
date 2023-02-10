import type { PokemonOverviewDTO } from "../../../dtos/pokemon-dtos";

export type GetAllResponse = Promise<PokemonOverviewDTO[] | string>;
