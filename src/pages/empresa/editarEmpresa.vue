<script setup>
import loading from "@/components/geral/LoadingOverlay.vue";
import { useEmpresaStore } from "@/stores/EmpresaStore";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const activeTab = ref(route.params.tab);
const empresa = useEmpresaStore();

onMounted(() => {
  empresa.EmpresaListar();
});

const refInputEl = ref();
const accountDataLocal = ref(
  structuredClone(JSON.parse(JSON.stringify(empresa.item)))
);

const nomeRule = [
  (v) => !!v || "Nome da empresa é obrigatório",
  (v) =>
    (v && v.length <= 50) || "Nome da empresa deve ter no máximo 50 caracteres",
];

const emailRule = [
  (v) => !!v || "Email da empresa é obrigatório",
  (v) => /.+@.+\..+/.test(v) || "Email da empresa deve ser válido",
];

const whatsappRule = [
  (v) => v.length == 15 || "Whatsapp da empresa não tem o tamanho correto",
];

const telefoneRule = [
  (v) => v.length == 14 || "Telefone da empresa não tem o tamanho correto",
];

const cnpjRule = [
  (v) => !!v || "CNPJ da empresa é obrigatório",
  (v) => v.length == 18 || "CNPJ da empresa não tem o tamanho correto",
];

const creciRule = [(v) => !!v || "Creci da empresa é obrigatório"];

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
const numeroRule = [(v) => !!v || "Numero da empresa é obrigatório"];

const formatCNPJ = (value) => {
  value = value.replace(/\D/g, "");

  if (value.length > 2) {
    value = value.replace(/^(\d{2})(\d)/, "$1.$2");
  }
  if (value.length > 5) {
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  }
  if (value.length > 8) {
    value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
  }
  if (value.length > 12) {
    value = value.replace(/(\d{4})(\d)/, "$1-$2");
  }

  return value;
};

const formatWhatsapp = (value) => {
  const onlyNumbers = value.replace(/\D/g, "");

  if (onlyNumbers.length > 15) {
    return value.slice(0, -1);
  }

  let formattedValue = "";

  if (onlyNumbers.length > 0) {
    formattedValue = `(${onlyNumbers.substring(0, 2)}`;
  }
  if (onlyNumbers.length >= 3) {
    formattedValue += `) ${onlyNumbers.substring(2, 7)}`;
  }
  if (onlyNumbers.length >= 8) {
    formattedValue += `-${onlyNumbers.substring(7, 11)}`;
  }

  return formattedValue;
};

const formatPhone = (value) => {
  const onlyNumbers = value.replace(/\D/g, "");

  if (onlyNumbers.length > 14) {
    return value.slice(0, -1);
  }

  let formattedValue = "";

  if (onlyNumbers.length > 0) {
    formattedValue = `(${onlyNumbers.substring(0, 2)}`;
  }
  if (onlyNumbers.length >= 3) {
    formattedValue += `) ${onlyNumbers.substring(2, 6)}`;
  }
  if (onlyNumbers.length >= 7) {
    formattedValue += `-${onlyNumbers.substring(6, 10)}`;
  }

  return formattedValue;
};

const onPhoneInput = (e) => {
  empresa.item.telefone = formatPhone(e.target.value);
};

const onWhatsappInput = (e) => {
  empresa.item.whatsapp = formatWhatsapp(e.target.value);
};

const handleCNPJInput = (value) => {
  empresa.item.cnpj = formatCNPJ(value);
};

const isValid = ref(false);

const submit = () => {
  if (isValid.value) {
    empresa.EmpresaEditar(empresa.item.endereco_id);
  }
};

const changeAvatar = (event) => {
  const fileReader = new FileReader();
  const files = event.target.files;
  if (files && files.length) {
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        accountDataLocal.value.foto_capa = fileReader.result;
        empresa.item.logo = fileReader.result;
      }
    };
  }
};

// reset avatar image
const resetAvatar = () => {
  empresa.item.logo = "";
};
</script>

<template>
  <div>
    <loading :is-loading="empresa.isLoading" />

    <VDivider />

    <VWindow v-model="activeTab" class="mt-5 disable-tab-transition">
      <!-- Account -->
      <VWindowItem value="account">
        <VRow>
          <VCol cols="12">
            <VCard title="Detalhes da empresa">
              <VCardText class="d-flex">
                <!-- 👉 Avatar -->
                <VAvatar
                  rounded="lg"
                  size="100"
                  class="me-6"
                  :image="empresa.item.logo"
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
                  ref="form"
                  v-model="isValid"
                  @submit.prevent="submit"
                >
                  <VRow>
                    <VCol cols="12" md="12">
                      <h4>Informações de contato</h4>
                    </VCol>
                    <VCol md="3" cols="12">
                      <VTextField
                        v-model="empresa.item.nome"
                        placeholder="Ex: empresa teste"
                        label="Nome empresa"
                        :rules="nomeRule"
                      />
                    </VCol>

                    <VCol md="3" cols="12">
                      <VTextField
                        v-model="empresa.item.email"
                        placeholder="email@gmail.com"
                        type="email"
                        label="Email"
                        :rules="emailRule"
                      />
                    </VCol>

                    <VCol md="3" cols="12">
                      <VTextField
                        v-model="empresa.item.cnpj"
                        placeholder="00.000.000/0000-00"
                        type="text"
                        label="CNPJ"
                        @input="handleCNPJInput($event.target.value)"
                        :rules="cnpjRule"
                      />
                    </VCol>
                    <VCol md="3" cols="12">
                      <VTextField
                        v-model="empresa.item.creci"
                        placeholder="0000"
                        type="text"
                        label="Creci"
                        :rules="creciRule"
                      />
                    </VCol>

                    <VCol cols="12" md="3">
                      <VTextField
                        v-model="empresa.item.whatsapp"
                        label="Whatsapp"
                        placeholder="(99) 99999-9999"
                        @input="onWhatsappInput"
                        :rules="whatsappRule"
                        type="tel"
                      />
                    </VCol>

                    <VCol cols="12" md="3">
                      <VTextField
                        v-model="empresa.item.telefone"
                        label="Telefone"
                        placeholder="(99) 99999-9999"
                        @input="onPhoneInput"
                        :rules="telefoneRule"
                        type="tel"
                      />
                    </VCol>

                    <VCol cols="12" md="3">
                      <VTextField
                        v-model="empresa.item.instagram"
                        label="Instagram"
                        placeholder="seu instagram"
                      />
                    </VCol>

                    <VCol cols="12" md="3">
                      <VTextField
                        v-model="empresa.item.facebook"
                        label="Facebook"
                        placeholder="seu facebook"
                      />
                    </VCol>
                    <VCol cols="12" md="12">
                      <h4>Informações sobre o site</h4>
                    </VCol>

                    <VCol cols="12" md="5">
                      <VTextField
                        v-model="empresa.item.titulo"
                        label="Titulo"
                        placeholder="ex: Sua empresa - A melhor do Brasil"
                      />
                    </VCol>

                    <VCol cols="12" md="5">
                      <VTextField
                        v-model="empresa.item.palavras_chaves"
                        label="Palavras Chaves"
                        placeholder="ex: seusite; automovel; carro"
                      />
                    </VCol>

                    <VCol cols="12" md="2">
                      <VTextField
                        v-model="empresa.item.cor"
                        label="Cor do site"
                        type="color"
                      />
                    </VCol>
                    <VCol cols="12" md="6">
                      <V-textarea
                        v-model="empresa.item.descricao"
                        label="Descricao do site"
                        placeholder="ex: Seu site - o site especializado em oferecer o melhor para o seu cliente"
                      />
                    </VCol>
                    <VCol cols="12" md="6">
                      <V-textarea
                        v-model="empresa.item.scripts"
                        label="Scripts para o site"
                        placeholder="<script> </script>"
                      />
                    </VCol>
                    <VCol cols="12" md="12">
                      <h4>Informações sobre o endereco</h4>
                    </VCol>

                    <VCol cols="12" md="8">
                      <VTextField
                        v-model="empresa.item.endereco.rua"
                        label="Rua"
                        placeholder="Rua 25 de março"
                        :rules="ruaRule"
                      />
                    </VCol>

                    <VCol cols="12" md="4">
                      <VTextField
                        v-model="empresa.item.endereco.cep"
                        label="Cep"
                        :rules="cepRule"
                        @input="inputCep"
                        placeholder="ex: 88-888-888"
                      />
                    </VCol>

                    <VCol cols="12" md="4">
                      <VTextField
                        v-model="empresa.item.endereco.bairro"
                        label="Bairro"
                        placeholder="ex: São pedro"
                        :rules="bairroRule"
                      />
                    </VCol>
                    <VCol cols="12" md="4">
                      <VTextField
                        v-model="empresa.item.endereco.cidade"
                        label="Cidade"
                        :rule="cidadeRule"
                        placeholder="ex: São paulo"
                      />
                    </VCol>
                    <VCol cols="12" md="4">
                      <VTextField
                        v-model="empresa.item.endereco.pais"
                        label="Pais"
                        placeholder="ex: Brasil"
                        :rule="paisRule"
                      />
                    </VCol>
                    <VCol cols="12" md="6">
                      <VTextField
                        v-model="empresa.item.endereco.complemento"
                        label="Complemento"
                        placeholder="ex: Casa verde"
                      />
                    </VCol>
                    <VCol cols="12" md="3">
                      <VSelect
                        v-model="empresa.item.endereco.estado"
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
                        :rules="numeroRule"
                        v-model="empresa.item.endereco.numero"
                        label="Numero"
                        placeholder="ex: 10"
                      />
                    </VCol>

                    <VCol cols="12" class="d-flex flex-wrap gap-4">
                      <VBtn type="submit">Salvar</VBtn>
                    </VCol>
                  </VRow>
                </VForm>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VWindowItem>
    </VWindow>
  </div>
</template>
