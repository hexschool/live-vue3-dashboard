<template>
  <div>
    <Loading :active="isLoading"></Loading>
    <div class="text-end mt-4">
      <button class="btn btn-primary"
              @click="openModal(true)">
        建立新的頁面
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>標題</th>
          <th>作者</th>
          <th>描述</th>
          <th>建立時間</th>
          <th>是否公開</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td>{{ article.title }}</td>
          <td>{{ article.author }}</td>
          <td>{{ article.description }}</td>
          <td>{{ article.create_at}}</td>
          <td>
            <span v-if="article.isPublic">已上架</span>
            <span v-else>未上架</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm"
                      @click="openModal(false, article)">編輯</button>
              <button class="btn btn-outline-danger btn-sm"
                      @click="openDelArticleModal(article)"
              >刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <ArticleModal ref="articleModal"
                  :article="tempArticle" @update-article="updateArticle"></ArticleModal>
    <DelModal :item="tempArticle" ref="delModal" @del-item="delArticle"/>
  </div>
</template>

<script>
import ArticleModal from '@/components/ArticleModal.vue';
import DelModal from '@/components/DelModal.vue';

export default {
  data() {
    return {
      articles: [],
      isLoading: false,
      isNew: false,
      tempArticle: {},
    };
  },
  inject: ['emitter'],
  components: {
    ArticleModal,
    DelModal,
  },
  methods: {
    getArticles(page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}`;
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
    openModal(isNew, item) {
      if (isNew) {
        this.tempArticle = {
          is_public: false,
          create_at: new Date().getTime() / 1000,
          tag: [],
        };
        this.isNew = true;
      } else {
        this.tempArticle = { ...item };
        this.isNew = false;
      }
      this.$refs.articleModal.openModal();
    },
    updateArticle(item) {
      this.tempArticle = item;
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article`;
      let httpMethod = 'post';
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`;
        httpMethod = 'put';
      }
      const articleComponent = this.$refs.articleModal;
      this.$http[httpMethod](api, { data: this.tempArticle }).then((response) => {
        console.log(response);
        if (response.data.success) {
          this.emitter.emit('push-message', {
            style: 'success',
            title: response.data.message,
          });
          articleComponent.hideModal();
          this.getArticles();
        } else {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '更新文章失敗',
            content: response.data.message.join('、'),
          });
          articleComponent.hideModal();
          this.getArticles();
        }
      });
    },
    openDelArticleModal(item) {
      this.tempArticle = { ...item };
      console.log(this.tempArticle);
      const delComponent = this.$refs.delModal;
      delComponent.openModal();
    },
    delArticle() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`;
      this.isLoading = true;
      this.$http.delete(url).then((response) => {
        console.log(response, this.tempArticle);
        const delComponent = this.$refs.delModal;
        delComponent.hideModal();
        this.getArticles();
      });
    },
  },
  created() {
    this.getArticles();
  },
};
</script>
