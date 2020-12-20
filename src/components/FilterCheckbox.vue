<template>
<div>
  <v-switch label="Nuevo" color="green"></v-switch>
  <v-card
      elevation="2"
      class="align-center align-content-center"
  >
    <v-card-subtitle>MARCAS</v-card-subtitle>
    <v-checkbox label="Samsung"/>
    <v-checkbox label="Huawei"/>
    <v-checkbox label="Nokia"/>
    <v-checkbox label="Iphone"/>
    <v-checkbox label="Xiomi"/>
  </v-card>

  <v-card
      elevation="2"
      class="my-2 align-content-center"
  >
    <v-card-subtitle>Sistema</v-card-subtitle>
    <v-checkbox label="Android"/>
    <v-checkbox label="Windows"/>
    <v-checkbox label="Ios"/>

  </v-card>

  <v-card
      elevation="2"
      class="my-2 align-content-center"
  >
    <v-card-subtitle>Pantalla</v-card-subtitle>
    <v-checkbox label="6"/>
    <v-checkbox label="5.5"/>
    <v-checkbox label="5"/>

  </v-card>

</div>
</template>

<script>
export default {
name: "FilterCheckbox"
}
</script>

<style scoped>

</style>
