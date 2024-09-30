<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard title="Informações para o site">
          <VCardText>
            <!-- 👉 Form -->
            <VForm class="mt-6">
              <VRow>
                <VCol cols="12" md="12">
                  <h4>Informações seo (opcional)</h4>
                </VCol>

                <VCol md="8" cols="12">
                  <VTextField
                    v-model="props.item.titulo_seo"
                    placeholder="ex: titulo do imovel"
                    label="Titulo seo"
                  />
                </VCol>
                <VCol md="4" cols="12">
                  <VTextField
                    v-model="props.item.palavras_chaves"
                    placeholder="ex: imovel, casa, apartamento"
                    label="Palavras chaves do imovel"
                  />
                </VCol>
                <VCol md="12" cols="12">
                  <VTextField
                    v-model="props.item.descricao_seo"
                    placeholder="ex: descrição do imovel"
                    label="Descrição seo"
                  />
                </VCol>
               
                <VCol cols="12" md="12">
                  <h4>Configurações site</h4>
                </VCol>
                <!-- 👉 First Name -->
                <VCol md="6" cols="12">
                  <v-switch
                    v-model="props.item.ir_para_site"
                    label="Ir para o site"
                  ></v-switch>
                </VCol>
                <VCol md="6" cols="12">
                  <v-switch
                    v-model="props.item.destaque"
                    label="Produto em destaque"
                  ></v-switch>
                </VCol>

                

                <VCol cols="12" class="d-flex flex-wrap gap-4">
                  <VBtn color="success" @click="submit">Salvar</VBtn>

                  <VBtn color="secondary" variant="tonal" @click="pass()">
                    Anterior
                  </VBtn>
                </VCol>

              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});


const emit = defineEmits(["pass", "submit"]);

const pass = () => {
  emit("pass", "item");
};

const submit = () => {
  emit("submit");
};
</script>
