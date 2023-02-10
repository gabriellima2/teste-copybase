export interface PokemonOverviewDTO {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  evolution_chain: {
    url: string;
  };
}
