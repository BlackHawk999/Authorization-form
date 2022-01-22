<template>
  <div class="home">
    <Login />
  </div>
</template>

<script>
// @ is an alias to /src

import Login from "@/components/Login";

export default {
  name: "Home",
  components: { Login },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: #21d4fd;
  background-image: linear-gradient(19deg, #21d4fd 0%, #b721ff 100%);
}
</style>
