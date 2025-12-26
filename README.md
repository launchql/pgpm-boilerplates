# pgpm-boilerplates

Boilerplate templates for use with [@genomic/scaffolds](https://www.npmjs.com/package/@genomic/scaffolds) and other [genomic](https://www.npmjs.com/package/genomic) tooling for building CLIs and applications that leverage scaffolding and boilerplates.

## Structure

```
default/
├── module/      # Single package/module template
└── workspace/   # Monorepo workspace template
```

## Placeholders

Templates use the `____placeholder____` pattern (4 underscores on each side) for variable substitution. These are replaced by `@genomic/scaffolds` during project generation.

## Scripts

### Find Placeholders

Scan templates for placeholder variables:

```bash
# Install dependencies
npm install

# Search entire repo
npm run find-placeholders

# Search specific directory
npm run find-placeholders -- ./default/module
```

This outputs all placeholders found, grouped by directory, with file locations and context.
