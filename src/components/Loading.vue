<template>
  <div class="loading-overlay" :class="{ 'none': disabled }">
    <i class="bi bi-arrow-repeat rotate text-white" style="font-size: 4rem"></i>
  </div>
</template>

<script>
const body = document.querySelector('body');
export default {
  data() {
    return {
      disabled: true,
    };
  },
  created() {
    body.classList.add('isLoading');
    setTimeout(() => {
      this.disabled = false;
    }, 50);
  },
  // 元件移除後，也要移除 Body 的 loading Class
  unmounted() {
    body.classList.remove('isLoading');
  },
};
</script>

<style lang="scss">
body.isLoading {
  overflow: hidden;
}
.loading-overlay.none {
  background-color: rgba(black, 0);
}
.loading-overlay {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(black, .65);
  backdrop-filter: blur(3px);
  transition: .3s background-color;
}
.rotate {
  animation: rotate infinite 1.5s linear;
}
@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
