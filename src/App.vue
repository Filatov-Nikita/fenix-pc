<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
const myIcons = {
  'app:home': 'img:/iconly/Home.svg',
  'app:login': 'img:/iconly/Login.svg',
  'app:chart': 'img:/iconly/Chart.svg',
  'app:chat': 'img:/iconly/Chat.svg',
  'app:setting': 'img:/iconly/Setting.svg',
  'app:plus': 'img:/iconly/Plus.svg',
  'app:wallet': 'img:/iconly/Wallet.svg',
  'app:info-square': 'img:/iconly/InfoSquare.svg',
  'app:scan': 'img:/iconly/Scan.svg',
  'app:message': 'img:/iconly/Message.svg',
  'app:lock': 'img:/iconly/Lock.svg',
  'app:profile': 'img:/iconly/Profile.svg',
  'app:category': 'img:/iconly/Category.svg',
  'app:notification': 'img:/iconly/Notification.svg',
  'app:logout': 'img:/iconly/Logout.svg',
  'app:show': 'img:/iconly/Show.svg',
  'app:work': 'img:/iconly/Work.svg',
  'app:time-square': 'img:/iconly/TimeSquare.svg',
  'app:key': 'img:/iconly/Key.svg',
  'app:accept': 'img:/iconly/Accept.svg',
  'app:not-accept': 'img:/iconly/NotAccept.svg',
  'app:plus-black': 'img:/iconly/PlusBlack.svg',
  'app:category-black': 'img:/iconly/CategoryBlack.svg.svg',
  'app:info-circle-white': 'img:/iconly/InfoCircleWhite.svg',
  'app:camera': 'img:/iconly/Camera.svg',
};

import { mapWaitingActions } from 'vue-wait';

export default {
  created() {
    window.$router = this.$router;

    this.$q.iconMapFn = (iconName) => {
      const icon = myIcons[iconName];
      if (icon !== void 0) {
        return { icon: icon };
      }
    };

    this.listRates();
  },
  methods: {
    ...mapWaitingActions('info/currenciesRates', {
      listRates: { action: 'list', loader: 'loading rates' },
    }),
  },
  name: 'App',
};
</script>
