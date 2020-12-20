<template>
  <div>
    <v-container fluid>
      <v-row dense>
        <v-col cols="2" xl="2" lg="2" >
            aca van los filtros de checkbox

        </v-col>
        <v-col cols="10" xl="10" lg="10" md="10">
          <template>
            <v-row >
              <v-card
                  class="my-1 mx-1"
                  max-width="280"
                  v-for="(ads, index) in anuncios"
                  :key="index"
              >
                <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    height="200px"
                ></v-img>
                <v-card-title class="justify-center">
                  <v-chip color="yellow accent-4" >
                    $ {{ads.precio}}
                  </v-chip>
                </v-card-title>
                <v-card-subtitle class="text--darken-4">
                  {{ ads.titulo }}, {{ads.sistema}} {{ads.marca}}, {{ads.modelo}}
                </v-card-subtitle>
                <v-card-actions>
                  <v-btn
                      color="amber darken-4"
                      @click="moveToDetail(ads)"
                  >
                    Ver Detail
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                      icon
                      @click="show = !show"
                  >
                    <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-btn>
                </v-card-actions>
                <v-expand-transition>
                  <div v-show="show">
                    <v-divider></v-divider>
                    <v-card-text>
                      {{ads.descripcion || 'No se proporciono una descripción de este producto'}}
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
import { mapActions, mapGetters } from "vuex";
import FilterCheckbox from "@/components/FilterCheckbox";
import {storage} from "@/firebase";
import PhoneDetail from "@/views/PhoneDetail";
export default {
  name: "Dashboard",
  components: {PhoneDetail, FilterCheckbox },
  data () {
    return {
      show: false,
    }
  },
  methods: {
    ...mapActions(['getAnuncios',]),
    moveToDetail(anuncio){
      this.$router.push({name: 'detail',
      params: {
        ads: anuncio
      }})
    },

  },

  computed: {
    ...mapGetters(['anuncios']),
  },
  created() {
    this.getAnuncios();

  }
};
</script>

<style scoped></style>
