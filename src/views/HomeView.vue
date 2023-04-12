<template>
  <v-container fluid >
    <div class="rota-layout">
      <user-list></user-list>
      <Shedule />
    </div>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import UserList from '@/components/UserList.vue'
  import Shedule from '@/components/SheduleList.vue'

  export default Vue.extend({
    name: 'HomeView',

    components: {
      UserList,
      Shedule
    },
  })
</script>

<style lang="scss" scoped>
.rota-layout {
  display: grid;
  grid-template-columns: 1fr 3fr;
  padding: 10px 50px;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 20px;
  }
}
</style>
