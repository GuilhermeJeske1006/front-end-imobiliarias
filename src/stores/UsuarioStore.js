import router from '@/router';
import axios from 'axios';
import { defineStore } from 'pinia';
import { useToast } from "vue-toastification";


export const useUsuarioStore = defineStore('usuario', {
  state() {
    return {
      isLoading: false,
      modalTrocar: false,
      tipoUsuario: [],
      usuario: [],
      cadastro: {
        foto: '',
        nome: '',
        email: '',
        password: '',
        privacyPolicies: false
      },
      empresa_id: localStorage.getItem('empresa_id'),
      user_id: localStorage.getItem('usuario_id'),
      id: '',
      nome: '',
      email: '',
      empresas_id: '',
      password: '',
      remember: false,
      perfil: [],
      empresas: [],
      senha: '',
      password: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      user: {
        meta: {
        }
      },
      filtrar: '',
      modalExcluir: false,
      usuario_id: 0
    };
  },

  actions: {
    UsuarioLogin() {
      this.isLoading = true

      return new Promise((resolve, reject) => {
        const form = {
          email: this.email,
          password: this.senha,
        };

        axios
          .post('login', form)
          .then((res) => {
            localStorage.setItem('token', res.data.token.plainTextToken);
            localStorage.setItem('empresa_id', res.data.user.empresa_id);
            localStorage.setItem('usuario_id', res.data.user.id);
            localStorage.setItem('tipo_usuario_id', res.data.user.tipo_usuario_id);

            if(res.data.user.is_admin == 1){
              localStorage.setItem('is_admin', res.data.user.is_admin);
            }
            router.push("/dashboard");
            resolve(); // Resolva a Promise sem nenhum valor adicional
          })
          .catch((error) => {
            console.log(error);
            reject(error); // Rejeite a Promise com o erro
            useToast().error("Error ao fazer o login! Tente novamente!");

          }).finally(() => {
            this.isLoading = false; // Defina o estado isLoading como false após a chamada
          });;
      });
    },
    UsuarioLogout() {
      localStorage.removeItem('token');
      localStorage.removeItem('empresa_id');
      localStorage.removeItem('usuario_id');
      localStorage.removeItem('is_admin');
      localStorage.removeItem('tipo_usuario_id');
       router.push("/login");
    },

    UsuarioCadastro(data){
      this.isLoading = true
      console.log(data)
      return new Promise((resolve, reject) => {
        axios
          .post('usuario/criar', {
            ...data,
            empresa_id: this.empresa_id
          })
          .then((res) => {
            resolve(); // Resolva a Promise sem nenhum valor adicional
            useToast().success("Usuario cadastrado com sucesso!");

          })
          .catch((error) => {
            console.log(error);
            reject(error); // Rejeite a Promise com o erro
            useToast().error("Erro ao cadastrar o usuario!");

          }).finally(() => {
            this.isLoading = false; // Defina o estado isLoading como false após a chamada
          });
      });
    },

    UsuarioEdicao(data) {
      this.isLoading = true;
    
      return new Promise(async (resolve, reject) => {
        try {
          const res = await axios.put(`usuario/editar/${this.user_id}`, {
            ...data,
            empresa_id: this.empresa_id,
          });

          console.log(res);
    
          resolve(); // Resolva a Promise se a operação for bem-sucedida
          useToast().success(res.data.message);
        } catch (error) {
          console.log(error);
          useToast().error(error.response.data.message);
          reject(error); // Rejeite a Promise com o erro capturado
        } finally {
          this.isLoading = false; // Garante que o estado isLoading seja atualizado no final
        }
      });
    },
    

    UsuarioEdicaoSenha() {
      this.isLoading = true;
    
      return new Promise(async (resolve, reject) => {
        try {
          const res = await axios.put(`/usuario/editar/senha/${this.user_id}`, this.password);
    
          resolve(); // Resolva a Promise se a operação for bem-sucedida
          useToast().success(res.data.message);
        } catch (error) {
          reject(error); // Rejeite a Promise com o erro capturado
          useToast().error(error.response?.data?.message || "Erro ao editar a senha");
        } finally {
          this.isLoading = false; // Garante que o estado isLoading seja atualizado no final
        }
      });
    },
    

    UsuarioListar(page) {
      this.isLoading = true

      return new Promise((resolve, reject) => {
        axios
          .get(`usuarios/${this.empresa_id}`
          , { params: { name: this.filtrar, id: this.id, page: page } }
          )
          .then((res) => {
            this.user = res.data;
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

    UsuarioPerfil() {
      this.isLoading = true

      return new Promise((resolve, reject) => {
        axios
          .get(`usuario/${localStorage.getItem('usuario_id')}`
          )
          .then((res) => {
            this.perfil = res.data.data;
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

    UsuarioMostrar(id) {
      this.isLoading = true

      return new Promise((resolve, reject) => {
        axios
          .get(`usuario/${id}`
          )
          .then((res) => {
            this.usuario = res.data.data;
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

    UsuarioEmpresas() {
      this.isLoading = true

      return new Promise((resolve, reject) => {
        axios
          .get(`empresa/usuario/${localStorage.getItem('usuario_id')}`
          )
          .then((res) => {
            this.empresas = res.data.data;
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

    TrocarEmpresa() {
      this.isLoading = true;
    
      // Remove the previous 'empresa_id' from localStorage if it exists
      localStorage.removeItem('empresa_id');
    
      // Set the new 'empresa_id' from your data (assuming 'this.empresas_id' is the correct property)
      localStorage.setItem('empresa_id', this.empresas_id);
    
      // Assuming you want to reload the page
      window.location.reload();
    
      // If you don't want to reload the entire page, you can remove the 'window.location.reload()' line and directly navigate
      router.push("/dashboard");
    },
    
    

    UsuarioDeletar(id){
      this.isLoading = true

      return new Promise((resolve, reject) => {
        axios
          .delete(`usuario/deletar/${id}`)
          .then((res) => {
            resolve(); // Resolva a Promise sem nenhum valor adicional
            useToast().success("Usuario excluido com sucesso!");
          })
          .catch((error) => {
            reject(error); // Rejeite a Promise com o erro
            useToast().error("Erro ao excluir o usuario!");

          })
          .finally(() => {
            this.isLoading = false; // Defina o estado isLoading como false após a chamada
          });
      });
    },


    TipoUsuario() {
      this.isLoading = true

      return new Promise((resolve, reject) => {
        axios
          .get(`tipo-usuario`
          )
          .then((res) => {
            this.tipoUsuario = res.data;
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

    
  },

  getters: {

  },
});
