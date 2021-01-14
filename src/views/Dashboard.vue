<template>
  <div>
    <v-container fluid >
      <v-row dense>
        <v-col class="d-none d-sm-flex" cols="2">
          <filter-checkbox/>
        </v-col>
        <v-col  cols="10">
          <template>
            <v-row class="justify-center" no-gutters>
              <order-by-filter  />

              <v-card
                class="my-1 mx-2"
                max-width="260"
                v-for="(ads, index) in anuncios"
                v-show="filtro(index)"
                :key="index"
              >
                <div v-for="(image, index2) in imagenes" :key="index2">
                  <div v-if="ads.id === image.id">
                    <v-img :src="image.urlImage" max-height="200px"></v-img>
                  </div>
                </div>
                <v-card-title class="justify-center">
                  <v-chip color="yellow accent-4"> $ {{ ads.precio }} </v-chip>
                </v-card-title>
                <v-card-subtitle class="text--darken-4">
                  {{ ads.titulo }}, {{ ads.sistema }} {{ ads.marca }},
                  {{ ads.modelo }}
                </v-card-subtitle>
                <v-card-actions>
                  <v-btn color="amber darken-4" @click="moveToDetail(ads)">
                    Ver Detail
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="show = !show">
                    <v-icon>{{
                      show ? "mdi-chevron-up" : "mdi-chevron-down"
                    }}</v-icon>
                  </v-btn>
                </v-card-actions>
                <v-expand-transition>
                  <div v-show="show">
                    <v-divider></v-divider>
                    <v-card-text>
                      {{
                        ads.descripcion ||
                          "No se proporciono una descripción de este producto"
                      }}
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </v-card>
            </v-row>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import FilterCheckbox from "@/components/FilterCheckbox";
import PhoneDetail from "@/views/PhoneDetail";
import OrderByFilter from "@/components/OrderByFilter";
export default {
  name: "Dashboard",
  components: { OrderByFilter, PhoneDetail, FilterCheckbox },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    ...mapActions(["getAnuncios", "getImages"]),
    moveToDetail(anuncio) {
      this.$router.push({
        name: "detail",
        params: {
          ads: anuncio,
        },
      });
    },
    filtro(valor_orden) {
      if (this.searchDisplay === "") return true;
      let cad =
        this.anuncios[valor_orden].marca +
        this.anuncios[valor_orden].modelo +
        this.anuncios[valor_orden].pantalla +
        this.anuncios[valor_orden].titulo +
        this.anuncios[valor_orden].precio +
        this.anuncios[valor_orden].sistema+
      this.anuncios[valor_orden].ram +
      this.anuncios[valor_orden].rom +
      this.anuncios[valor_orden].vendedor +
      this.anuncios[valor_orden].descripcion;
      return cad.toUpperCase().indexOf(this.searchDisplay.toUpperCase()) >= 0;
    },
    async getData() {
      this.$store.state.images = [];
      await this.getAnuncios();
      await this.getImages(this.anuncios);
    },
  },
  computed: {
    ...mapGetters(["anuncios", "imagenes"]),
    ...mapState(["searchDisplay"]),
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped></style>
