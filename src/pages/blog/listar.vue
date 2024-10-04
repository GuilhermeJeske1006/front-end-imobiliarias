<script setup>
import ModalExcluir from "@/components/blog/modalExcluir.vue";
import cardBlog from "@/components/cardBlog.vue"; // Corrigido o nome do componente para "Tables"
import Filter from "@/components/filter.vue";
import loading from "@/components/geral/LoadingOverlay.vue";
import router from "@/router";
import { useBlogStore } from "@/stores/BlogStore";

import { computed, onMounted, ref, watch } from "vue";

const blog = useBlogStore();

const tableData = ref([]);
const tableColumns = ref(["Id", "titulo", "subtitulo", "foto"]);
const actions = ref(["Editar", "Excluir"]);

const updateTableData = (items) => {
  return items.map((item) => ({
    Id: item.id,
    titulo: item.titulo,
    subtitulo: item.subtitulo,
    foto: item.foto,
  }));
};

const handleActionClick = (action, item) => {
  if (action === "Editar") {
    router.push({ path: `/blog/edicao/${item.Id}` });
  } else if (action === "Excluir") {
    blog.modalExcluir = true;
    blog.blog_id = item.Id;
  }
};

onMounted(async () => {
  await blog.BlogListar();
  tableData.value = updateTableData(blog.blogs.data);
});

const computedTableData = computed(() => {
  return tableData.value;
});



const searchResult = (filterText, id) => {
  blog.filtrar = filterText;
  blog.id = id;
  blog.BlogListar();
};

const pageCount = computed(() => {
  return blog.blogs?.meta?.last_page || 1;  // Usa o last_page do backend ou define 1 como fallback
});

watch(
  () => blog.blogs?.meta?.current_page,  
  (newValue, oldValue) => {
    if (newValue !== oldValue && newValue) {
      blog.BlogListar(newValue);  
    }
  }
);

watch(
  () => blog.blogs?.data,  
  (newValue) => {
    if (newValue) {
      tableData.value = updateTableData(newValue);  
    }
  }
);

</script>

<template>
  <ModalExcluir :blogId="blog.blog_id" />
  <loading :is-loading="blog.isLoading" />

  <VRow>
    <VCol cols="12">
      <VCard title="Listagem dos blogs">
        <VCardText>Veja a listagem de todos os seus blogs abaixo</VCardText>
        <VCardText>
          <Filter
            :placeholder="'Busque pelo nome'"
            :label="'Nome'"
            @action-click="searchResult"
            :btn="'Buscar'"
          />
        </VCardText>

        <cardBlog
          :items="computedTableData"
          :columns="tableColumns"
          :actions="actions"
          @action-click="handleActionClick"
        />

        <div class="text-center pt-2">
          <v-pagination
            class="my-4"
            v-model="blog.blogs.meta.current_page"
            :length="pageCount"
          ></v-pagination>
        </div>
      </VCard>
    </VCol>
  </VRow>
</template>
