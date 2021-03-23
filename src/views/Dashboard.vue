<template>
  <Navbar/>
  <div class="container-fluid mt-3 position-relative">
    <ToastMessages></ToastMessages>
    <router-view/>
  </div>
</template>

<script>
import emitter from '@/methods/eventBus';
import ToastMessages from '@/components/ToastMessages.vue';
import Navbar from '@/components/Navbar.vue';

export default {
  components: { Navbar, ToastMessages },
  provide() {
    return {
      emitter,
    };
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = `${token}`;
    const api = `${process.env.VUE_APP_API}/api/user/check`;
    this.$http.post(api)
      .then((response) => {
        console.log(response);
        this.$httpMessageState(response, '登入');
        if (!response.data.success) {
          this.$router.push('/login');
        }
      });
  },
};
</script>
