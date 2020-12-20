<template>
  <v-app>
  <header-app/>
    <router-view></router-view>
  </v-app>
</template>

<script>
import HeaderApp from "@/components/HeaderApp";

export default {
  name: 'App',

  components: {
    HeaderApp,
  },

  data: () => ({
    //
  }),
};
</script>
