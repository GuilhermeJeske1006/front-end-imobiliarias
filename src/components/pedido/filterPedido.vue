<template>
  <form @submit.prevent="searchResult()" class="d-flex h-100 align-center">
    <!-- 👉 Vertical nav toggle in overlay mode -->
    <VCol cols="12" md="3">
      <VTextField v-model="filtros.id" label="Busque pelo ID" size="2" />
    </VCol>
    <VCol cols="12" md="3">
      <VSelect
        v-model="filtros.status_envio"
        label="Status do envio"
        size="2"
        :items="statusEnvio"
        item-title="nome_status"
        item-value="id"
      />
    </VCol>
    <VCol cols="12" md="3">
      <VSelect
        v-model="filtros.status_pagamento"
        label="Status Pagamento"
        item-title="nome_status"
        :items="statusPagamento"
        item-value="id"
        size="2"
      />
    </VCol>
    <VCol cols="12" md="2">
      <VSelect
        v-model="filtros.status_metodo"
        label="Metodo de pagamento"
        item-title="nome_status"
        item-value="id"
        :items="statusMetodo"
        size="2"
      />
    </VCol>
    <VCol cols="12" md="1">
      <VBtn style="height: 56px" type="submit">
        <IconBtn>
          <VIcon icon="bx-search" />
        </IconBtn>
      </VBtn>
    </VCol>
  </form>
</template>

<script setup>
import { useStatusStore } from "@/stores/StatusStore";
import { computed, onMounted } from "vue";

const emit = defineEmits(["action-click"]);

const filtros = reactive({
  id: "",
  Status_pagamento: "",
  Status_envio: "",
  valor: "",
  status_metodo: "",
});

const useStatus = useStatusStore();

const statusPagamento = computed(() => useStatus?.status_pagamento);
const statusEnvio = computed(() => useStatus?.status_envio);
const statusMetodo = computed(() => {
  return [
    { nome_status: "Boleto", id: "BOLETO" },
    { nome_status: "Pix", id: "PIX" },
    { nome_status: "Cartão de crédito", id: "CREDITO" },
  ];
});

onMounted(() => {
  useStatus.GetStatusEnvio();
  useStatus.GetStatusPagamento();
});

const searchResult = () => {
  console.log(filtros);
  emit("action-click", filtros);
};
</script>
