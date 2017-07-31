$(document).ready(function(){
	$("a").click(function(){
		$("a").removeClass('active');
		$(this).addClass('active');
})});
var arr = [];
function cleared() {
	document.getElementById("input1").value = null;
	document.getElementById("input2").value = null;
	document.getElementById("input3").value = null;
	arr = []; 
}
window.onload = function(){
	document.getElementById("input1").value = null;
	document.getElementById("input2").value = null;
	document.getElementById("input3").value = null;
};

function stringHash(string) {
  var hash = 0, i, chr;
  if (string.length === 0) return hash;
  for (i = 0; i < string.length; i++) {
    chr   = string.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

function showEnroll() {
	var verify = document.getElementById("verify");
	var enroll = document.getElementById("enroll");
    verify.style.display="none";
    enroll.style.display="block";
}
function showVerify() {
	var verify = document.getElementById("verify");
	var enroll = document.getElementById("enroll");
	enroll.style.display="none";
    verify.style.display="block";
}
function encodeImageFileAsURL(element) {
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function() {
    console.log('RESULT', reader.result);
    arr.push(stringHash(reader.result).toString());
  }
  reader.readAsDataURL(file);
}

//var Web3 = require('web3');
//var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"document","type":"string"}],"name":"addEntry","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"document","type":"string"}],"name":"calculateProof","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"document","type":"string"}],"name":"checkEntry","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"proof","type":"bytes32"}],"name":"storeProof","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"proof","type":"bytes32"}],"name":"hasProof","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"}]');
bioidContract = web3.eth.contract(abi);
contractInstance = bioidContract.at('0xe4c33c095a9c1b979852727205851ef870b4d851');

var version = web3.version.api;
console.log(version);

function verify(){
	if (contractInstance.checkEntry(arr[0]+arr[1]+arr[2],{from: web3.eth.accounts[0]})==true) {
    alert("Authentication Successfull");
    cleared();
  }
  else{
    alert("Authentication Failed");
  }
}

function enroll(){
	contractInstance.addEntry(arr[0]+arr[1]+arr[2],{from: web3.eth.accounts[0]});
  alert("Successfully Enrolled");
  cleared();
}