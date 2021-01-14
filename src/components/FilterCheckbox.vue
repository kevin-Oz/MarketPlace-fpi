<template>
  <div>
    <v-card class="align-center align-content-center">
      <v-container>
      <v-row>
      <v-switch
          label="Nuevo"
          v-model="nuevo"
          :onchange="changeStatus()"
          color="green"
      ></v-switch>
      </v-row>
      </v-container>
    </v-card>

    <v-card elevation="16" class="align-center align-content-center">
      <v-card-subtitle>MARCAS</v-card-subtitle>
      <v-container fluid>
        <v-list v-for="(element, index) in marcaCantidad" :key="index">
          <v-badge
            overlap
            inline
            color="amber darken-4"
            :content="`${element.cantidad}`"
          >
            <v-checkbox
              v-model="marcasSelected"
              color="amber darken-4"
              :label="`${element.marca}`"
              :value="element.marca"
            />
          </v-badge>
        </v-list>
      </v-container>
    </v-card>

    <v-card elevation="2" class="my-2 align-content-center">
      <v-card-subtitle>SISTEMAS</v-card-subtitle>
      <v-container fluid>
        <v-list v-for="(so, index) in sistemaCantidad" :key="index">
          <v-badge
            overlap
            inline
            color="amber darken-4"
            :content="`${so.cantidad > 0 ? so.cantidad : '0'}`"
          >
            <v-checkbox
              v-model="sistemaSelected"
              color="amber darken-4"
              :label="so.sistema"
              :value="so.sistema"
            ></v-checkbox>
          </v-badge>
        </v-list>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "FilterCheckbox",
  data() {
    return {
      sistemas: ["Android", "Ios", "Windows", "Blackberry", "Otro"],
      marcaCantidad: [],
      marcasSelected: [],
      sistemaSelected: [],
      sistemaCantidad: [],
      nuevo: true,
      dialog: true
    };
  },

  methods: {
    /*
    Eliminar las marcas repetidas
    */
    async getMarcas() {
      await this.getAnuncios();
      //uso de set para evitar marcas repetidas
      return [...new Set(this.anuncios.map((elemento) => elemento.marca))];
    },

    /*
    Llenado de diccionario con las marcas y la respectiva cantidad de existencias
    */
    async countMarcas() {
      let marcas = await this.getMarcas();
      let repetidos = {};
      this.marcaCantidad = [];
      //obteniendo la cantidad de repeticiones de cada marca
      this.anuncios.forEach((anuncio) => {
        repetidos[anuncio.marca] = (repetidos[anuncio.marca] || 0) + 1;
      });
      //emparejando las marcas con su respectiva cantidad de existencias
      let list = Object.values(repetidos);
      for (let i = 0; i < marcas.length; i++) {
        this.marcaCantidad.push({ marca: marcas[i], cantidad: list[i] });
      }
      await this.countSistemas();

      // console.log(this.keyValue);
    },

    countSistemas() {
      let repetidos = {};
      this.sistemaCantidad = [];
      //obteniendo la cantidad de repeticiones de cada marca
      this.anuncios.forEach((anuncio) => {
        repetidos[anuncio.sistema] = (repetidos[anuncio.sistema] || 0) + 1;
      });
      //emparejando las marcas con su respectiva cantidad de existencias
      let list = Object.values(repetidos);
      for (let i = 0; i < this.sistemas.length; i++) {
        this.sistemaCantidad.push({
          sistema: this.sistemas[i],
          cantidad: list[i],
        });
      }
      // console.log(this.keyValue);
    },

    filtrarSeleccionados() {
      let lista = [];
      this.anuncios.forEach((elemento) => {
        for (let i = 0; i < this.marcasSelected.length; i++) {
          if (elemento.marca === this.marcasSelected[i]) {
            lista.push(elemento);
          }
        }

        for (let i = 0; i < this.sistemaSelected.length; i++) {
          if (elemento.sistema === this.sistemaSelected[i]) {
            lista.push(elemento);
          }
        }
      });
      this.setAnuncio(lista);
    },

    async changeStatus() {
      await this.getAnuncios();
      let anunciosList = [];
      if (this.nuevo === true) {
        anunciosList = this.anuncios.filter(
          (elemento) => elemento.estado === "nuevo"
        );
      } else {
        anunciosList = this.anuncios;
      }
      if (this.marcasSelected.length >= 1 || this.sistemaSelected.length >= 1) {
        this.filtrarSeleccionados();
      } else {
        this.setAnuncio(anunciosList);
      }
    },
    ...mapActions(["getAnuncios"]),
    ...mapMutations(["setAnuncio"]),
  },
  computed: {
    ...mapGetters(["anuncios"]),
  },
  mounted() {
    this.countMarcas();
  },
};
</script>

<style scoped></style>
