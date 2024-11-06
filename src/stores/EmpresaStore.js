import axios from 'axios';
import { defineStore } from 'pinia';
import { useToast } from "vue-toastification";


export const useEmpresaStore = defineStore('empresa', {
  state() {
    return {
      isLoading: false,
      empresaCadastrada: false,
      cadastro: {
        endereco: {}
      },
      item: {
        endereco: {}
      },
      empresa_id: localStorage.getItem('empresa_id'),

    };
  },

  actions: {
    EmpresaListar() {
      this.isLoading = true
        return new Promise((resolve, reject) => {
          axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

          axios
            .get(`empresa/${this.empresa_id}`)
            .then((res) => {
              this.item = res.data
              resolve(); // Resolva a Promise sem nenhum valor adicional
            })
            .catch((error) => {
              reject(error); // Rejeite a Promise com o erro
            }).finally(() => {
              this.isLoading = false;
            });
        });
      },
      EmpresaEditar(endereco_id) {
        this.isLoading = true;
      
        return new Promise(async (resolve, reject) => {
          try {
            const form = {
              ...this.item,
              endereco_id,
            };
      
            const res = await axios.put(`/empresa/editar/${this.empresa_id}`, form);
      
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
      
      EmpresaCadastro(item) {
        this.isLoading = true;
      
        return new Promise(async (resolve, reject) => {
          try {
            const res = await axios.post(`/empresa/criar`, item);
      
            resolve(); // Resolva a Promise se a operação for bem-sucedida
            useToast().success(res.data.message);
            this.empresaCadastrada = true; // Atualiza o estado após o sucesso
          } catch (error) {
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
