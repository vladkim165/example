// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DOMAIN: process.env.DOMAIN, // Если нужно использовать и на клиенте и на сервере
    UTM_MEDIUM: process.env.UTM_MEDIUM,
    SITE_NAME: process.env.SITE_NAME,
    // @ts-ignore
    LANGS_LIST: process.env.LANGS_LIST || [],
    LANG_INCREMENT_SUFFIX: process.env.LANG_INCREMENT_SUFFIX || '',
  },
  webpack: (config) => {
    // некст не имеет встроенного функционала для превращения кебаба в кемел, поэтому временный костыль(возможно в будущем добавят фичу)
    // https://github.com/vercel/next.js/discussions/11267
    const rules = config.module.rules.find((rule) => typeof rule.oneOf === 'object').oneOf.filter((rule) => Array.isArray(rule.use));

    rules.forEach((rule) => {
      rule.use.forEach((moduleLoader) => {
        if (/css-loader\/(?:cjs|dist|src)/.test(moduleLoader.loader)) {
          if (typeof moduleLoader.options.modules === 'object') {
            moduleLoader.options.modules = {
              ...moduleLoader.options.modules,
              exportLocalsConvention: 'camelCaseOnly', // https://github.com/webpack-contrib/css-loader#exportlocalsconvention
            };
          }
        }
      });
    });

    config.experiments = { ...config.experiments, topLevelAwait: true };

    return config;
  },
};

export default nextConfig;
