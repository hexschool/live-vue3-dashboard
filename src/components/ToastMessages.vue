<template>
  <div class="toast-container position-absolute pe-3 top-0 end-0" style="z-index: 1050">
    <div
      v-for="(msg, key) in messages"
      :key="key"
      class="toast show"
      role="alert"
    >
      <div class="toast-header">
        <span
          :class="`bg-${msg.style}`"
          class="p-2 rounded me-2 d-inline-block"
        ></span>
        <strong class="me-auto">{{ msg.title }}</strong>
        <button
          type="button"
          class="btn-close"
          @click="clearToast"
          aria-label="Close"
        ></button>
      </div>
      <div class="toast-body" v-if="msg.content">
        {{ msg.content }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
    };
  },
  inject: ['emitter'],
  methods: {
    toastShow() {
      setTimeout(() => {
        this.messages.shift();
      }, 6000);
    },
    clearToast() {
      this.messages.shift();
    },
  },
  mounted() {
    this.emitter.on('push-message', (message) => {
      const { style = 'success', title, content } = message;
      this.messages.push({ style, title, content });
      this.toastShow();
    });
  },
};
</script>
