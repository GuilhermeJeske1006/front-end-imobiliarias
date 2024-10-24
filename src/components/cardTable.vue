<script>
import { formatValor } from '@/plugins/functions';

export default {
  name: "Table",
  props: {
    items: {
      type: Array,
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
  },

  methods: {
    handleActionClick(action, item) {
      this.$emit("action-click", action, item);
    },

    formatValor (valor) {
    return valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  }


  },
};
</script>

<template>
  <VRow>
    <VCol sm="6" cols="12" v-for="item in items" :key="item.id">
      <VCard>
        <div
          class="d-flex justify-space-between flex-wrap flex-md-nowrap flex-column flex-md-row"
        >
        <div class="pa-5 w-50 image-container">
          <VImg :src="item.foto" class="image" />
          <VBtn class="button-overlay">
            COD. {{ item.id }}
          </VBtn>
        </div>

          <VDivider :vertical="$vuetify.display.mdAndUp" />

          <div>
            <VCardItem>
              <VCardTitle>{{ item.titulo }}</VCardTitle>
            </VCardItem>

            <VCardText>
              <VDivider />
            </VCardText>

            <VCardText class="d-flex justify-center">
              <div class="me-auto pe-4">
                <p  v-if="item.area_total" class="d-flex align-center mb-6">
                  <VIcon
                    color="primary"
                    icon="bx-area"
                  />
                  <span class="ms-3"> {{ item.area_total }} m²</span>
                </p>

                <p v-if="item.dormitorios" class="d-flex align-center mb-0">
                  <VIcon
                    color="primary"
                    icon="bx-bed"
                  />
                  <span class="ms-3"> {{ item.dormitorios }} </span>
                </p>
              </div>

              <VDivider
                v-if="$vuetify.display.smAndUp"
                vertical
                inset
              />

              <div v-if="item.suites" class="ms-auto ps-4">
                <p class="d-flex align-center mb-6">
                  <VIcon
                    color="primary"
                    icon="bx-shower"
                  />
                  <span class="ms-3"> {{ item.banheiros }} </span>
                </p>

                <p v-if="item.garagem" class="d-flex align-center mb-0">
                  <VIcon
                    color="primary"
                    icon="bx-car"
                  />
                  <span class="ms-3"> {{ item.garagem }} </span>
                </p>
              </div>
            </VCardText>

            <VCardText class="text-subtitle-1">
              <span>Valor : </span>
              <span class="font-weight-medium">
                <span>{{ item.consultar ? 'Consulte' : item.apartir_de ? 'A partir de ' + formatValor(item.valor) :  formatValor(item.valor)}}</span>
              </span>
            </VCardText>

            <VCardActions class="justify-space-between">
              <VBtn @click="handleActionClick('Editar', item)">
                <VIcon icon="mdi-eye-arrow-left" />
                <span class="ms-2">Ver mais</span>
              </VBtn>

              <IconBtn>
                <VIcon icon="bx-dots-vertical" />

                <VMenu activator="parent">
                  <v-list>
                    <v-list-item
                      v-for="(action, index) in actions"
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


<style scoped>
.image-container {
  position: relative;
  width: 100%;
  max-width: 300px; /* Ajuste conforme necessário */
}

.image {
  width: 100%;
  height: auto;
}

.button-overlay {
  position: absolute;
  top: 10px; /* Ajuste a distância da parte superior conforme necessário */
  left: 30%;
  transform: translateX(-50%); /* Centraliza o botão horizontalmente */
  z-index: 1; /* Coloca o botão sobre a imagem */
}
</style>
