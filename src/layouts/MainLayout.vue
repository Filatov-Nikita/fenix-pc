<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="app-wrapper-x-main">
      <q-toolbar class="tw-px-0 tw--ml-1">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title> Fenix </q-toolbar-title>
        <q-btn
          v-if="profile !== null"
          round
          icon="logout"
          class="tw-bg-eGray tw-text-eBlack"
          size="sm"
          @click="logout"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
      :mini="mini"
      @mouseover="mini = false"
      @mouseout="mini = true"
      :width="250"
      :breakpoint="500"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item
            v-for="(item, index) in menu"
            :key="index"
            clickable
            v-ripple
            :to="item.to"
            :exact="item.to && item.to.name === 'main'"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>

            <q-item-section> {{ item.title }} </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex';

const linksData = [
  {
    title: 'Главная',
    icon: 'home',
    to: { name: 'main' },
  },
  {
    title: 'Отправить платеж',
    icon: 'paid',
    to: { name: 'transfer.create' },
  },
  {
    title: 'История переводов',
    icon: 'history',
    to: { name: 'history' },
  },
];

export default {
  name: 'MainLayout',
  data() {
    return {
      leftDrawerOpen: false,
      mini: true,
      links: linksData,
    };
  },
  computed: {
    ...mapGetters('b2c/profile', ['profile']),
    menu() {
      if (this.profile === null) {
        return [
          {
            title: 'Войти',
            icon: 'login',
            to: { name: 'login' },
          },
        ];
      } else {
        return linksData;
      }
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch('b2c/auth/logout');
      this.$router.replace({ name: 'login' });
    },
  },
};
</script>
