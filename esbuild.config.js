const esbuild = require('esbuild');
const sassPlugin = require('esbuild-plugin-sass');

esbuild.build({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  minify: true,
  treeShaking: true,
  sourcemap: false,
  outdir: 'build',
  plugins: [sassPlugin()],
  external: ['electron', 'fs', 'path', 'os', 'crypto'],
  loader: { '.ts': 'ts', '.tsx': 'tsx', '.js': 'js', '.jsx': 'jsx', '.png': 'file', '.svg': 'file', '.ico': 'file', '.ttf':'file' },
  define: { 'process.env.NODE_ENV': '"production"' },
  target: ['chrome80'],
}).catch(() => process.exit(1));