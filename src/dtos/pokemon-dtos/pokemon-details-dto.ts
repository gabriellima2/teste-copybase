export interface PokemonDetailsDTO {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  evolution_chain: {
    url: string;
  };
}
