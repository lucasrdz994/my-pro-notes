<template>
  <div class="box mb-3 has-background-primary-light is-clickable" @click="POST_NOTE">
    <div class="content is-flex is-align-items-center is-justify-content-center">
      <b-icon
        type="is-primary"
        icon="plus-circle-outline"
        class="mr-2"
      ></b-icon>
      <span class="is-size-4 has-text-primary is-family-secondary">
        Agregar una nueva nota
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'BtnAddNote',
  methods: {
    ...mapActions(['POST_NOTE'])
  }
}
</script>