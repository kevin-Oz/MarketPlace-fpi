<template>
  <v-container>
    <v-row class="d-none d-sm-flex">
      <v-card>
        <v-col>
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
            >
            </v-text-field>
            <v-btn @click="priceRange()"> buscar</v-btn>
          </v-row>
        </v-col>
      </v-card>

      <v-col >
        <v-card>
          <span>ordenar por: </span>
          <v-col>
            <v-btn @click="orderByPrecio()"><v-icon>mdi-cash-100</v-icon> Precio</v-btn>
            <v-btn @click="orderByFecha()"><v-icon>mdi-calendar-check</v-icon> Fecha</v-btn>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="d-flex d-sm-none">
      <v-col cols="8">
        <v-select
            color="deep purple"
            :items="items"
            outlined
            item-color="yellow"
            v-on:change="sortList"
            label="Ordenar Por:"
        ></v-select>
      </v-col>
      <v-col cols="4"> <v-btn color="orange" @click="dialogFilter=true"> <v-icon size="30px" color="black">mdi-filter</v-icon>  </v-btn>  </v-col>
      <v-dialog
          class="d-flex d-sm-none"
          v-model="dialogFilter"
      >
        <v-btn color="orange" @click="dialogFilter= false"><v-icon>mdi-close</v-icon>close</v-btn>
        <filter-checkbox/>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import FilterCheckbox from "@/components/FilterCheckbox";
export default {
  name: "OrderByFilter",
  components:{FilterCheckbox},
  data() {
    return {
      value: 0,
      precio: false,
      fecha: false,
      desde: 0,
      hasta: 0,
      dialogFilter: false,
      items:['Precio','Fecha']
    };
  },
  methods: {
    sortList(value){
     if(value === 'Precio'){
       this.orderByPrecio();
     }else {
       this.orderByFecha();
     }
    },
    orderByPrecio() {
      if (this.precio !== true) {
        this.anuncios.sort((a, b) => a.precio - b.precio);
      } else {
        this.anuncios.sort((a, b) => b.precio - a.precio);
      }
      this.precio = !this.precio;
    },
    orderByFecha() {
      if (this.fecha !== true) {
        this.anuncios.sort((a, b) => a.fecha - b.fecha);
      } else {
        this.anuncios.sort((a, b) => b.fecha - a.fecha);
      }
      this.fecha = !this.fecha;
    },
    async priceRange() {
      const elementos = [];
      await this.getAnuncios();
      this.anuncios.forEach((element) => {
        if (element.precio >= this.desde && element.precio <= this.hasta)
          elementos.push(element);
      });
      this.setAnuncio(elementos);
      console.log(elementos);
    },
    ...mapMutations(["setAnuncio"]),
    ...mapActions(["getAnuncios"]),
  },
  computed: {
    ...mapGetters(["anuncios"]),
  },
};
</script>

<style scoped></style>
