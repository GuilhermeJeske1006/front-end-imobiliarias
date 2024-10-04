<script setup>
import CardTable from "@/components/cardTable.vue";
import Filter from "@/components/filter.vue";
import loading from "@/components/geral/LoadingOverlay.vue";
import ModalExcluir from "@/components/Imovel/modalExcluir.vue";
import router from "@/router";
import { useImovelStore } from "@/stores/ImovelStore";
import { onMounted } from "vue";

const imovel = useImovelStore();
const imovelId = ref(null);
const tableData = ref([]);
const tableColumns = ref(["id", "foto", "nome", "valor", "categoria"]);
const actions = ref([
  "Editar",
  "Excluir",
]);

const updateTableData = (items) => {
  return items.map((item) => ({
    ...item
  }));
};

const itemimovel = ref(null);

const handleActionClick = (action, item) => {
  if (action === "Editar") {
    router.push({ path: `/imoveis/edicao/${item.id}` });
  } else if (action === "Excluir") {
    console.log(item);
    imovel.modalExcluir = true;
    imovelId.value = item.id;
  } 
};
onMounted(async () => {
  await imovel.ImovelListar();
  tableData.value = updateTableData(imovel.imoveis.data);
});




const searchResult = (filterText, id) => {
  imovel.filtrar = filterText;
  imovel.id = id;
  imovel.ImovelListar();
};

watch(
  () => imovel?.imoveis?.data,  // Observa os dados da lista de imóveis
  (newValue) => {
    if (newValue) {
      tableData.value = updateTableData(newValue);  // Atualiza os dados da tabela
    }
  }
);

const computedTableData = computed(() => {
  return tableData.value;
});

const pageCount = computed(() => {
  return imovel?.imoveis?.meta?.last_page || 1;  // Pega o número total de páginas ou 1 como fallback
});

watch(
  () => imovel?.imoveis?.meta?.current_page,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      imovel.ImovelListar(newValue);  // Chama a função para buscar os imóveis da nova página
    }
  }
);

</script>

<template>
  <loading :is-loading="imovel.isLoading" />
  <ModalExcluir :imovelId="imovelId" />

  <VRow>
    <VCol cols="12">
      <VCard title="Listagem de imoveis">
        <VCardText>Veja a lista de todos os seus imoveis abaixo</VCardText>

        <VCardText>
          <Filter
            :placeholder="'Busque pelo nome'"
            :label="'Nome'"
            @action-click="searchResult"
            :btn="'Buscar'"
          />
        </VCardText>
        <VCardText>
          <CardTable
            :items="computedTableData"
            :columns="tableColumns"
            :actions="actions"
            @action-click="handleActionClick"
          />
        </VCardText>

        <div class="text-center pt-2">
          <v-pagination
            class="my-4"
            v-model="imovel.imoveis.meta.current_page"
            :length="pageCount"
          ></v-pagination>
        </div>
      </VCard>
    </VCol>
  </VRow>
</template>
