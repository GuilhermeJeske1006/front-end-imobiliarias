export const staticPrimaryColor = '#4A90E2'; // Azul principal

const theme = {
  defaultTheme: 'light',
  themes: {
    light: {
      dark: false,
      colors: {
        'primary': '#4A90E2',           // Azul forte
        'on-primary': '#FFFFFF',
        'secondary': '#50B5E9',         // Azul claro
        'on-secondary': '#FFFFFF',
        'success': '#4CAF50',           // Verde para sucesso
        'on-success': '#FFFFFF',
        'info': '#03A9F4',              // Azul para informação
        'on-info': '#FFFFFF',
        'warning': '#FFB300',           // Amarelo para alerta
        'on-warning': '#FFFFFF',
        'error': '#E53935',             // Vermelho para erro
        'background': '#F0F4F8',        // Azul muito claro para o fundo
        'on-background': '#32475C',     // Azul escuro para contraste
        'on-surface': '#32475C',
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
        'perfect-scrollbar-thumb': '#C8D6E5',  // Azul claro para o scroll
        'skin-bordered-background': '#FFFFFF',
        'skin-bordered-surface': '#FFFFFF',
      },
      variables: {
        'code-color': '#004BA0',         // Azul muito escuro
        'overlay-scrim-background': '#32475C',
        'overlay-scrim-opacity': 0.5,
        'border-color': '#32475C',
        'snackbar-background': '#4A90E2',  // Azul na snackbar
        'snackbar-color': '#FFFFFF',
        'tooltip-background': '#262732',
        'tooltip-opacity': 0.9,
        'table-header-background': '#F0F4F8',  // Azul claro para cabeçalhos

        // Shadows
        'shadow-key-umbra-opacity': 'rgba(50, 50, 93, 0.15)',   // Sombras suaves em azul
        'shadow-key-penumbra-opacity': 'rgba(50, 50, 93, 0.10)', 
        'shadow-key-ambient-opacity': 'rgba(0, 0, 0, 0.05)',
      },
    },
    dark: {
      dark: true,
      colors: {
        'primary': '#4A90E2',           // Azul predominante
        'on-primary': '#FFFFFF',
        'secondary': '#50B5E9',         // Azul claro
        'on-secondary': '#FFFFFF',
        'success': '#4CAF50',           // Verde
        'on-success': '#FFFFFF',
        'info': '#03A9F4',              // Azul para informação
        'on-info': '#FFFFFF',
        'warning': '#FFB300',           // Amarelo
        'on-warning': '#FFFFFF',
        'error': '#E53935',             // Vermelho
        'background': '#1C2A39',        // Azul escuro para fundo
        'on-background': '#DBDBEB',     // Branco para texto
        'surface': '#2B3A4B',           // Superfícies em azul escuro
        'on-surface': '#DBDBEB',
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
        'skin-bordered-background': '#2B3A4B',
        'skin-bordered-surface': '#2B3A4B',
      },
      variables: {
        'code-color': '#004BA0',         // Azul muito escuro
        'overlay-scrim-background': '#0D0E24',
        'overlay-scrim-opacity': 0.6,
        'border-color': '#DBDBEB',
        'snackbar-background': '#4A90E2',  // Azul para a snackbar no tema escuro
        'snackbar-color': '#FFFFFF',
        'tooltip-background': '#464A65',
        'tooltip-opacity': 0.9,
        'table-header-background': '#1C2A39', // Cabeçalhos em azul escuro

        // Shadows
        'shadow-key-umbra-opacity': 'rgba(0, 0, 0, 0.20)',    // Sombras fortes no escuro
        'shadow-key-penumbra-opacity': 'rgba(0, 0, 0, 0.15)', 
        'shadow-key-ambient-opacity': 'rgba(0, 0, 0, 0.10)',
      },
    },
  },
}

export default theme;
