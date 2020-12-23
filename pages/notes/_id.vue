<template>
  <Editor v-if="singleNote" :singleNote="singleNote" />
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['notes']),
    singleNote() {
      return this.notes.find(el => el.id === this.$route.params.id)
    }
  }
}
</script>