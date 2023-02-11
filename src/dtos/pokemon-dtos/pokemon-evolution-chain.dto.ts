interface ChainLink {
  species: { name: string };
  evolves_to: ChainLink[];
}

export interface PokemonEvolutionChainDTO {
  chain: ChainLink;
}
