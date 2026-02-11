# Image Optimization

Pipeline for optimizing blog images using [sharp](https://sharp.pixelplumbing.com/). Includes a staging workflow for new images and a bulk optimizer for existing images.

## Overview

The project uses two Node.js scripts powered by `sharp` (installed as a dev dependency) to resize and compress blog images:

| Script | Command | Purpose |
|--------|---------|---------|
| `scripts/optimize-images.mjs` | `npm run images:optimize` | Process new images from staging |
| `scripts/optimize-existing-images.mjs` | `node scripts/optimize-existing-images.mjs` | One-off bulk optimization |

## Staging Workflow

The primary workflow for adding new blog images.

### How It Works

1. Drop images into `public/images/blog/_staging/` using the naming convention
2. Run `npm run images:optimize`
3. Images are resized, compressed, and moved to `public/images/blog/posts/{slug}/`
4. Staging files are deleted after successful processing

### Staging File Naming Convention

**Format:** `{slug}--{name}.{ext}`

The double-dash (`--`) separates the post slug from the image name.

| Staging filename | Output path |
|-----------------|-------------|
| `my-post--hero.jpg` | `posts/my-post/hero.jpg` |
| `my-post--screenshot.png` | `posts/my-post/screenshot.jpg` |
| `my-post--diagram.webp` | `posts/my-post/diagram.webp` |

**Invalid names** (missing `--` separator) are skipped with a warning.

### Commands

```bash
# Process all staged images
npm run images:optimize

# Preview what would happen (no files modified)
npm run images:optimize -- --dry-run

# Process and also generate WebP variants
npm run images:optimize -- --webp

# Combine flags
npm run images:optimize -- --dry-run --webp
```

### Example Output

```
Blog Image Optimizer
====================

Found 3 image(s) to process:

  Processing: my-post--hero.jpg
    -> posts/my-post/hero.jpg
    120.5KB -> 45.2KB (62.5% reduction)

  Processing: my-post--screenshot.png
    -> posts/my-post/screenshot.jpg
    744.0KB -> 61.3KB (91.8% reduction)

--------------------
Processed: 2 | Errors: 0
Total: 864.5KB -> 106.5KB (87.7% reduction)
```

## Optimization Presets

The staging optimizer auto-selects a preset based on the image name and aspect ratio:

| Preset | Dimensions | Fit | Used when |
|--------|-----------|-----|-----------|
| `hero` | 1400 x 700 | cover | Image named `hero*` with landscape aspect ratio |
| `hero-square` | 800 x 800 | cover | Image named `hero*` with square aspect ratio (0.8-1.2) |
| `default` | 1200 x auto | inside | All other images |

**Aspect ratio detection:** For hero images, the script reads the original dimensions. If the aspect ratio is between 0.8 and 1.2, it uses the `hero-square` preset; otherwise, it uses the landscape `hero` preset.

**No upscaling:** Images smaller than the preset dimensions are not enlarged (`withoutEnlargement: true`).

## Quality Settings

| Format | Quality | Notes |
|--------|---------|-------|
| JPEG (from JPEG) | 80 | mozjpeg compression |
| JPEG (from PNG) | 85 | Opaque PNGs are converted to JPEG |
| PNG (with transparency) | 80 | Compression level 9, preserves alpha |
| WebP | 80 | Only when `--webp` flag is used |
| AVIF | 60 | Preserved if input is AVIF |

### PNG Handling

- **Opaque PNGs** (no transparency): Automatically converted to JPEG for better compression
- **Transparent PNGs**: Kept as PNG with maximum compression
- This is the biggest optimization win (e.g., 744KB PNG -> 61KB JPEG = 91.8% reduction)

## Bulk Optimizer (Existing Images)

For one-off optimization of images already in `public/images/blog/`:

```bash
# Optimize all existing blog images in-place
node scripts/optimize-existing-images.mjs

# Preview what would happen
node scripts/optimize-existing-images.mjs --dry-run
```

### How It Differs from Staging

| Aspect | Staging (`images:optimize`) | Bulk (`optimize-existing-images`) |
|--------|---------------------------|----------------------------------|
| Input dir | `_staging/` | `posts/` and `shared/` |
| Output | Moves to `posts/{slug}/` | Overwrites in-place |
| Naming | Requires `{slug}--{name}.{ext}` | Uses existing filenames |
| Safety | Deletes staging file after | Only replaces if size reduced |
| Usage | Ongoing workflow | One-off cleanup |

### Safety Mechanism

The bulk optimizer writes to a temporary file first, then only replaces the original if the optimized version is smaller. If the optimization doesn't reduce file size, the original is kept unchanged.

## Supported Formats

| Extension | Supported | Notes |
|-----------|-----------|-------|
| `.jpg` / `.jpeg` | Yes | Primary format for photos |
| `.png` | Yes | Converted to JPEG if opaque |
| `.webp` | Yes | Modern format, good compression |
| `.avif` | Yes | Next-gen format |

## Adding Images to a New Blog Post

Complete workflow for adding images when creating a new blog post:

1. **Prepare images** with the staging naming convention:
   ```
   my-new-post--hero.jpg
   my-new-post--diagram.png
   ```

2. **Drop into staging:**
   ```bash
   cp my-new-post--hero.jpg public/images/blog/_staging/
   cp my-new-post--diagram.png public/images/blog/_staging/
   ```

3. **Run optimizer:**
   ```bash
   npm run images:optimize
   ```

4. **Verify output:**
   ```bash
   ls public/images/blog/posts/my-new-post/
   # hero.jpg  diagram.jpg
   ```

5. **Reference in frontmatter:**
   ```markdown
   ---
   heroImage: '/images/blog/posts/my-new-post/hero.jpg'
   heroLayout: 'banner'
   ---

   ![Diagram](/images/blog/posts/my-new-post/diagram.jpg)
   ```

## Directory Structure

```
public/images/blog/
├── posts/                    # Optimized per-post images (output)
│   ├── {slug}/
│   │   ├── hero.{ext}
│   │   └── {name}.{ext}
│   └── ...
├── shared/                   # Shared images (placeholders, common)
└── _staging/                 # Drop zone for new images (input)
    └── {slug}--{name}.{ext}

scripts/
├── optimize-images.mjs       # Staging workflow optimizer
└── optimize-existing-images.mjs  # One-off bulk optimizer
```

## Related Documentation

- [Blog Posts](./BLOG_POSTS.md) - Blog post structure, naming, and hero layouts
- [Public Assets](./PUBLIC_ASSETS.md) - General static assets structure
- [Performance Guide](../PERFORMANCE.md) - Site performance best practices
