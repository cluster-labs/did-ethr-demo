//Use 'ethjs-provider-http' instead of 'web3' due to this issue: https://github.com/uport-project/ethr-did/issues/3#issuecomment-413908925
const HttpProvider = require('ethjs-provider-http')
let provider = new HttpProvider('https://rinkeby.infura.io')

const resolve = require('did-resolver').default;
const registerEthrDidToResolver = require('ethr-did-resolver').default
const EthrDID = require('ethr-did');

let test = async () => {
    //Registery address for ethr did
    let registryAddress = '0xdCa7EF03e98e0DC2B855bE647C39ABe984fcF21B'

    //Generating Eth keyPair
    const keypair = EthrDID.createKeyPair()

    //Generating Ethr DID
    const ethrDid = new EthrDID({
        ...keypair,
        provider,
        registry: registryAddress
    })
    console.log('Ethr DID\n\n', ethrDid)

    let did = ethrDid.did

    //Registering Ethr Did To Resolver
    registerEthrDidToResolver({
        provider,
        registry: registryAddress,
    })

    //Resolving Ethr DID to DID document
    resolve(did)
        .then(didDocument => {
            console.log('\n\nEthr DID Document\n\n')
            console.dir(didDocument)
        })
        .catch(error => {
            console.error(error)
        })
}

test()