<script setup>
import VerticalNavSectionTitle from "@/@layouts/components/VerticalNavSectionTitle.vue";
import { useUsuarioStore } from "@/stores/UsuarioStore";
import upgradeBannerDark from "@images/pro/upgrade-banner-dark.png";
import upgradeBannerLight from "@images/pro/upgrade-banner-light.png";
import VerticalNavLayout from "@layouts/components/VerticalNavLayout.vue";
import VerticalNavLink from "@layouts/components/VerticalNavLink.vue";
import { useTheme } from "vuetify";
// Components
import Footer from "@/layouts/components/Footer.vue";
import NavbarThemeSwitcher from "@/layouts/components/NavbarThemeSwitcher.vue";
import UserProfile from "@/layouts/components/UserProfile.vue";

import { onMounted } from "vue";
const user = useUsuarioStore();

onMounted(() => {
  user.UsuarioPerfil();
});
const vuetifyTheme = useTheme();

const upgradeBanner = computed(() => {
  return vuetifyTheme.global.name.value === "light"
    ? upgradeBannerLight
    : upgradeBannerDark;
});
</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon icon="bx-menu" />
        </IconBtn>

        <!-- 👉 Search -->
        <div
          class="d-flex align-center cursor-pointer"
          style="user-select: none"
        ></div>

        <VSpacer />

        <IconBtn class="me-2">
          <VIcon icon="bx-bell" />
        </IconBtn>

        <NavbarThemeSwitcher class="me-2" />

        <UserProfile />
      </div>
    </template>

    <template #vertical-nav-content>
      <VerticalNavLink
        :item="{
          title: 'Dashboard',
          icon: 'bx-home',
          to: '/dashboard',
        }"
      />

      <VerticalNavSectionTitle
        :item="{
          heading: 'Imoveis',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Listar imoveis',
          icon: 'bx-log-in',
          to: '/imoveis/listar',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Cadastrar imoveis',
          icon: 'mdi-plus',
          to: '/imoveis/cadastro',
        }"
      />



      <VerticalNavSectionTitle
        :item="{
          heading: 'Site',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Listar postagens',
          icon: 'mdi-list-box-outline',
          to: '/blogs/listar',
        }"
      />

      <VerticalNavLink
        :item="{
          title: 'Cadastrar postagem',
          icon: 'mdi-post',
          to: '/blog/cadastro',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Pagina sobre',
          icon: 'mdi-information-outline',
          to: '/sobre/edicao',
        }"
      />

      <VerticalNavSectionTitle
        :item="{
          heading: 'Empresa',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Informações da empresa',
          icon: 'mdi-domain',
          to: '/empresa',
        }"
      />

      <VerticalNavLink
        v-if="user.perfil.is_master"
        :item="{
          title: 'Cadastro de empresa',
          icon: 'mdi-office-building-plus-outline',
          to: '/empresa/cadastro',
        }"
      />

      <!-- 👉 Pages -->
      <!-- <VerticalNavSectionTitle
        :item="{
          heading: 'Pages',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Login',
          icon: 'bx-log-in',
          to: '/login',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Register',
          icon: 'bx-user-plus',
          to: '/',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Error',
          icon: 'bx-info-circle',
          to: '/no-existence',
        }"
      /> -->
      <VerticalNavSectionTitle
        :item="{
          heading: 'Usuários',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Listar usuarios',
          icon: 'mdi-account-details-outline',
          to: '/usuarios/listar',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Cadastrar usuarios',
          icon: 'bx-user-plus',
          to: '/register',
        }"
      />

    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}
</style>
