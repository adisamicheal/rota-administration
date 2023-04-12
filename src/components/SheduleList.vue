<template>
    <section>
        <div v-if="errorState" class="error-message">
            {{ errorMessage || "Sorry, we encountered an error. It's us, not you :)" }}
        </div>
        <div v-else>
            <div v-if="rotaLoading" class="loading">
              <div class="card is-loading" v-for="n in 3" :key="n">
                <div class="content">
                  <h2></h2>
                  <p></p>
                </div>
              </div>
            </div>
            <v-row no-gutters v-else-if="rotas.length && singleRota === null">
              <v-col v-for="rota in rotas" :key="rota.id + Math.random()" cols="12" sm="4">
                <v-card class="mx-2 my-2" :class="{'morning': rota.type === 'morning', 'afternoon': rota.type === 'afternoon'}">
                  <v-card-text>
                    <div>{{ getUserName(rota) }}</div>
                    <p class="text-h4 text--primary">
                      {{ rota.type }}
                    </p>
                    <div class="text--primary">
                      {{ rota.startDate }} - {{ rota.endDate }}
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <div
              v-else-if="singleRota">
              <h1>{{ currentUser }} Rota</h1>
              <v-card
                max-width="374"
                class="mx-2 my-2"
                :class="{'morning': singleRota.type === 'morning', 'afternoon': singleRota.type === 'afternoon'}">
                <v-card-text>
                    <div>{{ currentUser }}</div>
                    <p class="text-h4 text--primary">
                      {{ singleRota.type }}
                    </p>
                    <div class="text--primary">
                      {{ singleRota.startDate }} - {{ singleRota.endDate }}
                    </div>
                  </v-card-text>
              </v-card>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from "vue"
import { mapActions, mapGetters } from 'vuex'

declare module 'vue/types/vue' {
  interface Vue {
    getUserName: (val: object) => void;
    fetchRotas: () => void;
  }
}
export default Vue.extend({
  name: "SheduleList",
  mounted() {
    this.fetchRotas()
  },
  computed: {
    ...mapGetters({
      rotas: 'getRotas',
      singleRota: 'getSingleRota',
      errorState: 'getErrorState',
      errorMessage: 'getErrorMessage',
      rotaLoading: 'getRotaLoading',
      users: 'getUsers'
  }),
    currentUser() {
      if (this.singleRota) {
        const user = this.users.find((val: any) => val.id === Number(this.singleRota.id))
        const firstName = user.first_name
        const lastName = user.last_name
        const fullName = `${firstName} ${lastName}`
        return fullName
      }
      return null
    }
  },
  methods: {
    ...mapActions(['fetchRotas']),
    getUserName(rota: any) {
      const user = this.users.find((val: any) => val.id === Number(rota.id))
      const firstName = user?.first_name || 'John'
      const lastName = user?.last_name || 'Doe'
      const fullName = `${firstName} ${lastName}`
      return fullName
      
    }
  }
})
</script>

<style scoped lang="scss">
.afternoon {
  background-color: #1ea1f2;
}
.morning {
  background-color: #f7cf49;
}
.error-message {
  color: red;
  background: transparent;
}
.loading {
  display: flex;
  align-items: center;
  gap: 20px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
}
.card.is-loading {
  width: 255px;
  height: 132px;
  h2,
  p {
    background: #eee;
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    border-radius: 5px;
    background-size: 200% 100%;
    animation: 1.5s shine linear infinite;
  }

  h2 {
    height: 30px;
  }

  p {
    height: 70px;
  }
}

@keyframes shine {
  to {
    background-position-x: -200%;
  }
}

</style>
