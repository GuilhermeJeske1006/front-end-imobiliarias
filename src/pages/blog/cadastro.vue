<script setup>
import loading from "@/components/geral/LoadingOverlay.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useRoute } from "vue-router";

const route = useRoute();
const activeTab = ref(route.params.tab);

import { useBlogStore } from "@/stores/BlogStore";

const blog = useBlogStore();

const editor = ref(ClassicEditor);
const editorData = ref("<p>Content of the editor.</p>");

const refInputEl = ref();
const accountDataLocal = ref(
  structuredClone(JSON.parse(JSON.stringify(blog.cadastro)))
);

const tituloRule = [(v) => !!v || "O campo título é obrigatório"];

const subtituloRule = [(v) => !!v || "O campo subtitulo é obrigatório"];

const isValid = ref(false);

const error = ref({
  erroTexto: "",
});

const validateTexto = () => {
  if (blog.cadastro.texto === "") {
    error.value.erroTexto = "O campo texto é obrigatório.";
    return false;
  }
  error.value.erroTexto = "";
  return true;
};

const submit = () => {
  if (isValid.value && validateTexto()) {
    blog.BlogCadastro();
  }
};

const changeAvatar = (event) => {
  const fileReader = new FileReader();
  const files = event.target.files;
  if (files && files.length) {
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        accountDataLocal.value.foto = fileReader.result;
        blog.cadastro.foto = fileReader.result;
      }
    };
  }
};

// reset avatar image
const resetAvatar = () => {
  blog.cadastro.foto = "";
};
</script>

<template>
  <div>
    <loading :is-loading="blog.isLoading" />

    <VDivider />

    <VWindow v-model="activeTab" class="mt-5 disable-tab-transition">
      <!-- Account -->
      <VWindow value="account">
        <VRow>
          <VCol cols="12">
            <VCard title="Cadastro de blogs">
              <VCardText class="d-flex">
                <!-- 👉 Avatar -->
                <VAvatar
                  rounded="lg"
                  size="100"
                  class="me-6"
                  :image="blog.cadastro.foto"
                />

                <!-- 👉 Upload Photo -->
                <form class="d-flex flex-column justify-center gap-5">
                  <div class="d-flex flex-wrap gap-2">
                    <VBtn color="primary" @click="refInputEl?.click()">
                      <VIcon icon="bx-cloud-upload" class="d-sm-none" />
                      <span class="d-none d-sm-block">Carregar nova foto</span>
                    </VBtn>

                    <input
                      ref="refInputEl"
                      type="file"
                      name="file"
                      accept=".jpeg,.png,.jpg,GIF"
                      hidden
                      @input="changeAvatar"
                    />

                    <VBtn
                      type="reset"
                      color="error"
                      variant="tonal"
                      @click="resetAvatar"
                    >
                      <span class="d-none d-sm-block">Remover</span>
                      <VIcon icon="bx-refresh" class="d-sm-none" />
                    </VBtn>
                  </div>

                  <p class="text-body-1 mb-0">
                    JPG, GIF ou PNG permitidos. Tamanho máximo de 800K
                  </p>
                </form>
              </VCardText>

              <VDivider />

              <VCardText>
                <!-- 👉 Form -->
                <VForm
                  class="mt-6"
                  ref="formRef"
                  v-model="isValid"
                  @submit.prevent="submit"
                >
                  <VRow>
                    <!-- 👉 First Name -->
                    <VCol md="12" cols="12">
                      <VTextField
                        v-model="blog.cadastro.titulo"
                        placeholder="Ex: blog teste"
                        label="Titulo do blog"
                        :rules="tituloRule"
                      />
                    </VCol>
                    <VCol md="12" cols="12">
                      <V-textarea
                        v-model="blog.cadastro.subtitulo"
                        placeholder="Ex: blog teste"
                        label="Subtitulo do blog"
                        :rules="subtituloRule"
                      />
                    </VCol>

                    <!-- 👉 Last Name -->
                    <VCol md="12" cols="12">
                      <ckeditor
                        :editor="editor"
                        v-model="blog.cadastro.texto"
                      ></ckeditor>
                      <p
                        style="color: red; font-size: small"
                        v-if="error.erroTexto"
                      >
                        {{ error.erroTexto }}
                      </p>
                    </VCol>

                    <!-- 👉 Form Actions -->
                    <VCol cols="12" class="d-flex flex-wrap gap-4">
                      <VBtn type="submit">Salvar</VBtn>
                    </VCol>
                  </VRow>
                </VForm>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VWindow>
    </VWindow>
  </div>
</template>
