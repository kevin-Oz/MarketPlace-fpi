<template>
  <v-app>
    <header-app />
    <router-view class="my-5"></router-view>
    <v-footer class="justify-center">
      Kevin Osmin González Figueroa GF15006
    </v-footer>
  </v-app>
</template>

<script>
import HeaderApp from "@/components/HeaderApp";

export default {
  name: "App",

  components: {
    HeaderApp,
  },

  data: () => ({
    //
  }),
};
</script>
