<script setup>
import { useImovelStore } from "@/stores/ImovelStore";

const props = defineProps({
  imagem: {
    type: String,
    required: true,
  },
});

const imovel = useImovelStore();

const excluirImagem = () => {
  imovel.ExcluirImagem(props.imagem);
  imovel.modalExcluirImagem = false;
};
</script>

<template>
  <div class="text-center">
    <v-dialog v-model="imovel.modalExcluirImagem" width="500">
      <VCard>
        <VWindow>
          <VWindowItem class="text-center">
            <VCardItem>
              <VCardTitle>Você tem certeza disso?</VCardTitle>
              <VDivider />
            </VCardItem>
            <VCardText>Você ira excluir permanentemente essa imagem</VCardText>

            <VCardText>
              <VBtn color="error " @click="excluirImagem">Excluir</VBtn>
            </VCardText>
          </VWindowItem>
        </VWindow>
      </VCard>
    </v-dialog>
  </div>
</template>
