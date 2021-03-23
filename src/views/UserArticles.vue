<template>
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div class="col" v-for="article in articles" :key="article.id">
        <div class="card">
          <img :src="article.imageUrl" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">{{ article.title }}</h5>
            <div v-html="article.description"></div>
          </div>
          <div class="card-footer">
            <router-link :to="`/user/article/${article.id}`" class="btn btn-outline-primary">
              文章頁面
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
      isLoading: false,
      isNew: false,
      tempArticle: {},
    };
  },
  methods: {
    getArticles(page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/articles?page=${page}`;
      this.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        this.isLoading = false;
        if (response.data.success) {
          this.articles = response.data.articles;
          this.pagination = response.data.pagination;
        }
      });
    },
    getArticle() {
      //
    },
  },
  created() {
    this.getArticles();
  },
};
</script>
