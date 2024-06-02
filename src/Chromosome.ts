export class Chromosome {
    private solution: boolean[];
    private note: number;
    sumPrice = 0;
    sumNecessity = 0;

    constructor(totalItens: number, solution?: boolean[]) {
        if (solution) {
            this.solution = solution;
        } else {
            this.solution = new Array<boolean>(totalItens);
        }
        this.note = 0;
    }

    randomlySolution() {
        for (let i = 0; i < this.solution.length; i++) {
            this.solution[i] = this.random();
        }
    }

    private random(): boolean {
        return Boolean(Math.floor(Math.random()*2));
    }

    getSolution() {
        return this.solution;
    }

    changeSolution(i: number, value: boolean) {
        this.solution[i] = value;
    }

    setNote(note: number) {
        this.note = note;
    }

    getNote() {
        return this.note;
    }
}
