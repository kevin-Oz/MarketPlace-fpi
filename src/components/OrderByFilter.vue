<template>
  <v-container>
    <v-row>
      <v-card>
        <v-col cols="8">
          <v-row>
            <v-text-field
              label="Precio"
              v-model="desde"
              prepend-icon="mdi-currency-usd"
            ></v-text-field>

            <v-text-field
              label="Hasta"
              v-model="hasta"
              prepend-icon="mdi-currency-usd"
            ></v-text-field>
            <v-btn @click="priceRange()"> buscar</v-btn>
          </v-row>
        </v-col>
      </v-card>

      <v-col cols="4">
        <v-card>
          <span>ordenar por: </span>
          <v-col
            ><v-btn @click="orderByPrecio()">precio</v-btn>
            <v-btn @click="orderByFecha()">Fecha publicación</v-btn></v-col
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "OrderByFilter",
  data() {
    return {
      value: 0,
      precio: false,
      fecha: false,
      desde: 0,
      hasta: 0,
    };
  },
  methods: {
    orderByPrecio() {
      if (this.precio != true) {
        this.anuncios.sort((a, b) => a.precio - b.precio);
      } else {
        this.anuncios.sort((a, b) => b.precio - a.precio);
      }
      this.precio = !this.precio;
    },
    orderByFecha() {
      if (this.fecha != true) {
        this.anuncios.sort((a, b) => a.fecha - b.fecha);
      } else {
        this.anuncios.sort((a, b) => b.fecha - a.fecha);
      }
      this.fecha = !this.fecha;
    },
    priceRange() {
      const result = this.anuncios.filter(
        (anuncio) =>
          anuncio.precio >= this.desde && anuncio.precio <= this.hasta
      );
      this.anuncios = result;
      // this.findByRange(this.desde, this.hasta);
    },
    ...mapActions(["findByRange"]),
  },
  computed: {
    ...mapGetters(["anuncios"]),
  },
};
</script>

<style scoped></style>
