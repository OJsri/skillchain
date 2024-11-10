const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    client: String,
    freelancer: String,
    title: String,
    description: String,
    payment: Number,
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
}, { collection: 'main' });
taskSchema.index({ description: 'text' })

const Task = mongoose.model('Task', taskSchema);
const { Aptos, AptosConfig, Network, Ed25519PrivateKey, PrivateKey } = require('@aptos-labs/ts-sdk')

const client = new Aptos(
    new AptosConfig({
        network: Network.DEVNET
    })
);
 

exports.createTask = async (req, res) => {
    console.log('createTask')
    try {
        const { client, freelancer, description, payment } = req.body;
        
        const task = new Task({ client, freelancer, description, payment });
        await task.save();
        
        res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error creating task', error });
    }
};

exports.searchTask = async(req, res) => {
    console.log('searchTask');
    try {
        const searchTerm = req.body;

        const result = await Task.find({ $text: { $search: searchTerm } });
        res.status(200).json({ message: 'Searched successfully', result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error searching tasks', error });
    }
}

exports.depositPayment = async (req, res) => {
    console.log('depositPayment')
    try {
        const { clientPrivateKey, clientAddress, freelancer, payment } = req.body;
        const formattedPrivateKey = clientPrivateKey.startsWith('0x')
            ? clientPrivateKey.slice(2)
            : clientPrivateKey;
        const clientAccount = await client.deriveAccountFromPrivateKey({
            privateKey: new Ed25519PrivateKey(PrivateKey.formatPrivateKey(formattedPrivateKey, 'ed25519'))
        });
        
        const transaction = await client.transaction.build.simple({
            sender: clientAccount.accountAddress,
            data: {
                function: "SkillChain::EscrowPayment::deposit",
                functionArguments: [freelancer, payment]
            }
        });
        const senderAuth = client.transaction.sign({
            signer: clientAccount,
            transaction
        });
        const submittedTxn = await client.transaction.submit.simple({
            transaction,
            senderAuth
        });
        const executedTxn = await client.waitForTransaction({
            transactionHash: submittedTxn.hash
        });
        console.log(executedTxn)

        res.status(200).json({ message: 'Payment deposited to escrow', txnHash });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error depositing payment', error });
    }
};
