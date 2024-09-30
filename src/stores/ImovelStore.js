import axios from 'axios';
import { defineStore } from 'pinia';


export const useImovelStore = defineStore('imovel', {
  state() {
    return {
      isLoading: true,
      empresa_id: localStorage.getItem('empresa_id'),
      categoria: [],
      negociacao: [],
      filtrar: '',
      produtoId: null,
      modalDesconto: false,
      modalRemoverDesconto: false,
      modalExcluir: false,
      modalExcluirImagem: false,
      imovelSalvo: false,
      imovel: {},
      imagemRemovida: false,
      produtoEditado: false,
      id: null,
      imoveis: {
        data: [],
        meta: {}
      }
    };
  },

  actions: {
    CategoriaListar() {
      this.isLoading = true

      return new Promise((resolve, reject) => {
        axios
          .get(`categorias`)
          .then((res) => {
            this.categoria = res.data.data
          
            resolve(); // Resolva a Promise sem nenhum valor adicional
          })
          .catch((error) => {
            reject(error); // Rejeite a Promise com o erro
          })
          .finally(() => {
            this.isLoading = false; // Defina o estado isLoading como false após a chamada
          });
      });
    },

    NegociacaoListar() {
      this.isLoading = true

      return new Promise((resolve, reject) => {
        axios
          .get(`negociacoes`)
          .then((res) => {
            this.negociacao = res.data.data
          
            resolve(); // Resolva a Promise sem nenhum valor adicional
          })
          .catch((error) => {
            reject(error); // Rejeite a Promise com o erro
          })
          .finally(() => {
            this.isLoading = false; // Defina o estado isLoading como false após a chamada
          });
      });
    },

    ImovelListar(page) {
      this.isLoading = true
      return new Promise((resolve, reject) => {
        axios
          .get(`/imoveis/${this.empresa_id}`
            , { params: { name: this.filtrar, id: this.id, page: page } }
          )
          .then((res) => {
            this.imoveis = res.data
          
            resolve(); // Resolva a Promise sem nenhum valor adicional
          })
          .catch((error) => {
            reject(error); // Rejeite a Promise com o erro
          })
          .finally(() => {
            this.isLoading = false; // Defina o estado isLoading como false após a chamada
          });
      });
    },

    ImovelMostrar(id) {
      this.isLoading = true
      return new Promise((resolve, reject) => {
        axios
          .get(`/imovel/${id}`)
          .then((res) => {
            this.imovel = res.data.data
          
            resolve(); // Resolva a Promise sem nenhum valor adicional
          })
          .catch((error) => {
            reject(error); // Rejeite a Promise com o erro
          })
          .finally(() => {
            this.isLoading = false; // Defina o estado isLoading como false após a chamada
          });
      });
    },

    ImovelSalvar(data){
      this.isLoading = true

      return new Promise((resolve, reject) => {
        axios
          .post('imovel/criar', {
            ...data,
            empresa_id: this.empresa_id
          })
          .then((res) => {
            this.imovelSalvo = true
            resolve();
            useToast().success("Imovel cadastrado com sucesso!");
          })
          .catch((error) => {
            console.log(error);
            reject(error); 
            useToast().error("Erro ao cadastrar o Imovel!");

          })
          .finally(() => {
            this.isLoading = false; 
          });
      });
    },

    // ProdutoEditar(data, produtoId){
    //   this.isLoading = true

    //   return new Promise((resolve, reject) => {
    //     axios
    //       .put(`produto/${produtoId}`, {
    //         empresa_id: this.empresa_id,
    //         ...data,
    //       })
    //       .then((res) => {
    //         this.produtoEditado = true
    //         resolve();
    //         useToast().success("Produto editado com sucesso!");
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //         reject(error); 
    //         useToast().error("Erro ao editar o Produto!");

    //       })
    //       .finally(() => {
    //         this.isLoading = false; 
    //       });
    //   });
    // },

    // ProdutoDeletar(id){
    //   this.isLoading = true

    //   return new Promise((resolve, reject) => {
    //     axios
    //       .delete(`produto/deletar/${id}`)
    //       .then((res) => {
    //         resolve(); // Resolva a Promise sem nenhum valor adicional
    //         useToast().success("Produto excluido com sucesso!");

    //       })
    //       .catch((error) => {
    //         reject(error); // Rejeite a Promise com o erro
    //         useToast().error("Erro ao excluir o produto! Tente novamente!");

    //       })
    //       .finally(() => {
    //         this.isLoading = false; // Defina o estado isLoading como false após a chamada
    //       });
    //   });
    // },


    ExcluirImagem(imagem){
      this.isLoading = true

      return new Promise((resolve, reject) => {
        axios
          .delete(`/excluir-imagem`, {
            data: {
              imagem: imagem,
              empresa_id: this.empresa_id
            }
          })
          .then((res) => {
            resolve(); // Resolva a Promise sem nenhum valor adicional
            this.imagemRemovida = true
            useToast().success("Imagem excluida com sucesso!");

          })
          .catch((error) => {
            reject(error); // Rejeite a Promise com o erro
            useToast().error("Erro ao excluir a imagem!");

          })
          .finally(() => {
            this.isLoading = false; 
            
          });
      });
    }

  },

  getters: {},
});
