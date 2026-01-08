# ____repoName____

<p align="center" width="100%">
  <img height="250" src="https://raw.githubusercontent.com/constructive-io/constructive/refs/heads/main/assets/outline-logo.svg" />
</p>

<p align="center" width="100%">
  <a href="https://github.com/____username____/____repoName____/actions/workflows/ci.yml">
    <img height="20" src="https://github.com/____username____/____repoName____/actions/workflows/ci.yml/badge.svg" />
  </a>
</p>

A workspace for PostgreSQL extensions built with Rust and C.

## Prerequisites

- PostgreSQL development headers (`postgresql-server-dev-XX` or similar)
- For Rust extensions: Rust toolchain and `pgrx`
- For C extensions: C compiler (gcc/clang)

## Building

```sh
# Build all extensions
make build

# Install all extensions
make install

# Run tests
make test

# Clean build artifacts
make clean
```

## Credits

**Built by the [Constructive](https://constructive.io) team — creators of modular Postgres tooling for secure, composable backends. If you like our work, contribute on [GitHub](https://github.com/constructive-io).**

## Disclaimer

AS DESCRIBED IN THE LICENSES, THE SOFTWARE IS PROVIDED "AS IS", AT YOUR OWN RISK, AND WITHOUT WARRANTIES OF ANY KIND.

No developer or entity involved in creating this software will be liable for any claims or damages whatsoever associated with your use, inability to use, or your interaction with other users of the code, including any direct, indirect, incidental, special, exemplary, punitive or consequential damages, or loss of profits, cryptocurrencies, tokens, or anything else of value.
