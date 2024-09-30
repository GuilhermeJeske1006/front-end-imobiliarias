<script setup>
import loading from "@/components/geral/LoadingOverlay.vue";
import { useEmpresaStore } from "@/stores/EmpresaStore";
import { useUsuarioStore } from "@/stores/UsuarioStore";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";


const route = useRoute();
const activeTab = ref(route.params.tab);
const isCurrentPasswordVisible = ref(false);


const empresa = useEmpresaStore();
const usuario = useUsuarioStore();
const isFormValid = ref(false);
const refInputEl = ref();

const erroNewPassword = reactive({
  erroMinimo: "A senha deve ter pelo menos 8 caracteres",
  erroMinusculo: "A senha deve conter pelo menos um caractere Maiusculo",
  erroSimbolo:
    "A senha deve conter pelo menos um número, símbolo ou caractere de espaço",
  erro: "",
});

const cadastro = ref({
  logo: "",
  cnpj: "",
  creci: "",
  nome: "",
  email: "",
  whatsapp: "",
  telefone: "",
  instagram: "",
  facebook: "",
  titulo: "",
  palavras_chaves: "",
  cor: "",
  descricao: "",
  endereco: {
    rua: "",
    cep: "",
    bairro: "",
    cidade: "",
    pais: "",
    complemento: "",
    estado: "",
    numero: "",
  },
  usuario: {
    foto: "",
    nome: "",
    email: "",
    password: "",
    telefone: "",
    tipo_usuario_id: "",
    creci: "",
  }

});

onMounted(() => {
  usuario.TipoUsuario();
});

const tipoUsuario = computed(() => {
  let result = [];
  if (Array.isArray(usuario.tipoUsuario)) {
    result = usuario.tipoUsuario.map((element) => {
      if (element.id == 2) {
        return { nome_tipo: element.tipo, id: element.id, disabled: true };
      }
      return { nome_tipo: element.tipo, id: element.id };
    });
  }
  return result;
});


const validatePassword = () => {
  // Check if usuario exists and has a password field
  if (cadastro.value.usuario && cadastro.value.usuario.password) {
    // Verifica se a senha tem pelo menos 8 caracteres
    if (cadastro.value.usuario.password.length >= 8) {
      erroNewPassword.erroMinimo = "";
    } else {
      erroNewPassword.erroMinimo = "A senha deve ter pelo menos 8 caracteres";
    }

    // Verifica se a senha tem pelo menos uma letra maiúscula
    if (/[A-Z]/.test(cadastro.value.usuario.password)) {
      erroNewPassword.erroMinusculo = "";
    } else {
      erroNewPassword.erroMinusculo =
        "A senha deve conter pelo menos um caractere Maiúsculo";
    }

    // Verifica se a senha tem pelo menos um número, símbolo ou caractere de espaço em branco
    if (/[0-9!@#$%^&*()\s]/.test(cadastro.value.usuario.password)) {
      erroNewPassword.erroSimbolo = "";
    } else {
      erroNewPassword.erroSimbolo =
        "A senha deve conter pelo menos um número, símbolo ou caractere de espaço.";
    }
  } else {
    // Handle the case where cadastro.usuario or password is undefined
    console.error("Usuário ou senha não definidos.");
  }
};



const accountDataLocal = ref(
  structuredClone(JSON.parse(JSON.stringify(cadastro.value)))
);


const telefoneRule = [
  (v) => v.length == 14 || "Telefone da empresa não tem o tamanho correto",
];

const cnpjRule = [
  (v) => !!v || "CNPJ da empresa é obrigatório",
  (v) => v.length == 18 || "CNPJ da empresa não tem o tamanho correto",
];


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

const handleCNPJInput = (value) => {
  cadastro.value.cnpj = formatCNPJ(value);
};

const onPhoneInput = (e) => {
  cadastro.value.telefone = formatPhone(e.target.value);
};

const onWhatsappInput = (e) => {
  cadastro.value.whatsapp = formatWhatsapp(e.target.value);
};



const submit = () => {
  if (isFormValid.value) {
    const data = {
      ...cadastro.value,
    };
    empresa.EmpresaCadastro(data);
  }

};

const changeAvatar = (event) => {
  const fileReader = new FileReader();
  const files = event.target.files;
  if (files && files.length) {
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        accountDataLocal.value.logo = fileReader.result;
        cadastro.value.logo = fileReader.result;
      }
    };
  }
};

// reset avatar image
const resetAvatar = () => {
  cadastro.logo = "";
};
</script>

<template>
  <div>
    <loading :is-loading="empresa.isLoading" />

    <VDivider />

    <VWindow v-model="activeTab" class="mt-5 disable-tab-transition">
      <!-- Account -->
      <VWindowcadastro value="account">
        <VRow>
          <VCol cols="12">
            <VCard title="Cadastro de empresas">
              <VCardText class="d-flex">
                <!-- 👉 Avatar -->
                <VAvatar rounded="lg" size="100" class="me-6" :image="cadastro.logo" />

                <!-- 👉 Upload Photo -->
                <form class="d-flex flex-column justify-center gap-5">
                  <div class="d-flex flex-wrap gap-2">
                    <VBtn color="primary" @click="refInputEl?.click()">
                      <VIcon icon="bx-cloud-upload" class="d-sm-none" />
                      <span class="d-none d-sm-block">Carregar nova foto</span>
                    </VBtn>

                    <input ref="refInputEl" type="file" name="file" accept=".jpeg,.png,.jpg,GIF" hidden
                      @input="changeAvatar" />

                    <VBtn type="reset" color="error" variant="tonal" @click="resetAvatar">
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
                <VForm ref="form" v-model="isFormValid" @submit.prevent="submit()" class="mt-6">
                  <VRow>
                    <VCol cols="12" md="12">
                      <h4>Informações de contato</h4>
                    </VCol>
                    <!-- 👉 First Name -->
                    <VCol md="3" cols="12">
                      <VTextField v-model="cadastro.nome" placeholder="Ex: empresa teste" label="Nome empresa"
                        :rules="[(v) => !!v || 'Nome da empresa é obrigatório']" />
                    </VCol>

                    <!-- 👉 Last Name -->
                    <VCol md="3" cols="12">
                      <VTextField v-model="cadastro.email" placeholder="email@gmail.com" type="email" label="Email"
                        :rules="[(v) => !!v || 'Email da empresa é obrigatório']" />
                    </VCol>
                    <VCol md="3" cols="12">
                      <VTextField v-model="cadastro.cnpj" placeholder="00.000.000/0000-00" type="text" label="CNPJ"
                        @input="handleCNPJInput($event.target.value)" :rules="cnpjRule" />
                    </VCol>
                    <VCol md="3" cols="12">
                      <VTextField v-model="cadastro.creci" placeholder="0000" type="text" label="Creci"
                        :rules="[(v) => !!v || 'Creci da empresa é obrigatório']" />
                    </VCol>

                    <!-- 👉 Email -->
                    <VCol cols="12" md="3">
                      <VTextField v-model="cadastro.whatsapp" @input="onWhatsappInput" label="Whatsapp"
                        placeholder="(99) 99999-9999" type="tel" />
                    </VCol>

                    <!-- 👉 Organization -->
                    <VCol cols="12" md="3">
                      <VTextField v-model="cadastro.telefone" @input="onPhoneInput" label="Telefone"
                        placeholder="(99) 99999-9999" type="tel" />
                    </VCol>

                    <!-- 👉 Phone -->
                    <VCol cols="12" md="3">
                      <VTextField v-model="cadastro.instagram" label="Instagram" placeholder="seu instagram" />
                    </VCol>

                    <!-- 👉 Address -->
                    <VCol cols="12" md="3">
                      <VTextField v-model="cadastro.facebook" label="Facebook" placeholder="seu facebook" />
                    </VCol>
                    <VCol cols="12" md="12">
                      <h4>Informações sobre o site</h4>
                    </VCol>

                    <!-- 👉 State -->
                    <VCol cols="12" md="5">
                      <VTextField v-model="cadastro.titulo" label="Titulo"
                        placeholder="ex: Sua empresa - A melhor do Brasil" />
                    </VCol>

                    <!-- 👉 Zip Code -->
                    <VCol cols="12" md="5">
                      <VTextField v-model="cadastro.palavras_chaves" label="Palavras Chaves"
                        placeholder="ex: seusite; automovel; carro" />
                    </VCol>

                    <!-- 👉 Country -->
                    <VCol cols="12" md="2">

                      <VTextField v-model="cadastro.cor" label="Cor do site" type="color"
                        :rules="[(v) => !!v || 'Cor é obrigatório']" />
                    </VCol>
                    <VCol cols="12" md="12">
                      <V-textarea v-model="cadastro.descricao" label="Descricao do site"
                        placeholder="ex: Seu site - o site especializado em oferecer o melhor para o seu cliente" />
                    </VCol>
                    <VCol cols="12" md="12">
                      <h4>Informações sobre o endereco</h4>
                    </VCol>

                    <!-- 👉 Language -->
                    <VCol cols="12" md="8">

                      <VTextField v-model="cadastro.endereco.rua" label="Rua" placeholder="Rua 25 de março"
                        :rules="[(v) => !!v || 'O campo rua é obrigatório']" />
                    </VCol>

                    <!-- 👉 Timezone -->
                    <VCol cols="12" md="4">

                      <VTextField v-model="cadastro.endereco.cep" label="Cep" placeholder="ex: 88-888-888"
                        :rules="[(v) => !!v || 'O campo cep é obrigatório']" />
                    </VCol>

                    <!-- 👉 Currency -->
                    <VCol cols="12" md="4">

                      <VTextField v-model="cadastro.endereco.bairro" label="Bairro" placeholder="ex: São pedro"
                        :rules="[(v) => !!v || 'O campo bairro é obrigatório']" />
                    </VCol>
                    <VCol cols="12" md="4">

                      <VTextField v-model="cadastro.endereco.cidade" label="Cidade" placeholder="ex: São paulo"
                        :rules="[(v) => !!v || 'O campo cidade é obrigatório']" />
                    </VCol>
                    <VCol cols="12" md="4">

                      <VTextField v-model="cadastro.endereco.pais" label="Pais" placeholder="ex: Brasil"
                        :rules="[(v) => !!v || 'O campo pais é obrigatório']" />
                    </VCol>
                    <VCol cols="12" md="6">
                      <VTextField v-model="cadastro.endereco.complemento" label="Complemento"
                        placeholder="ex: Casa verde" />
                    </VCol>
                    <VCol cols="12" md="3">

                      <VSelect v-model="cadastro.endereco.estado" label="Estado" :items="[
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
                      ]" placeholder="Selecione o seu estado"
                        :rules="[(v) => !!v || 'O campo estado é obrigatório']" />
                    </VCol>
                    <VCol cols="12" md="3">
                      <VTextField v-model="cadastro.endereco.numero" label="Numero" placeholder="ex: 10" />
                    </VCol>

                    <VCol cols="12" md="12">
                      <h4>Informações sobre o usuario</h4>
                    </VCol>

                    <VCol md="6" cols="12">
                      <VTextField v-model="cadastro.usuario.nome" placeholder="Ex: Joao da silva" label="Nome"
                        :rules="[(v) => !!v || 'Nome do usuario é obrigatório']" />
                    </VCol>

                    <!-- 👉 Last Name -->
                    <VCol md="6" cols="12">
                      <VTextField v-model="cadastro.usuario.email" placeholder="email@gmail.com" type="email"
                        label="Email" :rules="[(v) => !!v || 'Email do usuario é obrigatório']" />
                    </VCol>
                    <VCol md="6" cols="12">
                      <VTextField v-model="cadastro.usuario.creci" placeholder="0000" type="text" label="Creci" />
                    </VCol>
                    <VCol md="6" cols="12">
                      <VTextField v-model="cadastro.usuario.telefone" placeholder="" type="text" @input="formatTelefone"
                        label="Seu Telefone" :rules="telefoneRule" />
                    </VCol>
                    <VCol cols="12" md="4">
                      <VSelect v-model="cadastro.usuario.tipo_usuario_id" label="Tipo de usuário" :items="tipoUsuario"
                        item-title="nome_tipo" item-value="id" placeholder="Selecione o tipo de usuário"
                        :rules="[(v) => !!v || 'Selecione o tipo de usuário']" />
                    </VCol>

                    <VCol cols="12" md="8">
                      <!-- 👉 current password -->
                      <VTextField v-model="cadastro.usuario.password"
                        :type="isCurrentPasswordVisible ? 'text' : 'password'" :append-inner-icon="isCurrentPasswordVisible ? 'bx-hide' : 'bx-show'
                          " label="Senha" placeholder="············" @click:append-inner="
                          isCurrentPasswordVisible = !isCurrentPasswordVisible
                          " @input="validatePassword" />
                    </VCol>
                    <VCol cols="12" md="12">
                      <VCardText v-if="
                        erroNewPassword.erroSimbolo != '' ||
                        erroNewPassword.erroMinusculo != '' ||
                        erroNewPassword.erroMinimo != ''
                      ">
                        <p class="text-base font-weight-medium mt-2">
                          Requisitos de senha:
                        </p>

                        <ul class="d-flex flex-column gap-y-3">
                          <li v-if="erroNewPassword.erroMinimo != ''" class="d-flex">
                            <div>
                              <VIcon size="7" icon="bxs-circle" class="me-3" />
                            </div>
                            <span class="font-weight-medium">{{
                              erroNewPassword.erroMinimo
                            }}</span>
                          </li>
                          <li v-if="erroNewPassword.erroMinusculo != ''" class="d-flex">
                            <div>
                              <VIcon size="7" icon="bxs-circle" class="me-3" />
                            </div>
                            <span class="font-weight-medium">{{
                              erroNewPassword.erroMinusculo
                            }}</span>
                          </li>
                          <li v-if="erroNewPassword.erroSimbolo != ''" class="d-flex">
                            <div>
                              <VIcon size="7" icon="bxs-circle" class="me-3" />
                            </div>
                            <span class="font-weight-medium">{{
                              erroNewPassword.erroSimbolo
                            }}</span>
                          </li>
                        </ul>
                      </VCardText>
                    </VCol>

                    <!-- 👉 Form Actions -->
                    <VCol cols="12" class="d-flex flex-wrap gap-4">
                      <VBtn v-if="
                        erroNewPassword.erroSimbolo != '' ||
                        erroNewPassword.erroMinusculo != '' ||
                        erroNewPassword.erroMinimo != ''
                      " disabled="disabled">Salvar</VBtn>
                      <VBtn v-else type="submit">Salvar</VBtn>
                    </VCol>
                  </VRow>
                </VForm>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VWindowcadastro>
    </VWindow>
  </div>
</template>
