<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard title="Informações basicas">
          <VCardText class="d-flex">
            <!-- 👉 Avatar -->
            <VAvatar
              rounded="lg"
              size="100"
              class="me-6"
              :image="props.item.foto"
            />

            <!-- 👉 Upload Photo -->
            <form
              enctype="multipart/form-data"
              class="d-flex flex-column justify-center gap-5"
            >
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
              ref="form"
              v-model="isValid"
              @submit.prevent="next"
              class="mt-6"
            >
              <VRow>
                <VCol cols="12" md="12">
                  <h4>Informações iniciais</h4>
                </VCol>
                <!-- 👉 First Name -->
                <VCol md="8" cols="12">
                  <VTextField
                    v-model="item.titulo"
                    placeholder="ex: Casa na praia"
                    label="Titulo do imovel"
                    :rules="[nomeRule]"
                  />
                </VCol>

                <!-- 👉 Email -->
                <VCol cols="12" md="4">
                  <VSelect
                    v-model="item.categoria_id"
                    label="Categoria"
                    :items="props.categoria"
                    item-title="nome_categoria"
                    item-value="id"
                    placeholder="Selecione a categoria"
                    :rules="[categoriaRule]"
                  />
                </VCol>
                <VCol md="2" cols="12" >
                  <v-checkbox v-model="item.apartir_de" label="A partir de"></v-checkbox>
                  <v-checkbox v-model="item.consultar" label="Consulte"></v-checkbox>

                </VCol>
                
                <VCol md="4" cols="12">
                  <VTextField
                  :disabled="item.consultar"
                    v-model="item.valor"
                    placeholder="R$ "
                    label="Valor do imovel"
                    @input="formatValor"
                    :rules="[valorRule]"
                  />
                </VCol>

                <!-- 👉 Phone -->
                <VCol cols="12" md="3">
                  <VSelect
                    v-model="item.negociacao_id"
                    label="Negociação"
                    :items="props.negociacao"
                    item-title="nome_negociacao"
                    item-value="id"
                    placeholder="Selecione a negociação"
                    :rules="[negociacaoRule]"
                  />
                </VCol>

                <VCol md="3" cols="12">
                  <VTextField
                    v-model="item.dormitorios"
                    placeholder="ex: 1, 2"
                    label="Dormitorios"
                    :rules="[dormitorioRule]"
                  />
                </VCol>

                <!-- 👉 Address -->
                <VCol md="4" cols="12">
                  <VTextField
                    v-model="item.garagem"
                    placeholder="ex: 1, 2"
                    label="Garagem"
                    :rules="[garagemRule]"
                  />
                </VCol>
                <VCol md="4" cols="12">
                  <VTextField
                    v-model="item.suites"
                    placeholder="ex: 1, 2"
                    label="Suites"
                    :rules="[suiteRule]"
                  />
                </VCol>
                <VCol md="4" cols="12">
                  <VTextField
                    v-model="item.banheiros"
                    placeholder="ex: 1, 2"
                    label="Banheiros"
                    :rules="[banheiroRule]"
                  />
                </VCol>

                <VCol cols="12" md="12">
                  <h4>Informações sobre a area</h4>
                </VCol>

                <VCol md="3" cols="12">
                  <VTextField
                    v-model="item.area_privativa"
                    placeholder="ex: 5, 2"
                    label="Area privativa"
                    :rules="[areaPrivativaRule]"
                  />
                </VCol>
                <VCol md="3" cols="12">
                  <VTextField
                    v-model="item.area_util"
                    placeholder="ex: 4, 5"
                    label="Area util"
                    :rules="[areaUtilRule]"
                  />
                </VCol>
                <VCol md="3" cols="12">
                  <VTextField
                    v-model="item.area_quadrada"
                    placeholder="ex: 4, 5"
                    label="Area quadrada"
                    :rules="[areaQuadradaRule]"
                  />
                </VCol>
                <VCol md="3" cols="12">
                  <VTextField
                    v-model="item.area_total"
                    placeholder="ex: 4, 5"
                    label="Area total"
                    :rules="[areaTotalRule]"
                  />
                </VCol>

                <VCol cols="12" md="12">
                  <h4>Informações sobre o endereço</h4>
                </VCol>

                <VCol cols="12" md="8">
                  <VTextField
                    v-model="item.endereco.rua"
                    label="Rua"
                    placeholder="Rua 25 de março"
                    :rules="ruaRule"
                  />
                </VCol>

                <VCol cols="12" md="4">
                  <VTextField
                    v-model="item.endereco.cep"
                    label="Cep"
                    :rules="cepRule"
                    placeholder="ex: 88-888-888"
                  />
                </VCol>

                <VCol cols="12" md="4">
                  <VTextField
                    v-model="item.endereco.bairro"
                    label="Bairro"
                    placeholder="ex: São pedro"
                    :rules="bairroRule"
                  />
                </VCol>
                <VCol cols="12" md="4">
                  <VTextField
                    v-model="item.endereco.cidade"
                    label="Cidade"
                    placeholder="ex: São paulo"
                    :rules="cidadeRule"
                  />
                </VCol>
                <VCol cols="12" md="4">
                  <VTextField
                    v-model="item.endereco.pais"
                    label="Pais"
                    placeholder="ex: Brasil"
                    :rules="paisRule"
                  />
                </VCol>
                <VCol cols="12" md="6">
                  <VTextField
                    v-model="item.endereco.complemento"
                    label="Complemento"
                    placeholder="ex: Casa verde"
                  />
                </VCol>
                <VCol cols="12" md="3">
                  <VSelect
                    v-model="item.endereco.estado"
                    label="Estado"
                    :items="[
                      'AC',
                      'AL',
                      'AP',
                      'AM',
                      'BA',
                      'CE',
                      'DF',
                      'ES',
                      'GO',
                      'MA',
                      'MT',
                      'MS',
                      'MG',
                      'PA',
                      'PB',
                      'PR',
                      'PE',
                      'PI',
                      'RJ',
                      'RN',
                      'RS',
                      'RO',
                      'RR',
                      'SC',
                      'SP',
                      'SE',
                      'TO',
                    ]"
                    :rules="estadoRule"
                    placeholder="Selecione o seu estado"
                  />
                </VCol>
                <VCol cols="12" md="3">
                  <VTextField
                    :rules="[numeroRule]"
                    v-model="item.endereco.numero"
                    label="Numero"
                    placeholder="ex: 10"
                  />
                </VCol>

                <VCol cols="12" md="12">
                  <h4>Outros</h4>
                </VCol>
                <VCol cols="12" md="12">
                  <VTextField
                    v-model="item.video"
                    label="Link do video"
                    placeholder="https://www.youtube.com/watch?v=video"
                  />
                </VCol>
                <VCol md="12" cols="12">
                  <ckeditor
                    :editor="editor"
                    v-model="item.descricao"
                  ></ckeditor>
                </VCol>
                <!-- 👉 Form Actions -->
                <VCol cols="12" class="d-flex flex-wrap gap-4">
                  <VBtn :disabled="!isValid" type="submit">Proximo</VBtn>
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
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { defineEmits, defineProps, ref, watch } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  categoria: {
    type: Object,
    required: true,
  },
  negociacao: {
    type: Object,
    required: true,
  },
});

const isValid = ref(false);

const refInputEl = ref();
const accountDataLocal = ref(
  structuredClone(JSON.parse(JSON.stringify(props.item)))
);
const editor = ref(ClassicEditor);

const formatValor = (event) => {
  let value = event.target.value.replace(/\D/g, "");
  value = (value / 100).toFixed(2) + "";
  value = value.replace(".", ",");
  value = value.replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
  props.item.valor = "R$ " + value;
};

const changeAvatar = (event) => {
  const fileReader = new FileReader();
  const files = event.target.files;
  if (files && files.length) {
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        accountDataLocal.value.foto = fileReader.result;
        props.item.foto = fileReader.result;
      }
    };
  }
};
// reset avatar image
const resetAvatar = () => {
  props.item.foto = "";
};

watch(() => props.item.apartir_de, (value) => {
  if (value) {
    props.item.consultar = false;
  }
});

watch(() => props.item.consultar, (value) => {
  if (value) {
    props.item.apartir_de = false;
  }
});


const nomeRule = (value) => {
  if (value.length > 0) {
    return true;
  }
  return "Preencha o campo nome";
};

const valorRule = (value) => {
  if(props.item.consulte){
    return true;
  }
  const currencyPattern = /^R\$\s?\d+(\.\d{3})*,\d{2}$/;
  if (currencyPattern.test(value)) {
    return true;
  }
  return "Valor deve estar no formato correto, ex: R$ 123,45";
};

const categoriaRule = (value) => {
  if (value !== null) {
    return true;
  }
  return "Selecione a categoria";
};

const numeroRule = (value) => {
  const numberPattern = /^[1-9][0-9]*$/;
  if (numberPattern.test(value)) {
    return true;
  }
  return "Número deve ser um número inteiro, ex: 1, 2";
};

const negociacaoRule = (value) => {
  if (value !== null) {
    return true;
  }
  return "Selecione a negociação";
};


const dormitorioRule = (value) => {
  if (!value) {
    return true; 
  }
  const numberPattern = /^[1-9][0-9]*$/;
  if (numberPattern.test(value)) {
    return true;
  }
  return "Dormitório deve ser um número inteiro, ex: 1, 2";
};

const banheiroRule = (value) => {
  if (!value) {
    return true; 
  }
  const numberPattern = /^[1-9][0-9]*$/;
  if (numberPattern.test(value)) {
    return true;
  }
  return "Banheiro deve ser um número inteiro, ex: 1, 2";
};

const suiteRule = (value) => {
  if (!value) {
    return true; 
  }
  const numberPattern = /^[1-9][0-9]*$/;
  if (numberPattern.test(value)) {
    return true;
  }
  return "Suite deve ser um número inteiro, ex: 1, 2";
};

const garagemRule = (value) => {
  if (!value) {
    return true; 
  }
  const numberPattern = /^[1-9][0-9]*$/;
  if (numberPattern.test(value)) {
    return true;
  }
  return "Garagem deve ser um número inteiro, ex: 1, 2";
};


const areaPrivativaRule = (value) => {
  if (!value) {
    return true; 
  }
  const numberPattern = /^[1-9]\d*(\.\d+)?$/;
  if (numberPattern.test(value)) {
    return true;
  }
  return "Área deve ser um número válido, ex: 10, 20.5";
};

const areaUtilRule = (value) => {
  if (!value) {
    return true; 
  }
  const numberPattern = /^[1-9]\d*(\.\d+)?$/;
  if (numberPattern.test(value)) {
    return true;
  }
  return "Área deve ser um número válido, ex: 10, 20.5";
};

const areaQuadradaRule = (value) => {
  if (!value) {
    return true; 
  }
  const numberPattern = /^[1-9]\d*(\.\d+)?$/;
  if (numberPattern.test(value)) {
    return true;
  }
  return "Área deve ser um número válido, ex: 10, 20.5";
};

const areaTotalRule = (value) => {
  if (!value) {
    return true; 
  }
  const numberPattern = /^[1-9]\d*(\.\d+)?$/;
  if (numberPattern.test(value)) {
    return true;
  }
  return "Área deve ser um número válido, ex: 10, 20.5";
};



const ruaRule = [(v) => !!v || "Rua da empresa é obrigatório"];

const bairroRule = [(v) => !!v || "Bairro da empresa é obrigatório"];
const cidadeRule = [(v) => !!v || "Cidade da empresa é obrigatório"];
const paisRule = [(v) => !!v || "Pais da empresa é obrigatório"];

const cepRule = [
  (v) => !!v || "CEP é obrigatório",
  (v) => v.length <= 9 || "CEP não tem o tamanho correto",
  (v) => v.length >= 8 || "CEP não tem o tamanho correto",
];

const estadoRule = [(v) => !!v || "Estado da empresa é obrigatório"];

const emit = defineEmits(["next"]);

const next = () => {
  emit("next", "security");
  
};
</script>
