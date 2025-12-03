export default ({ env }) => ({
  // Enable i18n for Polish language support
  i18n: {
    enabled: true,
    config: {
      defaultLocale: 'pl',
      locales: ['pl', 'en'],
    },
  },
  // Users & Permissions plugin
  'users-permissions': {
    enabled: true,
    config: {
      jwt: {
        expiresIn: '7d',
      },
    },
  },
});

