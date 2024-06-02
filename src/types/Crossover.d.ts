import type { Chromosome } from "@/Chromosome";
import type { Selection } from "@/Selection/Selection";

export interface Crossover {
    crossover(): Chromosome[];
    setSelection(selection: Selection): void;
}
