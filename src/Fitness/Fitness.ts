import type { Chromosome } from "./../Chromosome";
import { MAX_MONEY, MAX_ITENS, shelf } from "./../constants";

import type { Fitness } from "@/types/Fitness";

export abstract class baseFitness {
    protected getSum(solution: boolean[]) {
        let sumPrice = 0;
        let sumNecessity = 0;

        for (let i = 0; i < MAX_ITENS; i++) {
            const haveToBuy = solution[i];
         
            if (haveToBuy) {
                sumPrice += shelf[i].getPrice();
                sumNecessity += shelf[i].getNecessity();
            }
        }

        return {
            sumPrice, sumNecessity
        }
    }
}

export class TrimFitness extends baseFitness implements Fitness {
    private basePercentage;

    constructor (basePercentage: number) {
        super();
        this.basePercentage = basePercentage;
    }

    public getNote(chromosome: Chromosome) {
        const solution = chromosome.getSolution();
        
        const { sumPrice, sumNecessity } = this.getSum(solution);
        
        chromosome.sumPrice = sumPrice;
        chromosome.sumNecessity = sumNecessity;
        
        if (sumPrice > MAX_MONEY) {
            const overBudget = (sumPrice - MAX_MONEY);
            const percentage = this.getPercentageToTrim(overBudget);
            if (percentage < 0) {
                return 1;
            }
            return  percentage * sumNecessity;
        }

        return sumNecessity;
    }

    private getPercentageToTrim(multiplier: number) {
        return (100 - this.basePercentage*multiplier)/100;
    }
}

export class PenalizeFitness extends baseFitness implements Fitness {
    constructor() {
        super();
    }

    public getNote(chromosome: Chromosome) {
        const solution = chromosome.getSolution();
        
        const { sumPrice, sumNecessity } = this.getSum(solution);
        
        if (sumPrice > MAX_MONEY) {
            return  (sumNecessity/10);
        }

        return sumNecessity;
    }
}