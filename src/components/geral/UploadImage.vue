<template>
  <VCardText class="d-flex">
    <!-- 👉 Avatar -->
    <VAvatar rounded="lg" size="100" class="me-6" :image="props.items.foto" />

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
</template>

<script setup>
const refInputEl = ref();
const accountDataLocal = ref(
  structuredClone(JSON.parse(JSON.stringify(props.items)))
);

const changeAvatar = (event) => {
  const fileReader = new FileReader();
  const files = event.target.files;
  if (files && files.length) {
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        accountDataLocal.value.foto = fileReader.result;
        props.items.foto = fileReader.result;
      }
    };
  }
};

// reset avatar image
const resetAvatar = () => {
  props.items.foto = "";
};

const props = defineProps({
  items: {
    type: Object,
    required: true,
  },
});
</script>
