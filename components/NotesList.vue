<template>
  <b-sidebar
    type="is-light"
    :fullheight="fullheight"
    :fullwidth="fullwidth"
    :overlay="overlay"
    :right="right"
    :mobile="mobile"
    :can-cancel="canCancel"
    v-model="open"
  >
    <div class="notes-list">
      <div class="is-flex is-justify-content-space-between is-align-items-center py-5">
        <span class="is-uppercase is-size-5">Mis notas</span>
        <b-button type="is-text" @click="open = false" icon-right="arrow-left" size="is-medium"></b-button>
      </div>
      <BtnAddNote />
      <nuxt-link 
        :to="`/notes/${note.id}`" 
        v-for="note in notes" 
        :key="note.id"
        :event="note.id === $route.params.id ? '' : 'click'"
      >
        <div class="box mb-3" :class="[note.id === $route.params.id ? 'opened': '']">
          <div class="content">
            <p class="is-size-4 is-family-secondary">
              {{ note.title.length > 30 ? note.title.substr(0, 30) + '...' : note.title }}
            </p>
            <p class="is-size-6 has-text-weight-light">
              {{ new Date(Number(note.created_at)).toLocaleString() }}
            </p>
          </div>
        </div>
      </nuxt-link>
    </div>
  </b-sidebar>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'NotesList',
  data() {
    return {
      overlay: false,
      fullheight: true,
      fullwidth: false,
      right: false,
      canCancel: false,
      mobile: 'fullwidth'
    }
  },
  computed: {
    ...mapState(['openNotesSidebar', 'notes']),
    open: {
      get() {
        return this.openNotesSidebar
      },
      set(val) {
        return this.setNotesSidebarState(val)
      }
    }
  },
  methods: {
    ...mapMutations(['setNotesSidebarState'])
  },
  async fetch() {
    const notesList = await this.$axios.$get('/api/notes')
    this.$nuxt.context.store.commit('getNotes', notesList)
  }
}
</script>

<style lang="scss">
  .notes-list {
    padding: 0 20px;
  }
  .opened {
    border-left: 3px solid hsl(171, 100%, 41%);
  }
</style>