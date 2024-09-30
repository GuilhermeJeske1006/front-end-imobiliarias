<script setup>
import loading from "@/components/geral/LoadingOverlay.vue";
import UploadImage from "@/components/geral/UploadImage.vue";
import { useSobreStore } from "@/stores/SobreStore";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const activeTab = ref(route.params.tab);
const editor = ref(ClassicEditor);
const sobre = useSobreStore();
const edicao = ref({
  titulo: sobre.edicao.titulo,
  texto: sobre.edicao.texto,
  foto: sobre.edicao.foto,
});

const isValid = ref(false);
const tituloRule = [(v) => !!v || "O campo título é obrigatório"];

const submit = () => {
  if (isValid.value) {
    const data = {
      titulo: edicao.value.titulo,
      texto: edicao.value.texto,
      foto: edicao.value.foto,
    };
    sobre.SobreEditar(data);
  }
};

const refForm = ref(null);

onMounted(() => {
  sobre.SobreMostrar();
});

watch(
  edicao,
  (newValue) => {
    sobre.edicao.titulo = newValue.titulo;
    sobre.edicao.texto = newValue.texto;
    sobre.edicao.foto = newValue.foto;
  },
  { deep: true }
);
</script>

<template>
  <div>
    <loading :is-loading="sobre.isLoading" />

    <VDivider />

    <VWindow v-model="activeTab" class="mt-5 disable-tab-transition">
      <!-- Account -->
      <VWindow value="account">
        <VRow>
          <VCol cols="12">
            <VCard title="Edicao de sobre">
              <UploadImage :items="edicao" />

              <VDivider />

              <VCardText>
                <!-- 👉 Form -->
                <VForm
                  class="mt-6"
                  ref="refForm"
                  v-model="isValid"
                  @submit.prevent="submit"
                >
                  <VRow>
                    <!-- 👉 First Name -->
                    <VCol md="12" cols="12">
                      <VTextField
                        v-model="edicao.titulo"
                        :rules="tituloRule"
                        placeholder="Ex: sobre teste"
                        label="Titulo do sobre"
                      />
                    </VCol>

                    <!-- 👉 Last Name -->
                    <VCol md="12" cols="12">
                      <ckeditor
                        :editor="editor"
                        v-model="edicao.texto"
                      ></ckeditor>
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
