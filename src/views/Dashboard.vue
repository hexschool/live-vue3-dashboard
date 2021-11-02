<template>
  <Navbar/>
  <div class="container-fluid mt-3 position-relative">
    <router-view v-if="status"/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  components: { Navbar },
  data() {
    return {
      status: false,
    };
  },
  inject: ['emitter', '$httpMessageState'],
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');

    this.$http.defaults.headers.common.Authorization = token;

    const api = `${process.env.VUE_APP_API}/api/user/check`;
    this.$http.post(api)
      .then((response) => {
        this.$httpMessageState(response, '登入');
        this.status = true;
      }).catch((error) => {
        this.isLoading = false;
        this.$router.push('/');
        this.$httpMessageState(error.response, '錯誤訊息');
      });
  },
};
</script>
