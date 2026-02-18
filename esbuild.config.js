const esbuild = require('esbuild');
const sassPlugin = require('esbuild-plugin-sass');

esbuild.build({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  minify: true,
  sourcemap: false,
  outdir: 'build',
  plugins: [sassPlugin()],
  loader: { '.ts': 'ts', '.tsx': 'tsx', '.js': 'js', '.jsx': 'jsx', '.png': 'file', '.svg': 'file', '.ico': 'file', '.ttf':'file' },
  define: { 'process.env.NODE_ENV': '"production"' },
  target: ['chrome105'],
}).catch(() => process.exit(1));