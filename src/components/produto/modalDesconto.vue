<script setup>
import { useDescontoStore } from "@/stores/DescontroStore";
import { useProdutoStore } from "@/stores/ProdutoStore";
import { computed, ref, watch } from "vue";

const props = defineProps({
  itemProduto: {
    type: Object,
    required: true,
  },
});

const produto = useProdutoStore();
const descon = useDescontoStore();

const desconto = ref({
  desconto: 0,
  porcentagem: 0,
});

const valorOriginal = ref(props.itemProduto?.valor); // Valor original do produto

// Computed value after applying discounts
const valor = computed(() => {
  let valorDesconto = valorOriginal.value - desconto.value.desconto;
  if (valorDesconto < 0) valorDesconto = 0; // Ensure the value doesn't go negative
  const valorFinal =
    valorDesconto - (valorDesconto * desconto.value.porcentagem) / 100;
  return valorFinal;
});

// Function to handle flat discount input
const inputDesconto = () => {
  if (desconto.value.desconto < 0) desconto.value.desconto = 0;
  if (desconto.value.desconto > valorOriginal.value)
    desconto.value.desconto = valorOriginal.value;
};

// Function to handle percentage discount input
const inputPorcentagem = () => {
  if (desconto.value.porcentagem < 0) desconto.value.porcentagem = 0;
  if (desconto.value.porcentagem > 100) desconto.value.porcentagem = 100;
};

// Validation rules for desconto (Reais)
const validateDesconto = (value) => {
  if (value < 0) {
    return "O desconto não pode ser negativo.";
  }
  if (value > valorOriginal.value) {
    return `O desconto não pode ser maior que R$ ${valorOriginal.value.toFixed(
      2
    )}.`;
  }
  return true;
};

// Validation rules for porcentagem
const validatePorcentagem = (value) => {
  if (value < 0 || value > 100) {
    return "A porcentagem deve estar entre 0 e 100.";
  }
  return true;
};

const addDesconto = () => {
  descon.AdicionarDesconto({
    produto_id: props.itemProduto.id,
    desconto: desconto.value.desconto || 0,
    porcentagem: desconto.value.porcentagem || 0,
  });

  produto.modalDesconto = false;
  produto.ProdutoListar();
};

watch(
  () => props.itemProduto,
  (newValue) => {
    valorOriginal.value = newValue.valor;
  }
);

const formatValor = (valor) => {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
</script>

<template>
  <div class="text-center">
    <v-dialog v-model="produto.modalDesconto" width="600">
      <VCard>
        <VWindow>
          <VWindowItem class="text-center">
            <VCardItem>
              <VCardTitle
                >Adicionar desconto ao produto {{ props.itemProduto.nome }}
              </VCardTitle>
              <VDivider />
            </VCardItem>
            <VCardText>
              <VRow>
                <VCol cols="6">
                  <Text>
                    <strong>Valor com desconto:</strong> R$
                    {{ formatValor(valor) }}
                  </Text>
                </VCol>
                <VCol cols="6">
                  <Text>
                    <strong>Valor original:</strong> R$
                    {{ formatValor(valorOriginal) }}
                  </Text>
                </VCol>
              </VRow>
              <VRow>
                <VCol cols="6">
                  <VTextField
                    v-model="desconto.desconto"
                    label="Desconto (R$)"
                    @input="inputDesconto"
                    :rules="[validateDesconto]"
                  />
                </VCol>
                <VCol cols="6">
                  <VTextField
                    v-model="desconto.porcentagem"
                    label="Porcentagem (%)"
                    @input="inputPorcentagem"
                    :rules="[validatePorcentagem]"
                  />
                </VCol>
              </VRow>
            </VCardText>

            <VCardText>
              <VBtn
                class="mr-2"
                color="error"
                @click="produto.modalDesconto = false"
              >
                Cancelar
              </VBtn>
              <VBtn class="ml-2" @click="addDesconto">Salvar</VBtn>
            </VCardText>
          </VWindowItem>
        </VWindow>
      </VCard>
    </v-dialog>
  </div>
</template>
