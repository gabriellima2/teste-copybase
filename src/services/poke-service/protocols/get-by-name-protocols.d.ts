import { PokemonDetailsDTO, PokemonDTO } from "../../../dtos/pokemon-dtos";

export type GetByNameResponse = Promise<PokemonDetailsDTO | string>;

export type GetSpeciesByNameResponse = Promise<PokemonDTO | string>;

export type GetPokemonByNamesResponse = Promise<string | PokemonDetailsDTO[]>;
