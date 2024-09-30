<script setup>
import { useDescontoStore } from "@/stores/DescontroStore";
import { useProdutoStore } from "@/stores/ProdutoStore";

const props = defineProps({
  itemProduto: {
    type: Object,
    required: true,
  },
});

const produto = useProdutoStore();
const descon = useDescontoStore();

const formatValor = (valor) => {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const excluirDesconto = () => {
  descon.DescontoDeletar(props.itemProduto.id);
  produto.modalRemoverDesconto = false;
  produto.ProdutoListar();
};
</script>

<template>
  <div class="text-center">
    <v-dialog v-model="produto.modalRemoverDesconto" width="500">
      <VCard>
        <VWindow>
          <VWindowItem class="text-center">
            <VCardItem>
              <VCardTitle>Você tem certeza disso?</VCardTitle>
              <VDivider />
            </VCardItem>
            <VCardText
              >Você ira excluir o valor com desconto de
              <strong>
                R$ {{ formatValor(props.itemProduto?.desconto) }}
              </strong>
              e o valor voltará para
              <strong> R$ {{ formatValor(props.itemProduto?.valor) }} </strong>
            </VCardText>

            <VCardText>
              <VBtn color="error" @click="excluirDesconto">Excluir</VBtn>
            </VCardText>
          </VWindowItem>
        </VWindow>
      </VCard>
    </v-dialog>
  </div>
</template>
