<template>
<v-container>
  <v-row>
    <v-col>
      <v-card
          color="grey"
          elevation="16"
          max-height="300"
          max-width="530"
      >
        <v-carousel continuous
        cycle height="300"
        dark progress progress-color="yellow"
        >
          <v-carousel-item
              v-for="(item,i) in imageDetail"
              :key="i"
              :src="item"
              reverse-transition="fade-transition"
              transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>

      </v-card>
    </v-col>
    <v-col>
      <v-card
          class="justify-center">
        <v-card-title class="justify-center">
          <strong>{{ads.titulo}}</strong>
        </v-card-title>
        <v-card-text class="justify-center "
        >
        <v-divider></v-divider>
          <v-row
              class="my-5"
              justify="center"
              align="center"
          >
            <v-chip
                color="yellow accent-4"
                text-color="white"
                class="text-sm-h5"

            >
              <v-avatar
                  left
                  class="green darken-4"
              >
                <v-icon>mdi-currency-usd</v-icon>
              </v-avatar>
              <strong class="text--darken-4 black--text "> {{ads.precio}} </strong>
            </v-chip>

          </v-row>
          <v-row
              class="my-5"
              justify="center"
              align="center">
            <v-btn outlined depressed elevation="12" color="amber darken-4">COMPRAR</v-btn>
          </v-row>
      <v-col>
        <v-card
            max-height="105px"
            elevation="15"
            color="orange lighten-4"
        >
          <div class="pa-5">
          <span> Vendedor: {{ads.vendedor}} </span><span class="mx-4">Teléfono {{ads.contacto}} </span>
          </div>
        </v-card>
      </v-col>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-card-title class="justify-center">DESCRIPCIÓN</v-card-title>
  <v-row >
    <v-col
        class="d-flex  justify-center"
    >
      <v-card
          outlined
          min-width="400"
          tile>
        <v-list shaped>
          <v-list-item-group
              v-model="selectedItem"
              color="primary"
          >
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-marker-check</v-icon> Estado:
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ads.estado==='nuevo'?'NUEVO':'USADO'}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
            >
              <v-list-item-icon>
              <v-icon>mdi-cellphone</v-icon> Marca:
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="ads.marca"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
            >
              <v-list-item-icon>
                <v-icon>mdi-tablet</v-icon> Modelo:
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="ads.modelo"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
            >
              <v-list-item-icon>
                <v-icon>mdi-cellphone-link</v-icon> Pantalla:
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ads.pantalla || 'No especificado'}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-briefcase-check</v-icon> Sistema:
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="ads.sistema"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
            >
              <v-list-item-icon>
                <v-icon>mdi-checkbox-marked-circle</v-icon> RAM:
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title > {{ads.ram || 'No especificado'}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
            >
              <v-list-item-icon>
                <v-icon>mdi-content-save</v-icon> ROM:
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title >{{ads.rom || 'No especificado'}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-col>
    <v-col >
      <v-card
          min-width="300"
          min-height="90"
          tile>
        <v-card-text class="my-4">
          {{ads.descripcion || 'No se proporcionó una descripción del producto.'}}
        </v-card-text>
      </v-card>
    </v-col>

  </v-row>

</v-container>

</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
name: "PhoneDetail",
  props: ['detalle'],
  data () {
    return {
      ads: this.$route.params.ads,
      imagenes:[],
      selectedItem: 1
  }},
  computed: {
  ...mapGetters(['imageDetail'])
  },
  methods:{
  ...mapActions(['getAllImages']),
  },
  created() {
  this.$store.state.imageDetail = [];
    if(this.ads.id!==undefined ){
      this.getAllImages(this.ads.id);
    }else {
      this.$router.push('/');
    }
},
}
</script>

<style scoped>

</style>
