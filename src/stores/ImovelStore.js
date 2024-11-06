import axios from 'axios';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';


export const useImovelStore = defineStore('imovel', {
  state() {
    return {
      isLoading: true,
      empresa_id: localStorage.getItem('empresa_id'),
      categoria: [],
      negociacao: [],
      filtrar: '',
      produtoId: null,
      imovelEditado: false,
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
          
            resolve(); 
          })
          .catch((error) => {
            reject(error); 
          })
          .finally(() => {
            this.isLoading = false; 
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

    ImovelSalvar(data) {
      this.isLoading = true;
    
      return new Promise(async (resolve, reject) => {
        try {
          const res = await axios.post('imovel/criar', {
            ...data,
            empresa_id: this.empresa_id,
          });
    
          this.imovelSalvo = true;
          resolve(); // Resolva a Promise se a operação for bem-sucedida
          useToast().success(res.data.message);
        } catch (error) {
          console.log(error);
          reject(error); // Rejeite a Promise com o erro capturado
          useToast().error(error.response?.data?.message || 'Erro ao salvar o imóvel');
        } finally {
          this.isLoading = false; // Garante que o estado isLoading seja atualizado no final
        }
      });
    },
    

    ImovelEditar(data, imovelId) {
      this.isLoading = true;
    
      return new Promise(async (resolve, reject) => {
        try {
          const res = await axios.put(`imovel/editar/${imovelId}`, {
            empresa_id: this.empresa_id,
            ...data,
          });

          this.imovelEditado = true;
          useToast().success(res.data.message);
          resolve(); 
        } catch (error) {
          console.log(error);
          useToast().error(error.response.data.message);
          reject(error); 
        } finally {
          this.isLoading = false; 
        }
      });
    },
    

    ImovelDeletar(id) {
      this.isLoading = true;
    
      return new Promise(async (resolve, reject) => {
        try {
          const res = await axios.delete(`imovel/delete/${id}`);
          
          resolve(); // Resolva a Promise se a operação for bem-sucedida
          useToast().success(res.data.message);
        } catch (error) {
          reject(error); // Rejeite a Promise com o erro capturado
          useToast().error(error.response.data.message);
        } finally {
          this.isLoading = false; // Garante que o estado isLoading seja atualizado no final
        }
      });
    },
    

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
