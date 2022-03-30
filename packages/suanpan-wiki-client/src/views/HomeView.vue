<script lang="ts">
import { defineComponent } from 'vue';
import {listPages} from "@/services/pages";

interface Page {
  id: string;
  title: string;
}

export default defineComponent({
  data() {
    return {
      pages: [] as Array<Page>
    }
  },
  mounted() {
    listPages().then(result => {
      this.pages = result.data.data
      console.log(this.pages)
    });
  },
})
</script>

<template>
  <main>
    <h1>文章列表</h1>
    <a-list item-layout="horizontal">
      <a-list-item v-for="page in pages" :key="page.id">{{ page.title }}</a-list-item>
    </a-list>
  </main>
</template>
