pragma solidity ^0.4.2;

// Proof of Existence contract, version 3

contract bioid {
  //event ReturnValue(address indexed _from, int256 _value);

  mapping (bytes32 => bool) private proofs;

  // store a proof of existence in the contract state

  function storeProof(bytes32 proof) {
    proofs[proof] = true;
  }

  // calculate and store the proof for a document

  function addEntry(string document) {
    var proof = calculateProof(document);
    storeProof(proof);
  }

  // helper function to get a document's sha256

  function calculateProof(string document) constant returns (bytes32) {
    return sha256(document);
  }

  // check if a document has been notarized

  function checkEntry(string document) constant returns (bool) {
    var proof = calculateProof(document);
    return hasProof(proof);
  }

  // returns true if proof is stored

  function hasProof(bytes32 proof) constant returns(bool) {
    return proofs[proof];
  }
}
