<template>
  <section>
    
    <div class="hero is-large home-hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1">
            A simple way to write amazing notes
          </h1>
          <h2 class="subtitle is-3">
            Write more, don't pay
          </h2>
          <b-button type="is-primary" icon-left="github" tag="a" target="_blank" href="https://github.com/lucasrdz994/my-pro-notes">View on Github</b-button>
        </div>
      </div>
    </div>

    <footer class="footer">
      <div class="content has-text-centered">
      <p>
        Made with <strong>Nuxt + PHP</strong> by <a href="https://github.com/lucasrdz994">Lucas Rodríguez</a> and <a href="https://github.com/lucasrdz994">Leo Ruiz</a>.
      </p>
    </div>
  </footer>


  </section>
</template>

<script>
export default {
  name: 'Home',
  middleware: 'auth'
}
</script>

<style>
  .home-hero {
    background: url('~static/bg-hero.jpg') no-repeat;
    background-size: cover;
    background-position: center;
    box-shadow: 0 0 40px hsl(0, 0%, 86%);
  }
</style>