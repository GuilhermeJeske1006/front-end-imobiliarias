<script setup>
import { useImovelStore } from "@/stores/ImovelStore";

const props = defineProps({
  imovelId: {
    type: Number,
    required: true,
  },
});

const imovel = useImovelStore();

const excluirImovel = () => {
  imovel.ImovelDeletar(props.imovelId);
  imovel.modalExcluir = false;
  imovel.ImovelListar();
};
</script>

<template>
  <div class="text-center">
    <v-dialog v-model="imovel.modalExcluir" width="500">
      <VCard>
        <VWindow>
          <VWindowItem class="text-center">
            <VCardItem>
              <VCardTitle>Você tem certeza disso?</VCardTitle>
              <VDivider />
            </VCardItem>
            <VCardText
              >Você ira excluir permanentemente o produto
              {{ props.imovelId }} ?</VCardText
            >

            <VCardText>
              <VBtn color="error " @click="excluirImovel">Excluir</VBtn>
            </VCardText>
          </VWindowItem>
        </VWindow>
      </VCard>
    </v-dialog>
  </div>
</template>
