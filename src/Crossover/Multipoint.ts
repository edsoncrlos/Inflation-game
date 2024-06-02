import { Chromosome } from "@/Chromosome";
import type { Crossover } from "@/types/Crossover";
import { MAX_ITENS } from "@/constants";
import type { Selection } from "@/types/Selection";

export class Multipoint implements Crossover {
    private newPopulation: Chromosome[] | null;
    private selection: Selection | null;
    private populationSize = 0;

    constructor (populationSize: number) {
        this.newPopulation = null;
        this.selection = null;
        this.populationSize = populationSize;
    }

    crossover(): Chromosome[] {
        this.newPopulation = new Array<Chromosome>(this.populationSize);
        
        if (this.selection) {
            let father1: Chromosome;
            let father2: Chromosome;

            for (let i = 0; i < this.populationSize; i+=2) {
                father1 = this.selection.selectChromosome();
                father2 = this.selection.selectChromosome();

                const {newChromosome1, newChromosome2} = this.methodCrossover(father1, father2);
                
                this.newPopulation[i] = newChromosome1;
                if (i+1 < this.populationSize) {
                    this.newPopulation[i+1] = newChromosome2;
                }
            }      
        }
        
        return this.newPopulation;
    }

    private methodCrossover(father1: Chromosome, father2: Chromosome) {
        const max_itens = MAX_ITENS;
        // const divisionPoint = Math.ceil(max_itens/2);
        const divisionPoint = Math.floor(Math.random() * (max_itens - 1)) + 1;
        
        const child1 = new Array<boolean>(max_itens);
        const child2 = new Array<boolean>(max_itens);

        for (let i = 0; i < max_itens; i++) {
            if (i < divisionPoint) {
                child1[i] = father1.getSolution()[i];
                child2[i] = father2.getSolution()[i];
            } else {
                child1[i] = father2.getSolution()[i];
                child2[i] = father1.getSolution()[i];
            }
        }

        const newChromosome1 = new Chromosome(max_itens, child1);
        const newChromosome2 = new Chromosome(max_itens, child2);
        
        return { newChromosome1, newChromosome2 }
    }

    setSelection(selection: Selection) {
        this.selection = selection;
    }
}