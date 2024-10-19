<script setup>
import logo from "@/assets/images/logo.png";
import loading from "@/components/geral/LoadingOverlay.vue";
import { useUsuarioStore } from "@/stores/UsuarioStore";
import { ref } from "vue";

const User = useUsuarioStore();
const isPasswordVisible = ref(false);

const emailRule = [
  (v) => !!v || "Email é obrigatório",
  (v) => /.+@.+\..+/.test(v) || "Email deve ser válido",
];

const isFormValid = ref(false)

const submit = () => {
  if(isFormValid.value) {
    User.UsuarioLogin()
  }
}
</script>

<template>
  <loading :is-loading="User.isLoading" />

  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" max-width="448">
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex justify-center">
            <img class=" w-50  d-flex"  :src="logo" />
            <!-- <div class="d-flex text-primary" v-html="logo" /> -->
          </div>
        </template>

        <!-- <VCardTitle class="text-2xl font-weight-bold"> AutoCar </VCardTitle> -->
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">Seja bem vindo!</h5>
        <p class="mb-0">Por favor, entre na sua conta e comece a aventura</p>
      </VCardText>

      <VCardText>
        <VForm ref="form" v-model="isFormValid" @submit.prevent="submit()">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="User.email"
                autofocus
                placeholder="johndoe@email.com"
                label="Email"
                type="email"
                :rules="emailRule"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="User.senha"
                label="Password"
                :rules="[(v) => !!v || 'Password é obrigatório']"
                placeholder=""
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <!-- remember me checkbox -->
              <div
                class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4"
              >
                <VCheckbox v-model="User.remember" label="Lembrar-me" />
              </div>

              <!-- login button -->
              <VBtn block type="submit"> Entrar </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
