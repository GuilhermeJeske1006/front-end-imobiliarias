<template>
    <div>
      <VRow>
        <VCol cols="12">
          <VCard title="Itens da localização do imovel">
            <VCardText>
              <!-- Formulário para adicionar cor -->
              <div class="mt-6">
  
                <VRow >
                  <VCol md="8" cols="12">
                    <VTextField
                      v-model="textInput"
                      placeholder="ex: ccreche, escola, mercado"
                      label="Item da localização"
                    />
                  </VCol>
                  <VCol md="2" cols="12">
                    <VBtn @click="addItem">+</VBtn>
                  </VCol>
                </VRow>
  
                <!-- Tabela de itens -->
                <VRow v-if="itens.length > 0">
                  <VCol md="12" cols="12">
                    <div
                      v-for="(i, index) in itens"
                      :key="index"
                      class="mb-8"
                    >
                      <VRow>
                        <VCol md="10" cols="12">
                          <VTextField
                            v-model="i.item"
                            placeholder="ex: ccreche, escola, mercado"
                            label="Item da localização"
                          />
                        </VCol>
                        <VCol md="2" cols="12">
                          <IconBtn @click="removeItem(index)">
                            <VIcon icon="bxs-trash" />
                          </IconBtn>
                        </VCol>
                      </VRow>
                    </div>
                  </VCol>
                </VRow>
  
                <VRow>
                  <VCol cols="12" class="d-flex flex-wrap gap-4">
                    <VBtn @click="next">Próximo</VBtn>
                    <VBtn color="secondary" variant="tonal" @click="pass">
                      Anterior
                    </VBtn>
                  </VCol>
                </VRow>
              </div>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        textInput: "",
        selectedColorIndex: null,
        itens: [],
      };
    },
    props: {
      items: {
        type: Array,
        default: () => [],
        required: true,
      },
    },
  
    watch: {
      items: {
        immediate: true,
        handler(value) {
          this.itens = value;
        },
      },
    },
  
    methods: {
      addItem() {
        if (this.textInput.trim() !== "") {
          this.itens.push({ item: this.textInput });
          this.textInput = "";
        } else {
          alert("Por favor, insira um item.");
        }
      },
      pass() {
        this.$emit("pass", "security");
      },
      next() {
        this.$emit("next", "site");
        this.$emit("update:items", this.itens);
      },
      removeItem(index) {
        this.itens.splice(index, 1);
        if (this.selectedColorIndex === index) {
          this.selectedColorIndex = null;
        } else if (this.selectedColorIndex > index) {
          this.selectedColorIndex--;
        }
      },

    },
  };
  </script>
  