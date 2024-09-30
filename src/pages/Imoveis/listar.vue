<script setup>
import CardTable from "@/components/cardTable.vue";
import Filter from "@/components/filter.vue";
import loading from "@/components/geral/LoadingOverlay.vue";
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

const computedTableData = computed(() => {
  return tableData.value;
});

const pageCount = computed(() => {
  return Math.ceil(tableData.value.length / 9);
});

const searchResult = (filterText, id) => {
  imovel.filtrar = filterText;
  imovel.id = id;
  imovel.ImovelListar();
};

watch(
  () => imovel?.imoveis,
  (newValue) => {
    tableData.value = updateTableData(newValue.data);
  }
);

watch(
  () => imovel?.imoveis?.meta?.current_page,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      imovel.ImovelListar(newValue);
    }
  }
);
</script>

<template>
  <loading :is-loading="imovel.isLoading" />

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
