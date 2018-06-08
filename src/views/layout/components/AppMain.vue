<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <!-- <keep-alive>
        <router-view :key="key" v-if="!$route.meta.noCache"></router-view>
      </keep-alive>
      <router-view :key="key" v-if="$route.meta.noCache"></router-view> -->
      <router-view></router-view>
    </transition>
  </section>
</template>
<script>
export default {
  name: 'AppMain',
  computed: {
    // key() {
    //   var key = this.$route.name;
    //   for (var k in this.$route.params) {
    //     key += '/' + k + '=' + this.$route.params[k];
    //   }
    //   return key;
    //   // return this.$router.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date();
    // }
  }
}

</script>
