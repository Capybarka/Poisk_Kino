import { createVuetify } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const darkTheme = {
  colors: {
    background: '#17181a',
    'background-light': '#2d2d2d',
    primary: '#d14234',
    warning: '#FB8C00',
    'background-secondary': '#292929',
    secondary: '#b146cf',
  },
};

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'darkTheme',
    themes: {
      darkTheme,
    },
  },
  icons: {
    defaultSet: 'mdi',
  },
  defaults: {
    VContainer: {
      style: [{ maxWidth: '1400px' }],
    },
  },
});

export default vuetify;
