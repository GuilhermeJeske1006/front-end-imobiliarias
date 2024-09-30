<script setup>
const props = defineProps({
  items: {
    type: Object,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  actions: {
    type: Array,
    required: true,
  },
});

const filteredActions = (status) => {
  if (status.id == 1) {
    return props.actions.filter(
      (action) => action !== "Pagar envio" && action !== "Imprimir etiqueta"
    );
  } else if (status.id == 0) {
    return props.actions.filter((action) => action !== "Imprimir etiqueta");
  } else {
    return props.actions.filter((action) => action !== "Pagar envio");
  }
};

const emit = defineEmits(["action-click"]);

const handleActionClick = (action, item) => {
  emit("action-click", action, item);
};

const paymentMethods = {
  BOLETO: "Boleto",
  PIX: "Pix",
  CREDITO: "Cartão de crédito",
};

const formatMetodo = (forma_pagamento) =>
  paymentMethods[forma_pagamento] || forma_pagamento;

const formatVal = (value) => {
  value = value.replace(/\D/g, "");
  value = (value / 100).toFixed(2).replace(".", ",");
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const formatarDataExtenso = (data) => {
  const dataObj = new Date(data);
  return dataObj.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
</script>

<template>
  <VRow>
    <VCol sm="6" cols="12" v-for="item in items" :key="item.id">
      <VCard>
        <div
          class="d-flex justify-space-between flex-wrap flex-md-nowrap flex-column flex-md-row"
        >
          <div class="ma-auto pa-5">
            <VCardText class="text-subtitle-1">
              <span>Forma de pagamento: </span>
              <span class="font-weight-medium">
                <span>{{ formatMetodo(item.forma_pagamento) }}</span>
              </span>
            </VCardText>
            <VDivider />

            <VCardText class="text-subtitle-1">
              <span>Status do pagamento: </span>
              <span class="font-weight-medium">
                <span>{{ item.status_pedido_nome }}</span>
              </span>
            </VCardText>
            <VDivider />

            <VCardText class="text-subtitle-1">
              <span>Status do envio: </span>
              <span class="font-weight-medium">
                <span>{{ item.envio.status_envio }}</span>
              </span>
            </VCardText>
          </div>

          <VDivider :vertical="$vuetify.display.mdAndUp" />

          <div>
            <VCardItem>
              <VCardTitle>ID do pedido: {{ item.id }}</VCardTitle>
            </VCardItem>

            <VCardText><VDivider /></VCardText>

            <VCardText class="text-subtitle-1">
              <span>Data do pedido : </span>
              <span class="font-weight-medium">
                <span>{{ formatarDataExtenso(item.dt_item) }}</span>
              </span>
            </VCardText>

            <VCardText><VDivider /></VCardText>

            <VCardText class="text-subtitle-1">
              <span>Valor :</span>
              <span class="font-weight-medium">
                R$<span>{{ formatVal(item.valor) }}</span>
              </span>
            </VCardText>
            <VDivider />

            <VCardActions class="justify-space-between">
              <VBtn @click="handleActionClick('Ver', item)">
                <VIcon icon="mdi-eye-arrow-left" />
                <span class="ms-2">Ver mais</span>
              </VBtn>

              <IconBtn>
                <VIcon icon="bx-dots-vertical" />
                <VMenu activator="parent">
                  <v-list>
                    <v-list-item
                      v-for="(action, index) in filteredActions(
                        item.status_envio_id
                      )"
                      :key="index"
                      link
                      @click="handleActionClick(action, item)"
                    >
                      <v-list-item-title>{{ action }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </VMenu>
              </IconBtn>
            </VCardActions>
          </div>
        </div>
      </VCard>
    </VCol>
  </VRow>
</template>
