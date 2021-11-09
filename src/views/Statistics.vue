<template>

  <div class="nav-wrapper">
    <div class="content">
      <p>Statistics.vue</p>

    </div>
    <Nav/>
  </div>
</template>

<script>

export default {
  name: "statistics",
}
</script>

<style lang="scss" scoped>
.nav-wrapper {
  border: 2px solid blue;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  border: 1px solid purple;
  overflow: auto;
  flex-grow: 1;
}
</style>