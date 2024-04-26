const primary = '#6BFFB8';
const secondary = '#4E6356';
const tertiary = '#7CFEF0';
const neutral = '#F5F5F5';
const error = '#FF5449';
const surface = '#F4FBF3';
const surfaceContainer = '#E8F0E8';
const surfaceContainerLow = '#F0F5EE';
const onSurface = '#161D18';
const surfaceDark = '#0F1511';
const surfaceContainerDark = '#1B211D';
const surfaceContainerDarkHigh = '#262B27';
const onSurfaceDark = '#DFE4DD';
const outline = '#707972';
const outlineDark = '#C0C9C1';
const nv80 = '#8A938B';
const p40 = '#006C46';
const p80 = '#46DF9B';
const p90 = '#A3F4C5';
const p30 = '#005233';
const p10 = '#002112';
const s40 = '#486553';
const s80 = '#8F9E8F';

export default {
  light: {
    primary: primary,
    secondary: secondary,
    tertiary: tertiary,
    neutral: neutral,
    error: error,
    onPrimary: p10,
    surace: surface,
    surfaceContainer: surfaceContainer,
    surfaceContainerLow: surfaceContainerLow,
    text: onSurface,
    background: neutral,
    outline: outline,
    tint: p40,
    tabIconDefault: nv80,
    tabIconSelected: p10,
  },
  dark: {
    primary: primary,
    secondary: secondary,
    tertiary: tertiary,
    neutral: neutral,
    error: error,
    onPrimary: p10,
    surace: surfaceDark,
    surfaceContainer: surfaceContainerDark,
    surfaceContainerDarkHigh: surfaceContainerDarkHigh,
    text: onSurfaceDark,
    background: surfaceDark,
    outline: outlineDark,
    tint: p90,
    tabIconDefault: nv80,
    tabIconSelected: p10,
  },
};