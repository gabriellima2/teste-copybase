interface ChainLink {
  species: { url: string };
  evolves_to: ChainLink[];
}

export interface PokemonEvolutionChainDTO {
  chain: ChainLink;
}
