var nodes7 = require('nodes7'); // This is the package name, if the repository is cloned you may need to require 'nodeS7' with uppercase S
var conn = new nodes7;

var doneReading = false;
var doneWriting = false;

var tagPrefix = "DB1.";
var intTag = "DBW2";
var realTag = "DBD4";

var variables = {
      TEST0: 'DB1,INT2',    // Single int 
      TEST1: 'DB1,REAL4'  // Single real
};

conn.initiateConnection({ port: 102, host: '192.168.10.11', rack: 0, slot: 3 }, connected);

function connected(err) {
  if (typeof(err) !== "undefined") {
    console.log(err);
    process.exit();
  }

  conn.setTranslationCB(function(tag) { 
      return variables[tag]; 
  });
  
  conn.addItems(['TEST0', 'TEST1']);
  conn.readAllItems(valuesReady);
}

function valuesReady(anythingBad, values) {
  if (anythingBad){ 
      console.log("SOMETHING WENT WRONG READING VALUES!!!!"); 
  }
  console.log(values);
  doneReading = true;
  if (doneWriting) { 
      process.exit(); 
  }
}