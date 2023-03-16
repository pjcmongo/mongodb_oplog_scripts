//
// get_oplog_summary examples
//


load( "get_oplog_summary.js" )
//printjson(get_oplog_summary(new Date(new Date().setDate(new Date().getDate()-1)), new Date()))

//use defaults - last 24 hours
//printjson(get_oplog_summary())

//get summary over time frame
printjson(get_oplog_summary(new ISODate("2023-03-16T16:00:00"), new ISODate("2023-03-16T17:00:00")))
