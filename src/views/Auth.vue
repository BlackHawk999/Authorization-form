<template>
  <div class="login">
    <div class="login-wrapper">
      <div class="login-title"><h2>Login</h2></div>

      <form class="login-area" @submit.prevent="submit">
        <div class="login-input-wrapper">
          <input
            v-model="form.email"
            class="login-input"
            type="email"
            placeholder="E-mail"
            :disabled="status !== 'checking'"
            required
          />
          <p
            class="login-input__error"
            v-for="error in errors.email"
            :key="error"
          >
            {{ error }}
          </p>
        </div>
        <div v-if="this.status === 'sign-up'" class="login-input-wrapper">
          <input
            v-model="form.name"
            class="login-input"
            type="text"
            placeholder="Full Name"
            required
          />
        </div>
        <div v-if="this.status === 'sign-up'" class="login-input-wrapper">
          <input
            v-model="form.phone"
            class="login-input"
            type="text"
            placeholder="Phone"
            required
          />
        </div>
        <div v-if="this.status !== 'checking'" class="login-input-wrapper">
          <input
            v-model="form.password"
            class="login-input"
            type="password"
            placeholder="Password"
            required
          />
          <p
            class="login-input__error"
            v-for="error in errors.password"
            :key="error"
          >
            {{ error }}
          </p>
        </div>
        <button type="submit">{{ buttonText }}</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "login",
  data() {
    return {
      status: "checking",
      form: {
        email: "",
        name: "",
        phone: "",
        password: "",
      },
      errors: {
        email: [],
        password: [],
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
      registerUser: "registerUser",
      loginUser: "login",
    }),
    submit() {
      this.errors = {
        email: [],
        password: [],
      };

      switch (this.status) {
        case "checking":
          this.check(this.form);
          break;
        case "sign-in":
          this.login(this.form);
          break;
        case "sign-up":
          this.register(this.form);
          break;
      }
    },
    async check({ email }) {
      if (!email) return;

      try {
        const res = await this.checkEmail(email);

        if (+res) {
          this.status = "sign-in";
        } else {
          this.status = "sign-up";
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    async register({ name, phone, email, password }) {
      try {
        await this.registerUser({
          name,
          phone,
          email,
          password,
        }).then(({ success }) => {
          if (success) {
            this.status = "sign-in";
            this.form.password = "";
            this.form.name = "";
            this.form.phone = "";
          }
        });
      } catch (errors) {
        for (const key in errors) {
          this.errors[key] = errors[key];
        }
      }
    },
    async login({ email, password }) {
      try {
        await this.loginUser({ email, password }).then(() => {
          this.$router.push("/");
        });
      } catch (errors) {
        this.form.password = "";
        this.errors.password = errors;
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
    margin-bottom: 24px;

    h2 {
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      font-weight: bold;
      font-size: 44px;
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

  &-input {
    &:disabled {
      cursor: not-allowed;
    }

    &__error {
      color: red;
      font-size: 12px;
      margin-top: 10px;
      padding: 0;
    }
  }

  &-input-wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;
  }
}
</style>
