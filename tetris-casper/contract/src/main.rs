#![no_std]
#![no_main]

#[cfg(not(target_arch = "wasm32"))]
compile_error!("target arch should be wasm32: compile with '--target wasm32-unknown-unknown'");

extern crate alloc;
use alloc::string::String;
use alloc::vec;
use core::convert::TryInto;

use casper_contract::{
    contract_api::{runtime, storage},
    unwrap_or_revert::UnwrapOrRevert,
};
use casper_types::{
    contracts::{EntryPoint, EntryPointAccess, EntryPointType, EntryPoints},
    CLType, Parameter, Key,
};

const KEY_NAME: &str = "account";
const VALUE_NAME: &str = "result";

#[no_mangle]
pub extern "C" fn store_result() {
    
    let key: String = runtime::get_named_arg(KEY_NAME);
    let value: String = runtime::get_named_arg(VALUE_NAME);
    
    match runtime::get_key(key.as_str()) {
        Some(key) => {
            let key_ref = key.try_into().unwrap_or_revert();
            storage::write(key_ref, value.as_str());
        }
        None => {
            let value_ref = storage::new_uref(value);
            let value_key = Key::URef(value_ref);
            runtime::put_key(key.as_str(), value_key);
        }
    }
}

#[no_mangle]
pub extern "C" fn call() {
    
    let mut counter_entry_points = EntryPoints::new();
    counter_entry_points.add_entry_point(EntryPoint::new(
        "store_result",
        vec![
            Parameter::new("account", CLType::String),
            Parameter::new("result", CLType::String),
        ],
        CLType::Unit,
        EntryPointAccess::Public,
        EntryPointType::Contract,
    ));
    
    let (stored_contract_hash, _) = storage::new_locked_contract(counter_entry_points, None, None, None);
    runtime::put_key("tetris-casper", stored_contract_hash.into());

}
