<script setup>
import { useProdutoStore } from "@/stores/ProdutoStore";

const props = defineProps({
  produtoId: {
    type: Number,
    required: true,
  },
});

const produto = useProdutoStore();

const excluirProduto = () => {
  produto.ProdutoDeletar(props.produtoId);
  produto.modalExcluir = false;
  produto.ProdutoListar();
};
</script>

<template>
  <div class="text-center">
    <v-dialog v-model="produto.modalExcluir" width="500">
      <VCard>
        <VWindow>
          <VWindowItem class="text-center">
            <VCardItem>
              <VCardTitle>Você tem certeza disso?</VCardTitle>
              <VDivider />
            </VCardItem>
            <VCardText
              >Você ira excluir permanentemente o produto
              {{ props.produtoId }}</VCardText
            >

            <VCardText>
              <VBtn color="error " @click="excluirProduto">Excluir</VBtn>
            </VCardText>
          </VWindowItem>
        </VWindow>
      </VCard>
    </v-dialog>
  </div>
</template>
