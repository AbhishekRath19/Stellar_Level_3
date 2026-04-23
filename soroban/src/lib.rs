#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, Address, Env, String, Symbol};

#[contract]
pub struct NonFungibleToken;

#[contractimpl]
impl NonFungibleToken {
    pub fn mint(env: Env, to: Address, id: u32, metadata: String) {
        to.require_auth();
        env.storage().instance().set(&id, &metadata);
        env.storage().instance().set(&symbol_short!("owner"), &to);
    }

    pub fn get_metadata(env: Env, id: u32) -> String {
        env.storage()
            .instance()
            .get(&id)
            .unwrap_or(String::from_str(&env, "No metadata"))
    }
}
