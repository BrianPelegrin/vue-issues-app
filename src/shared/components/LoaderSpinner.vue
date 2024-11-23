<template>
  <div class="column items-center">
    <q-spinner :color="color" :size="size" :thickness="thickness" />
    <span class="q-mt-sm" v-if="showText">Cargando</span>
  </div>
</template>

<script setup lang="ts">
interface ISpinnerProps {
  color?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'negative'
    | 'positive'
    | 'info'
    | 'warning';
  size?: string;
  thickness?: number;
  showText?: boolean;
}

withDefaults(defineProps<ISpinnerProps>(), {
  color: 'primary',
  size: '3rem',
  thickness: 5,
  showText: false,
});
</script>

<style scoped></style>
