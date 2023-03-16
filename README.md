# mongodb_oplog_scripts

Utility scripts for analyzing MongoDB OpLog via mongo shell

tail_oplog.js - tail OpLog

usage: mongosh "mongodb+srv://[cluster]" --username [username] --file tail_oplog.js
  

run_get_oplog_summary.js - wrapper to invoke get_oplog_summary.js

usage: 

mongo "mongodb+srv://[cluster]" --apiVersion 1 --username [username] run_get_oplog_summary.js

mongosh "mongodb+srv://[cluster]" --apiVersion 1 --username [username] --file run_get_oplog_summary.js
Note: runs much faster using mongo

get_total_ops_by_hour.js - MongoDB aggregation to get total number of OpLog entries by hour

usage:

mongosh "mongodb+srv://<cluster>" --apiVersion 1 --username <username> --file get_total_ops_by_hour.js

mongo "mongodb+srv://<cluster>" --apiVersion 1 --username <username> get_total_ops_by_hour.js 
  
get_oplog_summary.js - function to get OpLog summary over given time span

update_summary.js - function to maintain OpLog summary

  

  
