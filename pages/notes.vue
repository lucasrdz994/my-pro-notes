<template>
  <section class="columns">
    <div class="column">
      <b-button type="is-text" icon-right="arrow-right" @click="setNotesSidebarState(true)">Ver notas</b-button>
    </div>

    <NotesList />

    <nuxt-child></nuxt-child>

  </section>
</template>

<script>
import Editor from '~/components/Editor'
import NotesList from '~/components/NotesList'

import { mapMutations } from 'vuex'

export default {
  name: 'Notes',
  middleware: 'auth',
  components: {
    Editor,
    NotesList
  },
  methods: {
    ...mapMutations(['setNotesSidebarState'])
  }
}
</script>
