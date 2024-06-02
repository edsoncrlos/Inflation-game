<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { Population } from '@/Population';
import { shelf } from '@/constants';

import FormGenetic from './FormGenetic.vue';

import type { Parameters } from '@/types/Parameters';

const chromossome: Ref<any> = ref(null);
const done = ref(false);

function getSolution({
    populationSize, 
    generationSize, 
    mutation_rate, 
    survival_rate, 
    penality_rate}: Parameters) {
    
    const p = new Population(populationSize, mutation_rate, survival_rate, penality_rate);
    
    console.clear();

    p.evaluationChromosomes();
    for (let i = 0; i < generationSize; i++) {    
        console.log(p.getChromosomes());

        chromossome.value = p.getChromosomes()[0];

        p.generateDescendents();
    }

    chromossome.value = p.getChromosomes()[0];
    done.value = true;
}

function initNewGenetic(parameters : Parameters) {
    getSolution(parameters);
}

</script>

<template>
    <div>
        <FormGenetic @newGenetic="initNewGenetic"></FormGenetic>
    </div>

    <section v-if="done">
        <h2>Melhor indivíduo</h2>
        <p>Soma Necessidade: {{ chromossome.sumNecessity }}</p>
        <p>Soma preço: {{ chromossome.sumPrice }}</p>
        
        <div v-for="(isInShelf, i) in chromossome.getSolution()">
            <p v-if="isInShelf">
                {{ shelf[i] }}
            </p>
        </div>
    </section>
</template>