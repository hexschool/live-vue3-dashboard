<template>
  <Navbar/>
  <div class="container-fluid mt-3 position-relative">
    <ToastMessages></ToastMessages>
    <router-view/>
  </div>
</template>

<script>
import mitt from 'mitt';
import ToastMessages from '@/components/ToastMessages.vue';
import Navbar from '@/components/Navbar.vue';

const emitter = mitt();

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
  },
};
</script>
