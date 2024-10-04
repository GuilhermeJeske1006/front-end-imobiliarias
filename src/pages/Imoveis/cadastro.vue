<script setup>
import loading from "@/components/geral/LoadingOverlay.vue";
import { useImovelStore } from "@/stores/ImovelStore";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import ArquivoImovel from "./cadastro/arquivoImovel.vue";
import InformacaoBasica from "./cadastro/informacaoBasica.vue";
import ItemImovel from "./cadastro/itemImovel.vue";
import SiteImovel from "./cadastro/siteImovel.vue";

const imovel = useImovelStore();
const route = useRoute();
const activeTab = ref(route.params.tab);

onMounted(() => {
  imovel.CategoriaListar();
  imovel.NegociacaoListar();
});

const categoria = computed(() => {
  let result = [];
  if (Array.isArray(imovel.categoria)) {
    result = imovel.categoria.map((element) => {
      return { nome_categoria: element.categoria, id: element.id };
    });
  }
  return result;
});

const negociacao = computed(() => {
  let result = [];
  if (Array.isArray(imovel.negociacao)) {
    result = imovel.negociacao.map((element) => {
      return { nome_negociacao: element.nome, id: element.id };
    });
  }
  return result;
});

// tabs
const tabs = [
  {
    title: "Informações basicas",
    icon: "bx-user",
    tab: "account",
  },
  {
    title: "Arquivos",
    icon: "bxs-file",
    tab: "security",
  },
  {
    title: "Item",
    icon: "bx-bell",
    tab: "item",
  },
  {
    title: "Site",
    icon: "bx-sitemap",
    tab: "site",
  },
];

const goToTab = (item) => {
  activeTab.value = item;
};

const goToPass = (item) => {
  activeTab.value = item;
};

const formatValor = (valor) => {
  if (typeof valor === "string") {
      return valor.replace(/^R\$\s*/, "").replace(/[.,]/g, "");

  }
};

const submit = async () => {
  const data = {
    ...cadastro.value,
    valor: formatValor(cadastro.value.valor),
  };

  console.log('data', data);

  await imovel.ImovelSalvar(data);

  if (imovel.imovelSalvo) {
    route.push({ path: "/imoveis/listar" });
  }
};

const updateItens = (item) => {
  cadastro.itens = item;
};

const cadastro = ref({
  titulo: "",
  descricao: "",
  valor: "",
  categoria_id: "",
  negociacao_id: "",
  area_total: "",
  dormitorios: "",
  suites: "",
  banheiros: "",
  garagem: "",
  
  ir_para_site: true,
  destaque: false,
  palavras_chaves: "",
  titulo_seo: "",
  descricao_seo: "",
  mapa: "",
  slug: "",
  video: "",

  endereco: {
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  },
  
  itens: [],
  fotos: [],
});
</script>

<template>
  <div>
    <loading :is-loading="imovel.isLoading" />

    <VTabs v-model="activeTab" show-arrows>
      <VTab disabled v-for="item in tabs" :key="item.icon" :value="item.tab">
        <VIcon size="20" start :icon="item.icon" />
        {{ item.title }}
      </VTab>
    </VTabs>
    <VDivider />

    <VWindow v-model="activeTab" class="mt-5 disable-tab-transition">
      <VWindowItem value="account">
        <InformacaoBasica
          :item="cadastro"
          :categoria="categoria"
          :negociacao="negociacao"
          @next="goToTab('security')"
        />
      </VWindowItem>

      <VWindowItem value="security">
        <ArquivoImovel
          @next="goToTab('item')"
          @pass="goToPass('account')"
          :item="cadastro.fotos"
        />
      </VWindowItem>

      <VWindowItem value="item">
        <ItemImovel
          @next="goToTab('site')"
          @pass="goToPass('security')"
          @update:items="updateItens"
          :items="cadastro.itens"
        />
      </VWindowItem>

      <VWindowItem value="site">
        <SiteImovel
          @submit="submit()"
          @pass="goToPass('item')"
          :item="cadastro"
        />
      </VWindowItem>
    </VWindow>
  </div>
</template>
