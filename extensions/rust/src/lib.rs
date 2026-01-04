use pgrx::prelude::*;

pgrx::pg_module_magic!();

#[pg_extern]
fn hello_____moduleName____() -> &'static str {
    "Hello from ____moduleName____!"
}

#[cfg(any(test, feature = "pg_test"))]
#[pg_schema]
mod tests {
    use pgrx::prelude::*;

    #[pg_test]
    fn test_hello() {
        assert_eq!("Hello from ____moduleName____!", crate::hello_____moduleName____());
    }
}

#[cfg(test)]
pub mod pg_test {
    pub fn setup(_options: Vec<&str>) {}

    pub fn postgresql_conf_options() -> Vec<&'static str> {
        vec![]
    }
}
