<template>
  <div class="home">
    <div v-if="user" class="info">
      <p class="info__item">
        Name: <span>{{ user.name }}</span>
      </p>
      <p class="info__item">
        Email: <span>{{ user.email }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  created() {
    if (!this.user) return this.$router.push("/auth");
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.info {
  display: flex;
  flex-direction: column;

  &__item {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 600;

    span {
      margin-left: 15px;
      font-weight: 400;
    }
  }
}
</style>
