import type { Chromosome } from "@types/Chromosome";

export interface Selection {
    selectChromosome(): Chromosome;
    setPopulation(population: Chromosome[]): void;
}
