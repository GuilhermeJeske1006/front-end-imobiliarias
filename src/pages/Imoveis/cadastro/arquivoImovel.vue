<template>
  <div>
    <ModalRemoverImagem :imagem="imagem" :index="indexImage" @update="removeIndex" />
    <VRow>
      <VCol cols="12">
        <VCard title="Arquivos do imovel">
          <VCardText class="d-flex">
         
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
                  multiple
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
          <VCardText>
            <VRow>
              <VCol
                md="3"
                cols="12"
                v-for="(item, index) in props.item"
                v-bind:key="index"
              >
                <v-avatar
                  color="error"
                  style="position: absolute; z-index: 9999; margin: -1%"
                >
                  <IconBtn @click="removeImage(index, item)">
                    <VIcon icon="bxs-trash" />
                  </IconBtn>
                </v-avatar>
                <VAvatar rounded="lg" size="100" class="me-6" :image="item" />
              </VCol>
            </VRow>
          </VCardText>

          <VDivider />

          <VCardText>
            <VForm class="mt-6">
              <VRow>
                <VCol cols="12" class="d-flex flex-wrap gap-4">
                  <VBtn @click="next">Proximo</VBtn>

                  <VBtn
                    color="secondary"
                    variant="tonal"
                    type="reset"
                    @click="pass"
                  >
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
import ModalRemoverImagem from "@/components/Imovel/modalRemoverImagem.vue";
import { useImovelStore } from "@/stores/ImovelStore";
import { ref } from "vue";
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const imovel = useImovelStore();
const imagem = ref(null);
const indexImage = ref(null);

const refInputEl = ref();
const accountDataLocal = ref(
  structuredClone(JSON.parse(JSON.stringify(props.item)))
);

const changeAvatar = (event) => {
  const fileReader = new FileReader();
  const { files } = event.target;

  if (files && files.length) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        if (typeof fileReader.result === "string") {
          // Assuming each file is associated with an index in the accountDataLocal array
          accountDataLocal.value[i] = fileReader.result;
          props.item.push(fileReader.result);
        }
      };
    }
  }
};

const formatImagemEnvio = (item) => {
  const lastSlashIndex = item.lastIndexOf("/");
  const secondLastSlashIndex = item.lastIndexOf("/", lastSlashIndex - 1);
  const trimmedUrl = item.substring(secondLastSlashIndex + 1);
  item = trimmedUrl;

  return item;
};


const removeIndex = (index) => {
  console.log('index', index)
  props.item.splice(index, 1);
  imovel.imagemRemovida = false;
};

const removeImage = (index, item = null) => {
  if (item.startsWith("https")) {
    imovel.modalExcluirImagem = true;
    imagem.value = formatImagemEnvio(item);
    indexImage.value = index;
  } else {
    props.item.splice(index, 1);
  }
};


// reset avatar image
const resetAvatar = () => {
  props.item = [];
};

const emit = defineEmits(["next", "pass"]);

const next = () => {
  emit("next", "item");
};

const pass = () => {
  emit("pass", "account");
};
</script>
