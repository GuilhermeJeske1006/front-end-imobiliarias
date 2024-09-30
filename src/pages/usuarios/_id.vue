<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<script setup>
import loading from "@/components/geral/LoadingOverlay.vue";
import { useUsuarioStore } from "@/stores/UsuarioStore";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const usuario = useUsuarioStore();
const route = useRoute();
const activeTab = ref(route.params.tab);
const refInputEl = ref();

onMounted(() => {
  usuario.UsuarioMostrar(route.params.id);
  usuario.TipoUsuario();
});

const editar = ref({
  foto: "",
  nome: "",
  email: "",
  password: "",
  telefone: "",
  tipo_usuario_id: "",
  creci: "",
});

const updateEditar = () => {
  if (usuario.usuario && usuario.usuario.id) {
    editar.value.foto = usuario.usuario.foto || "";
    editar.value.nome = usuario.usuario.nome || "";
    editar.value.email = usuario.usuario.email || "";
    editar.value.telefone = usuario.usuario.telefone || "";
    editar.value.tipo_usuario_id = usuario.usuario.tipo_usuario_id || "";
    editar.value.creci = usuario.usuario.creci || "";
  }
};

watch(
  () => usuario.usuario, 
  () => {
    updateEditar(); 
  },
  { immediate: true } 
);

const accountDataLocal = ref(
  structuredClone(
    JSON.parse(JSON.stringify(editar.value)) 
  )
);

const isValid = ref(false);


const tipoUsuario = computed(() => {
  let result = [];
  if (Array.isArray(usuario.tipoUsuario)) {
    result = usuario.tipoUsuario
      .filter((element) => element.id !== 2)  
      .map((element) => {
        return { nome_tipo: element.tipo, id: element.id };
      });
  }
  return result;
});


const nomeRule = [
  (v) => !!v || "Nome é obrigatório",
  (v) => (v && v.length >= 3) || "Nome deve ter pelo menos 3 caracteres",
];

const emailRule = [
  (v) => !!v || "Email é obrigatório",
  (v) => /.+@.+\..+/.test(v) || "Email deve ser válido",
];

const telefoneRule = [
  (v) => !!v || "Telefone é obrigatório",
  (v) => {
    const telefoneFormatado = v.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    return (
      telefoneFormatado.length === 11 ||
      telefoneFormatado.length === 10 ||
      "Telefone deve estar no formato (XX) XXXXX-XXXX"
    );
  },
  (v) =>
    (v && v.replace(/\D/g, "").length >= 10) ||
    "Telefone deve ter pelo menos 10 dígitos",
];

const submit = () => {
  if (isValid.value) {
    const data = {
      ...editar.value,
         is_master: false,
    };
    usuario.UsuarioEdicao(data);
  }
};

const formatTelefone = () => {
  let telefone = editar.value.telefone;

  telefone = telefone.replace(/\D/g, "");

  if (telefone.length > 11) {
    telefone = telefone
      .slice(0, 11)
      .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else if (telefone.length > 6) {
    telefone = telefone.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  } else if (telefone.length > 2) {
    telefone = telefone.replace(/(\d{2})(\d{0,5})/, "($1) $2");
  }

  editar.value.telefone = telefone;
};


const changeAvatar = (event) => {
  const fileReader = new FileReader();
  const files = event.target.files;
  if (files && files.length) {
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        accountDataLocal.value.foto = fileReader.result;
        editar.value.foto = fileReader.result;
      }
    };
  }
};

// reset avatar image
const resetAvatar = () => {
  editar.foto = "";
};

</script>

<template>
  <div >
    <loading :is-loading="usuario.isLoading" />

    <VDivider />

    <VWindow v-if="usuario.perfil.tipo_usuario_id == 3" v-model="activeTab" class="mt-5 disable-tab-transition">
      <!-- Account -->
      <VWindowItem value="account">
        <VRow>
          <VCol cols="12">
            <VCard title="Edição de usuário">
                <VCardText class="d-flex">
                    <!-- 👉 Avatar -->
                    <VAvatar
                      rounded="lg"
                      size="100"
                      class="me-6"
                      :image="editar.foto"
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
                  ref="formUser"
                  v-model="isValid"
                  @submit.prevent="submit"
                >
                  <VRow>
                    <!-- 👉 First Name -->
                    <VCol md="6" cols="12">
                      <VTextField
                        v-model="editar.nome"
                        placeholder="Ex: Joao da silva"
                        label="Nome"
                        :rules="nomeRule"
                      />
                    </VCol>

                    <!-- 👉 Last Name -->
                    <VCol md="6" cols="12">
                      <VTextField
                        v-model="editar.email"
                        placeholder="email@gmail.com"
                        type="email"
                        label="Email"
                        :rules="emailRule"
                      />
                    </VCol>
                    <VCol md="6" cols="12">
                      <VTextField
                        v-model="editar.creci"
                        placeholder="0000"
                        type="text"
                        label="Creci"
                      />
                    </VCol>
                    <VCol md="6" cols="12">
                      <VTextField
                        v-model="editar.telefone"
                        placeholder=""
                        type="text"
                        @input="formatTelefone"
                        label="Seu Telefone"
                        :rules="telefoneRule"
                      />
                    </VCol>
                    <VCol cols="12" md="4">
                      <VSelect
                        v-model="editar.tipo_usuario_id"
                        label="Tipo de usuário"
                        :items="tipoUsuario"
                        item-title="nome_tipo"
                        item-value="id"
                        placeholder="Selecione o tipo de usuário"
                        :rules="[(v) => !!v || 'Selecione o tipo de usuário']"
                      />
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
      </VWindowItem>
    </VWindow>
  </div>
</template>
