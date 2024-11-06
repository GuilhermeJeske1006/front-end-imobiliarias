import axios from 'axios';
import { defineStore } from 'pinia';
import { useToast } from "vue-toastification";


export const useBlogStore = defineStore('blog', {
  state() {
    return {
      isLoading: false,
      modalExcluir: false,
      blog_id: '',
      filtrar: '',
      id: null,
      edicao: {
        titulo: '',
        foto: '',
        subtitulo: '',
        texto: '',
        empresa_id: localStorage.getItem('empresa_id'),
      },
      blogs: {
        meta: {}
      },
      cadastro: {
        titulo: '',
        foto: '',
        subtitulo: '',
        texto: '',
        empresa_id: localStorage.getItem('empresa_id'),

      },
      empresa_id: localStorage.getItem('empresa_id'),

    };
  },

  actions: {
    BlogListar(page) {
      this.isLoading = true

      return new Promise((resolve, reject) => {
        axios
          .get(`blogs/${this.empresa_id}`
          , { params: { name: this.filtrar, id: this.id, page: page } }
          )
          .then((res) => {
            this.blogs = res.data;
            resolve();
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            this.isLoading = false; // Defina o estado isLoading como false após a chamada
          });
      });
    },
    BlogMostrar(id) {
      this.isLoading = true

      return new Promise((resolve, reject) => {
        axios
          .get(`/blog/${id}`)
          .then((res) => {
            this.edicao = res.data.data
            
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

    BlogCadastro() {
      this.isLoading = true;
    
      return new Promise(async (resolve, reject) => {
        try {
          const res = await axios.post('blog/criar', this.cadastro);
    
          resolve(); // Resolva a Promise se a operação for bem-sucedida
          useToast().success(res.data.message);
          this.cadastro = {}; // Reseta o objeto de cadastro
        } catch (error) {
          console.log(error);
          reject(error); // Rejeite a Promise com o erro capturado
          useToast().error(error.response.data.message);
        } finally {
          this.isLoading = false; // Garante que o estado isLoading seja atualizado no final
        }
      });
    },
    
    
    BlogDeletar(id){
      this.isLoading = true

      return new Promise((resolve, reject) => {
        axios
          .delete(`blog/delete/${id}`)
          .then((res) => {
            resolve(); // Resolva a Promise sem nenhum valor adicional
            useToast().success("Blog excluido com sucesso!");
          })
          .catch((error) => {
            reject(error); // Rejeite a Promise com o erro
            useToast().error("Erro ao excluir o Blog!");

          })
          .finally(() => {
            this.isLoading = false; // Defina o estado isLoading como false após a chamada
          });
      });
    },

    BlogEditar(id) {
      this.isLoading = true;
    
      return new Promise(async (resolve, reject) => {
        try {
          const res = await axios.put(`/blog/editar/${id}`, this.edicao);
    
          resolve(); // Resolva a Promise se a operação for bem-sucedida
          useToast().success(res.data.message);
        } catch (error) {
          console.log(error);
          reject(error); // Rejeite a Promise com o erro capturado
          useToast().error(error.response.data.message);
        } finally {
          this.isLoading = false; // Garante que o estado isLoading seja atualizado no final
        }
      });
    },
    

    
  },

  getters: {

  },
});
