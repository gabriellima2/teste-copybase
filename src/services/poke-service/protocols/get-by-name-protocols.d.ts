import { DetailsPokeDTO } from "../../../dtos/pokemon-dtos/pokemon-details-dto";

export type GetByNameResponse = Promise<DetailsPokeDTO | string>;
