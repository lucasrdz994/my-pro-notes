<template>
  <section class="column" :class="[openNotesSidebar ? 'is-four-fifths' : 'is-11']">
    <div class="is-flex is-justify-content-center mt-6 no-notes">
      <div class="has-text-centered content">
        <img src="~static/bg-2.svg" width="50%" alt="">
        <h3 class="is-size-3 mt-2">Crea una nueva nota</h3>
        <p>Comienza por crear una magnifica nueva nota y verás nunca dejarás de escribir.</p>
        <b-button tag="nuxt-link" to="/notes" icon-left="pencil-outline" type="is-primary">Crear nueva nota</b-button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'NotesIndex',
  computed: {
    ...mapState(['openNotesSidebar'])
  }
}
</script>

<style>
  .no-notes {
    min-height: 100vh;
  }
</style>