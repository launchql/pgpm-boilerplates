# ____moduleName____

<p align="center" width="100%">
  <img height="250" src="https://raw.githubusercontent.com/constructive-io/constructive/refs/heads/main/assets/outline-logo.svg" />
</p>

____moduleDesc____

A PostgreSQL extension written in Rust using [pgrx](https://github.com/pgcentralfoundation/pgrx).

## Prerequisites

- Rust toolchain (rustup recommended)
- PostgreSQL development headers
- pgrx CLI: `cargo install cargo-pgrx`
- Initialize pgrx: `cargo pgrx init`

## Building

```sh
# Build the extension
make build

# Install to PostgreSQL
make install

# Run tests
make test

# Clean build artifacts
make clean
```

## Usage

After installation, enable the extension in your database:

```sql
CREATE EXTENSION ____moduleName____;

-- Test the extension
SELECT hello_____moduleName____();
```

## Development

```sh
# Run pgrx development server
cargo pgrx run

# Run tests
cargo pgrx test
```

## Credits

**Built by the [Constructive](https://constructive.io) team — creators of modular Postgres tooling for secure, composable backends. If you like our work, contribute on [GitHub](https://github.com/constructive-io).**

## Disclaimer

AS DESCRIBED IN THE LICENSES, THE SOFTWARE IS PROVIDED "AS IS", AT YOUR OWN RISK, AND WITHOUT WARRANTIES OF ANY KIND.

No developer or entity involved in creating this software will be liable for any claims or damages whatsoever associated with your use, inability to use, or your interaction with other users of the code, including any direct, indirect, incidental, special, exemplary, punitive or consequential damages, or loss of profits, cryptocurrencies, tokens, or anything else of value.
