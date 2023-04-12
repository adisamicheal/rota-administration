import Vue from 'vue'
import Vuex, { Store } from 'vuex';
import {
  createLocalVue,
  shallowMount,
  mount
} from '@vue/test-utils';
import Vuetify from 'vuetify'


import UserList from '@/components/UserList.vue';

Vue.use(Vuetify)

const localVue = createLocalVue();
let vuetify: any

localVue.use(Vuex);

describe.only('UserList.vue', () => {
  let actions: { fetchUsers: any; fetSingleRota: any; fetchRotas: any};
  let store: Store<{}>;
  let getters;

  beforeEach(() => {
    actions = {
      fetchUsers: jest.fn(),
      fetSingleRota: jest.fn(),
      fetchRotas: jest.fn()
    };
    const usersMock = jest.fn();
    usersMock.mockReturnValue([{"id":7,"last_name":"Flisher","first_name":"Kimmi","email":"kflisher0@sina.com.cn"},{"id":2,"last_name":"Tower","first_name":"Gottfried","email":"gtower1@reuters.com"},{"id":5,"last_name":"Bauldrey","first_name":"Camila","email":"cbauldrey2@livejournal.com"},{"id":10,"last_name":"Witheford","first_name":"Merrill","email":"mwitheford3@artisteer.com"},{"id":4,"last_name":"Turnpenny","first_name":"Findley","email":"fturnpenny4@cocolog-nifty.com"},{"id":8,"last_name":"Gooderson","first_name":"Colet","email":"cgooderson5@dailymotion.com"},{"id":7,"last_name":"Braidwood","first_name":"Rolfe","email":"rbraidwood6@e-recht24.de"},{"id":10,"last_name":"Teml","first_name":"Janis","email":"jteml7@usgs.gov"},{"id":6,"last_name":"De Freyne","first_name":"Rici","email":"rdefreyne8@ow.ly"},{"id":4,"last_name":"Tothacot","first_name":"Orella","email":"otothacot9@bbc.co.uk"}]);
    store = new Vuex.Store({
      state: {},
      actions,
      getters: {
        users: usersMock,
        getUserError: () => 'getUserError'
      }
    });
    vuetify = new Vuetify()
  });

  it('should dispatch action when created', () => {
    shallowMount(UserList, {
      localVue,
      store
    });
    expect(actions.fetchUsers).toHaveBeenCalled();
  });

  it('showuld call all rotas endpoint', async () => {
    const wrapper = mount(UserList, {
      localVue,
      store,
      vuetify,
      provide: {
        eventBus: () => new Vue()
      }
    });
    const button = wrapper.find('[data-testid="allshifts"]')
    expect(button.exists()).toBe(true)
    wrapper.vm.$on('button', actions.fetchRotas)

    expect(actions.fetchRotas).toHaveBeenCalledTimes(0)

    button.trigger('click')
    await wrapper.vm.$nextTick()
    expect(actions.fetchRotas).toHaveBeenCalledTimes(1);
  })

  it('showuld call single rota endpoint', async () => {
    const wrapper = mount(UserList, {
      localVue,
      store,
      vuetify,
      provide: {
        eventBus: () => new Vue()
      }
    });
    
    const card = wrapper.find('[data-testid="singlerota"]')
    if(card.exists()) {
      expect(card.exists()).toBe(true)
      wrapper.vm.$on('button', actions.fetSingleRota)
  
      card.trigger('click')
      await wrapper.vm.$nextTick()
      expect(actions.fetSingleRota).toHaveBeenCalled();
    }
  })
});