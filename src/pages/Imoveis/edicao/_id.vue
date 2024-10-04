<script setup>
import loading from "@/components/geral/LoadingOverlay.vue";
import router from "@/router";
import { useImovelStore } from "@/stores/ImovelStore";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import ArquivoImovel from "../cadastro/arquivoImovel.vue";
import InformacaoBasica from "../cadastro/informacaoBasica.vue";
import ItemImovel from "../cadastro/itemImovel.vue";
import SiteImovel from "../cadastro/siteImovel.vue";

const imovel = useImovelStore();
const route = useRoute();
const activeTab = ref(route.params.tab);

const editar = ref({
  foto: "",
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



onMounted(() => {
  imovel.CategoriaListar();
  imovel.NegociacaoListar();
  imovel.ImovelMostrar(route.params.id);
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

const formatValor = (value) => {
  value = value.replace(/\D/g, "");
  value = (value / 100).toFixed(2);
  value = value.replace(".", ",");
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return "R$ " + value;
};

const formatImagemEnvio = (value) => {
  return value
    .map((item) => {
      if (item.startsWith("https")) {
        const lastSlashIndex = item.lastIndexOf("/");
        const secondLastSlashIndex = item.lastIndexOf("/", lastSlashIndex - 1);
        const trimmedUrl = item.substring(secondLastSlashIndex + 1);
        item = trimmedUrl;
      }
      return item;
    })
    .filter(Boolean);
};

const updateTable = computed(() => {
  if (imovel.imovel.id) {
    editar.value.foto = imovel.imovel.foto;
    editar.value.titulo = imovel.imovel.titulo;
    editar.value.descricao = imovel.imovel.descricao;
    editar.value.valor = formatValor(imovel.imovel.valor.toString());
    editar.value.categoria_id = imovel.imovel.categoria_id;
    editar.value.negociacao_id = imovel.imovel.negociacao_id;
    editar.value.area_total = imovel.imovel.area_total;
    editar.value.area_privativa = imovel.imovel.area_privativa;
    editar.value.area_quadrada = imovel.imovel.area_quadrada;
    editar.value.area_util = imovel.imovel.area_util;
    editar.value.dormitorios = imovel.imovel.dormitorios;
    editar.value.suites = imovel.imovel.suites;
    editar.value.banheiros = imovel.imovel.banheiros;
    editar.value.garagem = imovel.imovel.garagem;
    editar.value.ir_para_site = imovel.imovel.ir_para_site;
    editar.value.destaque = imovel.imovel.destaque;
    editar.value.palavras_chaves = imovel.imovel.palavras_chaves;
    editar.value.titulo_seo = imovel.imovel.titulo_seo;
    editar.value.descricao_seo = imovel.imovel.descricao_seo;
    editar.value.mapa = imovel.imovel.mapa;
    editar.value.slug = imovel.imovel.slug;
    editar.value.video = imovel.imovel.video;
    editar.value.endereco.cep = imovel.imovel.endereco.cep;
    editar.value.endereco.rua = imovel.imovel.endereco.rua;
    editar.value.endereco.numero = imovel.imovel.endereco.numero;
    editar.value.endereco.complemento = imovel.imovel.endereco.complemento;
    editar.value.endereco.bairro = imovel.imovel.endereco.bairro;
    editar.value.endereco.cidade = imovel.imovel.endereco.cidade;
    editar.value.endereco.estado = imovel.imovel.endereco.estado;
    editar.value.endereco.pais = imovel.imovel.endereco.pais;

    editar.value.itens = imovel.imovel.itens.map((item) => {
      return {
        id: item.id,
        item: item.nome,
      };
    });
    editar.value.imagem = imovel.imovel.fotos.map((item) => {
          return item.imagem;
        });
  }
  return editar.value;
});

watch(
  updateTable,
  (newValue) => {
    editar.value = newValue;
  },
  { immediate: true }
);

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

const formatValorEnvio = (valor) => {
  return valor.replace(/^R\$\s*/, "").replace(/[.,]/g, "");
};


const submit = async () => {
  const data = {
    ...editar.value,
    valor: formatValorEnvio(editar.value.valor),
    imagem: formatImagemEnvio(editar.value.imagem),
  };
  console.log(data);

  await imovel.ImovelEditar(data, route.params.id);

  if (imovel.imovelEditado) {
    router.push({ path: `/imoveis/listar` });
  }
};

const updateItens = (item) => {
  editar.value.itens = item;
};
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
        :item="editar"
        :categoria="categoria"
        :negociacao="negociacao"
        @next="goToTab('security')"
        />
      </VWindowItem>

      <VWindowItem value="security">
        <ArquivoImovel
          @next="goToTab('item')"
          @pass="goToPass('account')"
          :item="editar.imagem"
        />
      </VWindowItem>

      <VWindowItem value="item">
        <ItemImovel
          @next="goToTab('site')"
          @pass="goToPass('security')"
          @update:items="updateItens"
          :items="editar.itens"
        />
      </VWindowItem>

      <VWindowItem value="site">
        <SiteImovel
          @submit="submit()"
          @pass="goToPass('item')"
          :item="editar"
        />
      </VWindowItem>
    </VWindow>
  </div>
</template>
