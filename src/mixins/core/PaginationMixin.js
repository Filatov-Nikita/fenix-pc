export default {
  data() {
    return {
      meta: null
    }
  },
  computed: {
    nextPage() {
      if (!this.meta) return null;
      const { last_page, current_page } = this.meta;
      return current_page < last_page ? current_page + 1 : last_page;
    },
    loadedAll() {
      if (!this.meta) return false;
      return this.meta.current_page === this.meta.last_page;
    }
  }
}
