const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  const config = {
    transformer: {
      // Transformador para permitir importar SVGs como componentes
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      // Quitar svg de assetExts y agregarlo a sourceExts
      assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
    },
  };

  return mergeConfig(defaultConfig, config);
})();
