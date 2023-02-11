import { PokemonDetailsDTO, PokemonDTO } from "../../../dtos/pokemon-dtos";

export type GetByNameResponse = Promise<PokemonDetailsDTO>;

export type GetSpeciesByNameResponse = Promise<PokemonDTO>;

export type GetPokemonByNamesResponse = Promise<PokemonDetailsDTO[]>;
