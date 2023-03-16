load( "update_summary.js" )

//
// get oplog summary for time span
// usage examples:
// get OpLog summary for last 24 hours
// print(get_oplog_summary(new Date(new Date().setDate(new Date().getDate()-1)), new Date())))
//
// get OpLog summary for specifc time frame
// print(get_oplog_summary(new ISODate("2023-03-03T20:50"), new ISODate("2023-03-03T20:51"))))


function get_oplog_summary(start_date = new Date(new Date().setDate(new Date().getDate()-1)), stop_date = new Date())  {
    let summary = {}
    let docCount = 0
    let st = ISODate()
    db.getSiblingDB("local").oplog.rs.find({"wall" : { $gte: start_date, $lt: stop_date } }).forEach(function(doc) {
        if (docCount && !(docCount % 100000)) {
            print(`${docCount} docs processed, wall:` + doc.wall.toISOString() + ` in ${ISODate()-st} ms`)
        }
        ++docCount
        summary = updateSummary(summary, doc)
    });

    print(`${docCount} docs processed in ${ISODate()-st} milliseconds`)
    return summary;
}
