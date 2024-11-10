module SkillChain::EscrowPayment {
    use aptos_framework::coin;
    use aptos_framework::signer;

    struct TaskEscrow has key {
        client: address,
        freelancer: address,
        payment: u64,
        is_completed: bool,
    }

    // Deposit payment to escrow
    public entry fun deposit(client: &signer, freelancer: address, payment: u64) {
        let escrow = TaskEscrow {
            client: signer::address_of(client),
            freelancer,
            payment,
            is_completed: false,
        };
        move_to(client, escrow);
    }

    // Confirm task completion by the freelancer
    public fun confirm_completion(freelancer: &signer, client_address: address) acquires TaskEscrow {
        let escrow = borrow_global_mut<TaskEscrow>(client_address);
        assert!(escrow.freelancer == signer::address_of(freelancer), 1);
        escrow.is_completed = true;
    }

    // Release payment to the freelancer after confirmation
    public fun release_payment(client: &signer) acquires TaskEscrow {
        let escrow = borrow_global_mut<TaskEscrow>(signer::address_of(client));
        assert!(escrow.is_completed, 2);

        // Transfer payment to freelancer
        coin::transfer<aptos_framework::coin::AptosCoin>(client, escrow.freelancer, escrow.payment);
        move_from<TaskEscrow>(signer::address_of(client)); // Remove the escrow record
    }
}