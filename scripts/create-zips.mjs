import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import archiver from 'archiver'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const deliverablesDir = path.join(rootDir, 'deliverables')

const netlifyZipPath = path.join(deliverablesDir, 'muhammad-farhan-portfolio-netlify.zip')
const sourceZipPath = path.join(deliverablesDir, 'muhammad-farhan-portfolio-source.zip')

const SOURCE_EXCLUDES = new Set([
  'node_modules',
  '.git',
  'deliverables',
  'dist',
  '.DS_Store',
])

function log(message) {
  console.log(`[create-zips] ${message}`)
}

function fail(message, err) {
  console.error(`[create-zips] ERROR: ${message}`)
  if (err) console.error(err)
  process.exit(1)
}

function ensureDeliverablesDir() {
  if (!fs.existsSync(deliverablesDir)) {
    fs.mkdirSync(deliverablesDir, { recursive: true })
    log(`Created deliverables directory at ${deliverablesDir}`)
  }
}

function removeOldZip(zipPath) {
  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath)
    log(`Removed existing archive: ${path.basename(zipPath)}`)
  }
}

function createZip(outputPath, populate) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputPath)
    const archive = archiver('zip', { zlib: { level: 9 } })

    output.on('close', () => resolve(archive.pointer()))
    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        log(`Warning: ${err.message}`)
      } else {
        reject(err)
      }
    })
    archive.on('error', reject)

    archive.pipe(output)
    populate(archive)
    archive.finalize()
  })
}

async function buildNetlifyZip() {
  if (!fs.existsSync(distDir)) {
    fail(`dist/ directory not found. Run "npm run build" before packaging.`)
  }

  removeOldZip(netlifyZipPath)

  const bytes = await createZip(netlifyZipPath, (archive) => {
    // Contents of dist/ go directly at the archive root (not nested inside "dist/").
    archive.directory(distDir, false)
  })

  log(`Created ${path.basename(netlifyZipPath)} (${(bytes / 1024).toFixed(1)} KB)`)
}

async function buildSourceZip() {
  removeOldZip(sourceZipPath)

  const bytes = await createZip(sourceZipPath, (archive) => {
    const entries = fs.readdirSync(rootDir)
    for (const entry of entries) {
      if (SOURCE_EXCLUDES.has(entry)) continue
      const fullPath = path.join(rootDir, entry)
      const stat = fs.statSync(fullPath)
      if (stat.isDirectory()) {
        archive.directory(fullPath, entry)
      } else {
        archive.file(fullPath, { name: entry })
      }
    }
  })

  log(`Created ${path.basename(sourceZipPath)} (${(bytes / 1024).toFixed(1)} KB)`)
}

function verifyNetlifyZipRoot() {
  // Lightweight verification: read the central directory listing via a fresh
  // require of the archiver output would need another package, so we just
  // confirm the file exists and is non-empty. Deeper verification (that
  // index.html sits at the archive root) is done via `unzip -l` in the
  // project README's manual QA steps.
  const stat = fs.statSync(netlifyZipPath)
  if (stat.size === 0) {
    fail(`${path.basename(netlifyZipPath)} was created but is empty.`)
  }
}

async function main() {
  log('Starting packaging...')
  ensureDeliverablesDir()
  await buildNetlifyZip()
  await buildSourceZip()
  verifyNetlifyZipRoot()
  log('Packaging complete.')
  log(`Netlify ZIP:     ${netlifyZipPath}`)
  log(`Source-code ZIP: ${sourceZipPath}`)
}

main().catch((err) => fail('Packaging failed.', err))
