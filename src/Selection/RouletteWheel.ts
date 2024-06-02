import type { Chromosome } from "@/Chromosome";
import type { Selection } from "@/types/Selection";

abstract class SelectionAbstract {
    protected population: Chromosome[];
    
    constructor(population: Chromosome[]) {
        this.population = population;
    }

    setPopulation(population: Chromosome[]) {
        this.population = population;
    };
}

export class RouletteWheel extends SelectionAbstract implements Selection {
    private sumNotes = 0;
    private roullete: ChromosomeRange[] | null;
    private populationSize = 0;

    constructor(population: Chromosome[], populationSize: number) {
        super(population);
        this.populationSize = populationSize;
        this.roullete = null;
        this.sumNotes = this.getSumNoteFitness();
        this.generateRoulette();
    }

    private generateRoulette() {
        this.roullete = new Array<ChromosomeRange>(this.populationSize);

        let startPoint = 0;
        let endPoint = 0;

        for (let i = 0; i < this.populationSize; i++) {
            const relativeFitness = this.population[i].getNote() / this.sumNotes;
            
            endPoint = startPoint+relativeFitness;
            this.roullete[i] = new ChromosomeRange(startPoint, endPoint);
            startPoint = endPoint;
        }
    }

    selectChromosome(): Chromosome {
        const raffle = Math.random();
        const i = this.getIndexChromossomeBinarySearch(raffle);

        return this.population[i];
    }

    private getIndexChromossomeBinarySearch(raffle: number): number {
        let i = -1;
        if (this.roullete) {
            let start = -1;
            let end = this.roullete.length;

            while(start < end-1) {
                i = Math.floor((start + end)/2);

                if (raffle >= this.roullete[i].getStart() &&
                raffle < this.roullete[i].getEnd()) {
                    return i;
                }

                if (raffle >= this.roullete[i].getStart()) {
                    start = i;
                }

                if (raffle < this.roullete[i].getStart()) {
                    end = i;
                }
            }
        }
        return -1;
    }

    private getSumNoteFitness() {
        return this.population.reduce((acc: number, c: Chromosome) => acc + c.getNote(), 0);
    }
}

class ChromosomeRange {
    private start;
    private end;

    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
    }

    getStart() {
        return this.start;
    }

    getEnd() {
        return this.end;
    }
}