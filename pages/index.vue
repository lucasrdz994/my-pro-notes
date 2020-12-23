<template>
  <section class="is-flex is-justify-content-center is-align-items-center has-text-centered">
    <div class="content">
      <img src="~/static/bg-2.svg" width="50%" alt="">
      <h3 class="title mt-3">Visita la seccion de notas</h3>
      <p>Accede a la app de notas. Próximamente verás una landing page en esta ruta.</p>
      <b-button icon-left="book" type="is-primary" tag="nuxt-link" to="/notes">Ir a las notas</b-button>
    </div>

  </section>
</template>

<script>
export default {
  name: 'Home',
  middleware: 'auth'
}
</script>

<style>

</style>