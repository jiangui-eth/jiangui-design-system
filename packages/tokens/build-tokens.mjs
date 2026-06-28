import StyleDictionary from 'style-dictionary';

const prefix = 'ds';

// ── Light mode: primitive + all semantic (light) + component ─────────────────
const sdLight = new StyleDictionary({
  source: [
    'src/primitive/**/*.json',
    'src/semantic/color.json',
    'src/semantic/spacing.json',
    'src/semantic/typography.json',
    'src/component/**/*.json',
  ],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix,
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: { outputReferences: true },
        },
      ],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/js/',
      files: [{ destination: 'tokens.mjs', format: 'javascript/es6' }],
    },
    ts: {
      transformGroup: 'js',
      buildPath: 'dist/',
      files: [{ destination: 'tokens.d.ts', format: 'typescript/es6-declarations' }],
    },
  },
});

// ── Dark mode: primitive + semantic dark overrides → [data-theme="dark"] ─────
const sdDark = new StyleDictionary({
  source: [
    'src/primitive/**/*.json',
    'src/semantic/color.dark.json',
  ],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix,
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'tokens.dark.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
            selector: '[data-theme="dark"]',
          },
          filter: (token) => token.filePath.includes('color.dark'),
        },
      ],
    },
  },
});

await sdLight.buildAllPlatforms();
await sdDark.buildAllPlatforms();

console.log('\n✅  Style Dictionary build complete.');
