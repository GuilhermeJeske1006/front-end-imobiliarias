export const formatValor = (valor) => {
    return valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}
