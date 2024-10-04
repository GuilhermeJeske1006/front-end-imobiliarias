<script setup>
import Filter from "@/components/filter.vue";
import LoadingOverlay from "@/components/geral/LoadingOverlay.vue";
import Tables from "@/components/tables.vue"; // Corrigido o nome do componente para "Tables"
import ModalExcluir from "@/components/usuario/modalExcluir.vue";
import router from "@/router";
import { useUsuarioStore } from "@/stores/UsuarioStore";
import { computed, onMounted, ref, watch } from "vue";

const use = useUsuarioStore();

const tableData = ref([]);
const tableColumns = ref(["Id", "Nome", "Email"]);
const actions = ref(["Excluir", "Editar"]);

const actionFilter = computed(() => {
  if (use.perfil.tipo_usuario_id == 3) {
    return actions.value;
  } else {
    return [];
  }
});

const updateTableData = (items) => {
  return items.map((item) => ({
    Id: item.id,
    Nome: item.nome,
    Email: item.email,
  }));
};

const handleActionClick = (action, item) => {
  if (action === "Excluir") {
    use.modalExcluir = true;
    use.usuario_id = item.Id;
  } else if (action === "Editar") {
    router.push(`/usuarios/edicao/${item.Id}`);
  }
};

onMounted(async () => {
  await use.UsuarioListar();
  tableData.value = updateTableData(use.user.data);
});

const computedTableData = computed(() => {
  return tableData.value;
});


const searchResult = (filterText, id) => {
  use.filtrar = filterText;
  use.id = id;
  use.UsuarioListar();
};

const pageCount = computed(() => {
  return use.user?.meta?.last_page || 1;  
});

watch(
  () => use.user?.meta?.current_page,  
  (newValue, oldValue) => {
    if (newValue !== oldValue && newValue) {
      use.UsuarioListar(newValue);  
    }
  }
);

watch(
  () => use.user?.data,  
  (newValue) => {
    if (newValue) {
      tableData.value = updateTableData(newValue);  
    }
  }
);


</script>

<template>
  <LoadingOverlay :loading="use.isLoading" />
  <ModalExcluir :usuarioId="use.usuario_id" />
  <VRow>
    <VCol cols="12">
      <VCard title="Listagem de Usuarios">
        <VCardText>Veja a lista de todos os seus Usuarios abaixo</VCardText>
        <VCardText>
          <Filter
            :placeholder="'Busque pelo nome'"
            :label="'Nome'"
            @action-click="searchResult"
            :btn="'Buscar'"
          />
        </VCardText>

        <Tables
          :items="computedTableData"
          :columns="tableColumns"
          :actions="actionFilter"
          @action-click="handleActionClick"
        />

        <div class="text-center pt-2">
          <v-pagination
            v-model="use.user.meta.current_page"
            :length="pageCount"
          ></v-pagination>
        </div>
      </VCard>
    </VCol>
  </VRow>
</template>
