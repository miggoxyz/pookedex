import { Cache } from "./pokecache.js";
export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(cacheInterval: number) {
    this.cache = new Cache(cacheInterval);
  }

  closeCache() {
    this.cache.stopReapLoop();
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;
    const cached = this.cache.get<ShallowLocations>(url);
    if (cached) {
      return cached;
    }

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }
      const locations: ShallowLocations = await res.json();
      this.cache.add(url, locations); //infers type from location type
      return locations;
    } catch (e) {
      throw new Error(`Error fetching location areas: ${(e as Error).message}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cached = this.cache.get<Location>(url);
    if (cached) {
      return cached;
    }
    try {
      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }

      const location: Location = await resp.json();
      this.cache.add(url, location);
      return location;
    } catch (e) {
      throw new Error(
        `Error fetching location '${locationName}': ${(e as Error).message}`
      );
    }
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: NamedAPIResource[];
};

export type Location = {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: EncounterMethodRate[];
  location: NamedAPIResource;
  names: Name[];
  pokemon_encounters: PokemonEncounter[];
};

export type NamedAPIResource = {
  name: string;
  url: string;
};

export type EncounterMethodRate = {
  encounter_method: NamedAPIResource;
  version_details: EncounterVersionDetails;
};

export type EncounterVersionDetails = {
  rate: number;
  version: NamedAPIResource;
};

export type Name = {
  name: string;
  language: NamedAPIResource;
};

export type PokemonEncounter = {
  pokemon: NamedAPIResource;
  version_details: {
    version: NamedAPIResource;
    max_chance: number;
    encounter_details: {
      min_level: number;
      max_level: number;
      condition_values: NamedAPIResource[];
      chance: number;
      method: NamedAPIResource;
    }[];
  }[];
};
