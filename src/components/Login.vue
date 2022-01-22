<template>
  <div class="login">
    <div class="login-wrapper">
      <div class="login-title"><h2>Login</h2></div>
      <form class="login-area" @submit.prevent="submit">
        <input
          v-model="form.email"
          type="email"
          name=""
          id=""
          placeholder="E-mail"
        />
        <input
          v-if="this.status === 'sign-up'"
          type="text"
          name=""
          id=""
          placeholder="Full Name"
        />
        <input
          v-if="this.status === 'sign-up'"
          type="number"
          name=""
          id=""
          required
          placeholder="Phone"
        />
        <input
          v-if="this.status !== 'checking'"
          type="password"
          name=""
          id=""
          placeholder="Password"
        />
        <button type="submit">{{ buttonText }}</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "login",
  data() {
    return {
      status: "checking",
      form: {
        email: "",
        fullName: "",
        phone: "",
        password: "",
      },
    };
  },
  computed: {
    buttonText() {
      let res = "Продолжить";

      switch (this.status) {
        case "sign-in":
          res = "Войти";
          break;
        case "sign-up":
          res = "Региистрироватся";
          break;
      }

      return res;
    },
  },
  methods: {
    ...mapActions({
      checkEmail: "checkEmail",
    }),
    submit() {
      switch (this.status) {
        case "checking":
          this.check(this.form);

          break;

        case "sign-in":
          break;
        case "sign-up":
          break;
      }
    },
    async check({ email }) {
      if (!email) return;
      const res = await this.checkEmail(email);

      if (+res) {
        this.status = "sign-in";
      } else {
        this.status = "sign-up";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 500px;
  max-width: 500px;
  max-height: 85vh;
  overflow: hidden auto;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 1);
  transform: translate(-50%, -50%);

  &-title {
    h2 {
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      font-weight: bold;
      font-size: 44px;
      line-height: 53px;
      color: rgba(16, 66, 157, 1);
      text-align: center;
    }
  }

  &-area {
    display: flex;
    flex-direction: column;

    input {
      font-weight: 500;
      font-size: 15px;
      border: 2px solid #003c60;
      box-sizing: border-box;
      border-radius: 10px;
      outline: none;
      padding: 12px;
      margin-bottom: 25px;
    }

    button {
      font-weight: 500;
      font-size: 15px;
      line-height: 18px;
      color: #ffffff;
      background-image: linear-gradient(
        to right,
        #052637,
        #003c60,
        #00528d,
        #0068bc,
        #127ceb
      );
      border: none;
      border-radius: 20px;
      margin-bottom: 25px;
      padding: 12px 60px 12px 60px;
      cursor: pointer;
    }
  }
}
</style>
