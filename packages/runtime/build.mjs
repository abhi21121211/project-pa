import esbuild from 'esbuild';

const isWatch = process.argv.includes('--watch');

const context = await esbuild.context({
    entryPoints: ['src/index.js'],
    bundle: true,
    minify: true,
    sourcemap: true,
    target: ['es2022'],
    format: 'iife',
    globalName: 'ProjectPA',
    outfile: 'dist/project-pa.min.js',
    loader: { '.css': 'text' },
    banner: {
        js: '/*! Project PA v1.0.0 | MIT License */'
    }
});

if (isWatch) {
    await context.watch();
    console.log('👀 Watching for changes...');
} else {
    await context.rebuild();
    console.log('✅ Build complete: dist/project-pa.min.js');
    await context.dispose();
}
