<template>
  <header class="header">
    <img src="https://lineten.com/wp-content/uploads/2021/11/lineten-logo-CROPPED.png" alt="Line Ten logo">
    <p>Rota</p>
  </header>
</template>

<script lang="ts">
export default {}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
.header {
    position: fixed;
    padding: 50px;
    display: flex;
    align-items: center;
    gap: 5px;
    background: #fff;
    z-index: 1;
    width: 100%;
    @media screen and (max-width: 768px) {
      padding: 20px;
    }
    img {
        width: 100px;
    }
    p {
        font-family: 'Dancing Script', cursive;
        font-weight: 700;
        font-size: 24px;
    }
}
</style>