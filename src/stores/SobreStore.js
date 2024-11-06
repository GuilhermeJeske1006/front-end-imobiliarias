import axios from 'axios';
import { defineStore } from 'pinia';
import { useToast } from "vue-toastification";


export const useSobreStore = defineStore('sobre', {
  state() {
    return {
      isLoading: false,
      empresa_id: localStorage.getItem('empresa_id'),
      edicao: {}
    };
  },

  actions: {
    SobreMostrar() {
      this.isLoading = true

      return new Promise((resolve, reject) => {
        axios
          .get(`/sobre/${this.empresa_id}`)
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

    SobreEditar(data) {
      this.isLoading = true;
    
      return new Promise(async (resolve, reject) => {
        try {
          const res = await axios.put(`/sobre/editar/${this.empresa_id}`, {
            ...data,
          });
    
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
