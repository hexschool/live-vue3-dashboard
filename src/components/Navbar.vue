<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">香菇園</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link to="/admin/products" class="nav-link">產品</router-link>
          <router-link to="/admin/orders" class="nav-link">訂單</router-link>
          <router-link to="/admin/coupons" class="nav-link">優惠券</router-link>
          <router-link to="/admin/posts" class="nav-link">貼文</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'Navbar',
};
</script>
