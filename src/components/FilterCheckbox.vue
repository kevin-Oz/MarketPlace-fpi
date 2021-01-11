<template>
  <div>
    <v-switch label="Nuevo" v-model="nuevo" color="green"></v-switch>
    <v-card elevation="2" class="align-center align-content-center">
      <v-card-subtitle>MARCAS</v-card-subtitle>
      <v-list v-for="(marca, index) in marcas" :key="index">
        <v-checkbox :label="marca" />
      </v-list>
    </v-card>

    <v-card elevation="2" class="my-2 align-content-center">
      <v-card-subtitle>Sistema</v-card-subtitle>
      <v-checkbox label="Android" />
      <v-checkbox label="Windows" />
      <v-checkbox label="Ios" />
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "FilterCheckbox",
  props: ["mobile"],
  methods: {},
  data() {
    return {
      sistemas: [],
      marcas: ["marca1", "w"],
      nuevo: false,
    };
  },

  methods: {
    getMarcas() {
      this.marcas;
    },
  },
  computed: {
    ...mapGetters(["anuncios"]),
  },
};
</script>

<style scoped></style>
