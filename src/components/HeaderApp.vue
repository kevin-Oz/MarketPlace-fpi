<template>
<div>
  <v-container fluid>
    <v-row no-gutters>
      <v-col
          cols="12"
          xl="12"
          lg="12"
          md="12"
      >
        <v-app-bar
            color="yellow darken-2"
        >
          <v-icon color="red" x-large  >mdi-cube</v-icon>
          <h3 class="mb-1" >Tienda CellPhone</h3>
          <v-text-field
              class=" mx-6"
              label="search phone"

              hide-details="auto"
              prepend-inner-icon="mdi-magnify"
          ></v-text-field>
          <v-btn
              color="primary"
              elevation="11"
              class="mx-2"
              to="/"
          >
            <v-icon>
              mdi-home
            </v-icon>Inicio</v-btn>
          <v-btn
              color="secondary"
              elevation="11"
              class="mx-2"
              to="/charts"
          ><v-icon>mdi-chart-line</v-icon>

            Estadistica</v-btn>

          <nuevo-anuncio/>
          <v-icon x-large color="black">
            mdi-cart
          </v-icon>
        </v-app-bar>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
import NuevoAnuncio from "@/components/NuevoAnuncio";
export default {
name: "HeaderApp",
  components: {NuevoAnuncio},
  data: () => ({


  }),

}
</script>

<style scoped>

</style>
