<template>
  <div>
    <v-container fluid>
      <v-row no-gutters>
          <v-col>
            <v-app-bar class="d-none d-sm-flex" app color="yellow darken-2">
              <v-icon color="red" x-large>mdi-cube</v-icon>
              <h3 class="mb-1">Tienda CellPhone</h3>
              <v-text-field
                class=" mx-6"
                label="search phone"
                v-model="busqueda"
                @keyup="setDisplay(busqueda)"
                hide-details="auto"
                prepend-inner-icon="mdi-magnify"
              ></v-text-field>
              <v-btn color="primary" elevation="11" class="mx-2" to="/">
                <v-icon> mdi-home </v-icon>Inicio</v-btn
              >


              <v-btn color="secondary" elevation="11" class="mx-2" to="/charts"
                ><v-icon>mdi-chart-line</v-icon>

                Estadistica</v-btn
              >
              <v-btn to="new">
                Nuevo Anuncio
              </v-btn>
              <v-icon x-large color="black">
                mdi-cart
              </v-icon>
            </v-app-bar>

            <v-system-bar color="deep-purple darken-3"></v-system-bar>

            <v-app-bar class="d-flex d-sm-none" app color="yellow darken-2">
              <v-app-bar-nav-icon
                @click.stop="drawer = !drawer"
              ></v-app-bar-nav-icon>

              <v-text-field
                  class=" mx-6"
                  label="search phone"
                  v-model="busqueda"
                  @keyup="setDisplay(busqueda)"
                  hide-details="auto"
                  prepend-inner-icon="mdi-magnify"
              ></v-text-field>
            </v-app-bar>
          </v-col>

          <v-col>
            <v-navigation-drawer v-model="drawer" absolute fixed temporary>
              <v-list nav dense>
                <v-list-item-group
                  v-model="group"

                  active-class="deep-purple--text text--accent-4"
                >
                  <v-list-item to="/" class="justify-center">
                    <v-icon>mdi-cube </v-icon>EbayCellphone
                  </v-list-item>
                  <v-list-item to="/">
                    <v-list-item-title><v-icon>mdi-home </v-icon> Inicio</v-list-item-title>
                  </v-list-item>
                  <v-list-item to="new">
                    <v-list-item-title>
                      <v-icon>mdi-plus-box</v-icon> Nuevo Anuncio
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title> <v-icon>mdi-cart-outline</v-icon>Carrito</v-list-item-title>
                  </v-list-item>

                  <v-list-item to="charts">
                    <v-list-item-title><v-icon>mdi-chart-line</v-icon>Estadistica</v-list-item-title>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-navigation-drawer>
          </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import NuevoAnuncio from "@/components/NuevoAnuncio";
import { mapMutations, mapState } from "vuex";
export default {
  name: "HeaderApp",
  components: { NuevoAnuncio },
  data: () => ({
    busqueda: "",
    drawer: false,
    group: null,
  }),
  methods: {
    ...mapMutations(["setDisplay"]),
  },
  computed: {
    ...mapState(["searchDisplay"]),
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style scoped></style>
