<template>
    <section>
      <div>
        <v-btn data-testid="allshifts" color="#00D1FF" class="mb-5" @click="fetchRotas">All Shifts</v-btn>
      </div>
      <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Pick a date range"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="menu = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menu.save(date)"
            >
              OK
            </v-btn>
          </v-date-picker>
      </v-menu>
      <div class="container">
        <div v-if="userError !== null">
            {{ userError }}
        </div>
        <div v-else>
            <div v-if="!users.length" class="loading">
                <div class="card is-loading" v-for="n in 3" :key="n">
                    <div class="content">
                        <div class="image"></div>
                        <p></p>
                    </div>
                </div>
            </div>
            <v-card
                data-testid="singlerota"
                v-else
                v-for="user in users"
                :key="user.id + Math.random()"
                class="container__card d-flex align-center px-3 py-3"
                @click="callToAction(user.id)">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="20" fill="#00D1FF"/>
                </svg>
                <div class="container__card--user ml-2">
                    <p class="container__card--user__name">{{  user.first_name }} {{  user.last_name }} <br> <small>{{  user.email  }}</small></p>
                </div>
            </v-card>
        </div>
      </div>
    </section>
</template>
  
<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default Vue.extend({
    name: 'UserList',
    data() {
        return {
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            menu: false,
            modal: false
        }
    },
    mounted() {
        this.fetchUsers();
    },
    computed: {
        ...mapGetters({
          users: 'getUsers',
          userError: 'getUserError'
        })
    },
    methods: {
        ...mapActions([ 'fetchUsers', 'fetSingleRota', 'fetchRotas']),
        callToAction(val: number) {
            this.fetSingleRota(val)
        },
    }
})
</script>
  
<style lang="scss" scoped>
.container {
    &__card {
        cursor: pointer;
        &--user {
            &__name {
                margin-bottom: 0;
            }
        }
    }
}
.card.is-loading {
  width: 255px;
  height: 64px;
  padding: 12px;
  .content {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .image,
  p {
    background: #eee;
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    border-radius: 5px;
    background-size: 200% 100%;
    animation: 1.5s shine linear infinite;
  }

  .image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  p {
    height: 24px;
    width: 190px;
  }
}

@keyframes shine {
  to {
    background-position-x: -200%;
  }
}
</style>