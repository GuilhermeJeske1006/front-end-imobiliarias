<template>
  <form @submit.prevent="searchResult()" class="d-flex h-100 align-center">
    <!-- 👉 Vertical nav toggle in overlay mode -->

    <VCol cols="10" md="8">
      <VTextField
        v-model="filterText"
        :label="label"
        :placeholder="placeholder"
        size="2"
      />
    </VCol>
    <VCol cols="10" md="3">
      <VTextField
        v-model="id"
        :label="'Busque pelo COD'"
        :placeholder="''"
        size="2"
      />
    </VCol>
    <VCol cols="2" md="1">
      <VBtn style="height: 56px" type="submit">
        <IconBtn>
          <VIcon icon="bx-search" />
        </IconBtn>
      </VBtn>
    </VCol>
  </form>
</template>

<script>
export default {
  name: "Filter",
  props: {
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    btn: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      filterText: "",
      id: '',
    };
  },
  methods: {
    searchResult() {
      this.$emit("action-click", this.filterText, this.id);
    },
  },
};
</script>
