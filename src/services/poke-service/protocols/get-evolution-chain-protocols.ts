interface ChainLink {
  species: { url: string };
  evolves_to: ChainLink[];
}

export interface GetEvolutionChainResponse {
  chain: ChainLink;
}
