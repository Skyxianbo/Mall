<template>
  <div id="app">
    <app-header></app-header>
    <navbar></navbar>
    <tags-view></tags-view>
    <keep-alive>
      <router-view :key="key" v-if="!$route.meta.noCache"></router-view>
    </keep-alive>
    <router-view :key="key" v-if="$route.meta.noCache"></router-view>
    <app-footer></app-footer>
  </div>
</template>
<script>
import { Navbar, TagsView, AppHeader, AppFooter } from '@/views/layout/components'
export default {
  name: 'app',
  components: {
    Navbar,
    TagsView,
    AppHeader,
    AppFooter
  },
  computed: {
    key() {
      var key = this.$route.name;
      for (var k in this.$route.params) {
        key += '/' + k + '=' + this.$route.params[k];
      }
      return key;
      // return this.$router.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date();
    }
  }
}

</script>
<style lang="scss">
@import '~normalize.css/normalize.css'; // normalize.css 样式格式化
@import './styles/index.scss'; // 全局自定义的css样式

</style>
