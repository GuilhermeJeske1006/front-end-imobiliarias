export const staticPrimaryColor = '#069dd4'; // Azul claro

const theme = {
  defaultTheme: 'light',
  themes: {
    light: {
      dark: false,
      colors: {
        'primary': '#069dd4',           // Azul claro
        'on-primary': '#FFFFFF',        // Texto em branco
        'secondary': '#099BD8',         // Azul degradê
        'on-secondary': '#FFFFFF',
        'success': '#4CAF50',           // Verde para sucesso
        'on-success': '#FFFFFF',
        'info': '#03A9F4',              // Azul para informação
        'on-info': '#FFFFFF',
        'warning': '#FFB300',           // Amarelo para alerta
        'on-warning': '#FFFFFF',
        'error': '#E53935',             // Vermelho para erro
        'background': '#FFFFFF',        // Fundo branco
        'on-background': '#1A1A1A',     // Texto em cinza escuro
        'on-surface': '#1A1A1A',
        'grey-50': '#FAFAFA',
        'grey-100': '#EBEEF0',
        'grey-200': '#EEEEEE',
        'grey-300': '#E0E0E0',
        'grey-400': '#BDBDBD',
        'grey-500': '#9E9E9E',
        'grey-600': '#757575',
        'grey-700': '#616161',
        'grey-800': '#424242',
        'grey-900': '#212121',
        'perfect-scrollbar-thumb': '#C8D6E5',
        'skin-bordered-background': '#FFFFFF',
        'skin-bordered-surface': '#FFFFFF',
      },
      variables: {
        'code-color': '#099BD8',         // Azul escuro
        'overlay-scrim-background': '#1A1A1A',
        'overlay-scrim-opacity': 0.5,
        'border-color': '#1A1A1A',
        'snackbar-background': '#0BF0F6', // Azul na snackbar
        'snackbar-color': '#FFFFFF',
        'tooltip-background': '#262732',
        'tooltip-opacity': 0.9,
        'table-header-background': '#EBEEF0',  // Azul muito claro para cabeçalhos

        // Sombras
        'shadow-key-umbra-opacity': 'rgba(50, 50, 93, 0.15)',  
        'shadow-key-penumbra-opacity': 'rgba(50, 50, 93, 0.10)', 
        'shadow-key-ambient-opacity': 'rgba(0, 0, 0, 0.05)',
      },
    },
    dark: {
      dark: true,
      colors: {
        'primary': '#0BF0F6',           // Azul claro predominante
        'on-primary': '#FFFFFF',
        'secondary': '#099BD8',         // Azul degradê
        'on-secondary': '#FFFFFF',
        'success': '#4CAF50',           // Verde
        'on-success': '#FFFFFF',
        'info': '#03A9F4',              // Azul para informação
        'on-info': '#FFFFFF',
        'warning': '#FFB300',           // Amarelo
        'on-warning': '#FFFFFF',
        'error': '#E53935',             // Vermelho
        'background': '#1A1A1A',        // Fundo escuro
        'on-background': '#FFFFFF',     // Texto em branco
        'surface': '#2B3A4B',           // Superfícies em azul escuro
        'on-surface': '#FFFFFF',
        'grey-50': '#2A2E42',
        'grey-100': '#444463',
        'grey-200': '#4A5072',
        'grey-300': '#5E6692',
        'grey-400': '#7983BB',
        'grey-500': '#8692D0',
        'grey-600': '#AAB3DE',
        'grey-700': '#B6BEE3',
        'grey-800': '#CFD3EC',
        'grey-900': '#E7E9F6',
        'perfect-scrollbar-thumb': '#4A5072',
        'skin-bordered-background': '#1A1A1A',
        'skin-bordered-surface': '#1A1A1A',
      },
      variables: {
        'code-color': '#099BD8',         // Azul muito escuro
        'overlay-scrim-background': '#0D0E24',
        'overlay-scrim-opacity': 0.6,
        'border-color': '#FFFFFF',
        'snackbar-background': '#0BF0F6', // Azul para a snackbar no tema escuro
        'snackbar-color': '#FFFFFF',
        'tooltip-background': '#464A65',
        'tooltip-opacity': 0.9,
        'table-header-background': '#1A1A1A', // Cabeçalhos escuros

        // Sombras
        'shadow-key-umbra-opacity': 'rgba(0, 0, 0, 0.20)',    
        'shadow-key-penumbra-opacity': 'rgba(0, 0, 0, 0.15)', 
        'shadow-key-ambient-opacity': 'rgba(0, 0, 0, 0.10)',
      },
    },
  },
}

export default theme;
