<script setup lang="ts">
import { ref } from 'vue';

import type { Parameters } from '@/types/Parameters';

const emit = defineEmits<{
    (e: 'newGenetic', parameters: Parameters): void
}>();

const props = defineProps(['isRunPopulation']);

const populationSize = ref(100);
const generationSize = ref(100);
const mutation_rate = ref(3);
const survival_rate = ref(1);
const penality_rate = ref(5);

function submit() {
    populationSize.value = Math.floor(populationSize.value);
    generationSize.value = Math.floor(generationSize.value);

    const parameters = {
        populationSize: populationSize.value,
        generationSize: generationSize.value,
        mutation_rate: mutation_rate.value,
        survival_rate: survival_rate.value,
        penality_rate: penality_rate.value,
    } as Parameters;

    emit('newGenetic', parameters);
}

</script>

<template>
    <form @submit.prevent="submit">
        <div class="genetic_input">
            <label for="populationSize">Tamanho da população</label>
            <input v-model="populationSize" type="number" min="0" max="10000"
                name="populationSize" id="populationSize">
        </div>
        <div class="genetic_input">
            <label for="generationSize">Quantidade de gerações</label>
            <input v-model="generationSize" type="number" min="0" max="10000"
                name="generationSize" id="generationSize">
        </div>
        <div class="genetic_input">
            <label for="mutation_rate">Taxa de mutação</label>
            <input v-model="mutation_rate" type="number" min="0" step="0.1"
                name="mutation_rate" id="mutation_rate">
        </div>
        <div class="genetic_input">
            <label for="survival_rate">Taxa de sobrevivência</label>
            <input v-model="survival_rate" type="number" step="0.1"
                name="survival_rate">
        </div>
        <div class="genetic_input">
            <label for="penality_rate">Taxa de penalidade</label>
            <input v-model="penality_rate" type="number" min="0" step="0.1"
                name="penality_rate" id="penality_rate">
        </div>

        <button :disabled="props.isRunPopulation">
            {{  isRunPopulation? 'executando' : 'Calcular solução' }}
        </button>

    </form>
</template>

<style>
.genetic_input {
    display: flex;
    flex-direction: column;

    margin-bottom: 8px;
}

.genetic_input input {
    max-width: 100px;
}
</style>