<template>
  <q-page class="app-wrapper-main">
    <div class="app-title-6">Вход</div>
    <validation-observer
      tag="form"
      ref="form"
      @submit.prevent="login"
      class="tw-text-center tw-mb-5"
    >
      <app-phone-input rules="required" v-model="cellphone" />
      <app-password-input rules="required" v-model="password" />
      <app-button
        class="tw-mt-8"
        label="Войти"
        color="eBlack"
        type="submit"
        :loading="loggining"
      />
    </validation-observer>
    <section>
      <p class="tw-text-center">
        Если вы забыли свой пароль, просим обратиться на служебный email для
        партнеров
        <a href="mailto:b2b@fenix.io">b2b@fenix.io</a>
      </p>
    </section>
  </q-page>
</template>

<script>
import { mapWaitingGetters, waitFor } from 'vue-wait';

export default {
  data() {
    return {
      cellphone: '',
      password: '',
    };
  },
  computed: {
    ...mapWaitingGetters({
      loggining: 'loggining',
    }),
  },
  methods: {
    login: waitFor('loggining', async function () {
      const valid = await this.$refs.form.validate();
      if (!valid) return;

      try {
        const { cellphone, password } = this;
        await this.$store.dispatch('b2c/auth/login', {
          cellphone,
          password,
        });

        this.$router.push({ name: 'main' });
      } catch (e) {
        if (!e.response) throw e;
        if (e.response.status === 400) {
          return this.$q.notify({
            type: 'negative',
            message: 'Неправильный логин или пароль',
          });
        }
        throw e;
      }
    }),
  },
};
</script>

<style scoped>
.forgot {
  color: #9b9b9b;
}
</style>
