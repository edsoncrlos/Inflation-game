import { Chromosome } from "./Chromosome";
import type { Crossover } from "@/types/Crossover";
import { Multipoint } from "./Crossover/Multipoint";
import { TrimFitness } from "./Fitness/Fitness";
import type { Fitness } from "@/types/Fitness";
import { RouletteWheel } from "./Selection/RouletteWheel";
import { MAX_ITENS } from "./constants";
import type { Selection } from "@/types/Selection";

export class Population {
    private population: Chromosome[];
    private higherNote = 0;
    private selection: Selection | null;
    
    private fitness: Fitness;
    private crossover: Crossover;
    
    private populationSize = 0;
    private mutation_rate = 0;
    private survival_rate = 0;

    constructor(populationSize: number, mutation_rate: number, survival_rate: number, penality_rate: number) {
        this.populationSize = populationSize;
        this.mutation_rate = mutation_rate;
        this.survival_rate = survival_rate;

        this.population = new Array<Chromosome>(this.populationSize);
        
        for (let i = 0; i < this.populationSize; i++) {
            this.population[i] = new Chromosome(MAX_ITENS);
            this.population[i].randomlySolution();
        }

        this.fitness = new TrimFitness(penality_rate);
        this.crossover = new Multipoint(this.populationSize);
        this.selection = null;
    }

    setFitness (fitness: Fitness) {
        this.fitness = fitness;
    }

    evaluationChromosomes(population?: Chromosome[]) {
        if (!population) {
            population = this.population;
        }

        for (let i = 0; i < population.length; i++) {
            const chromosome = population[i];
            const note = this.fitness.getNote(chromosome);
            
            this.updateHigherNote(note);
            
            chromosome.setNote(note);
        }
        population.sort((a, b) => b.getNote() - a.getNote())
    }

    private updateHigherNote(note: number) {
        if (note > this.higherNote) {
            this.higherNote = note;
        }
    }

    getChromosomes() {
        return this.population;
    }

    selectSurvival() {

    }

    generateDescendents() {
        this.selection = new RouletteWheel(this.population, this.populationSize);

        this.crossover.setSelection(this.selection);
        const newPopulation = this.crossover.crossover();

        this.evaluationChromosomes(newPopulation)

        this.survivals(newPopulation);

        this.mutation(newPopulation);

        this.population = newPopulation;
    }

    survivals(newPopulation: Chromosome[]) {
        const numberSurvivals = Math.ceil(this.populationSize*(this.survival_rate/100));

        let i = 0;
        let j = newPopulation.length-1;
        while(i < numberSurvivals) {
            newPopulation[j] = this.population[i];
            
            j--;
            i++;
        }

        newPopulation.sort((a, b) => b.getNote() - a.getNote());
    }

    private mutation(newPopulation: Chromosome[]) {
        const numberMutation = Math.ceil((this.mutation_rate/100) * this.populationSize);
        for (let i = 0; i < numberMutation; i++) {
            const numberMutations = Math.ceil(Math.random() * MAX_ITENS);
            
            const indexChromossome = Math.floor(Math.random() * this.populationSize);
            const chromosome = newPopulation[indexChromossome];
            const solution = chromosome.getSolution();

            for (let i = 0; i < numberMutations; i++) {
                const raffle = Math.floor(Math.random() * MAX_ITENS);
                chromosome.changeSolution(raffle, !solution[raffle]);
            }
        }
    }
}