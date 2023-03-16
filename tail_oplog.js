load( "update_summary.js" )

//
// tail MongoDB OpLog
// usage: mongosh "mongodb+srv://[cluster]" --username <username> --file tail_oplog.js
//

// modify to change number of summary reports to print
let maxItCount = 10 

// modify to change report interval - 1000 prints report every 1000 cursor iterations
let reportInterval = 1000

let cumulativeSummary = {}
let incSummary = {}
let docCount = 0
let itCount = 0
let c = db.getSiblingDB("local").oplog.rs.find({"wall" : { $gt: new Date(), }}).tailable().maxAwaitTimeMS(10000)
while (c.hasNext() && itCount < maxItCount) {
    let doc = c.next();
    if (docCount && !(docCount % reportInterval)) {
        print("****************************************")
        print("Incremental Summary")
        printjson(incSummary);
        incSummary = {};
        print("Cumulative Summary")
        printjson(cumulativeSummary);
        ++itCount
    }
    ++docCount
    incSummary = updateSummary(incSummary, doc)
    cumulativeSummary = updateSummary(cumulativeSummary, doc)
}
