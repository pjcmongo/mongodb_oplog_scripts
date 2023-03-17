//
// MongoDB aggregation to get total number of OpLog entries by hour
//

setDatePartsTZ = { $set: {datePartsTZ: {$dateToParts: {date:'$wall'}}}}
groupfield = { year: "$datePartsTZ.year", month: "$datePartsTZ.month", day: "$datePartsTZ.day", hour: "$datePartsTZ.hour" }
groupstage = { $group: { _id: groupfield, totalOps: { $sum: 1} } }
sort2 = { $sort: {_id:1 }}
proj = { $project: { _id:0, hour: { $concat: [ {$toString:"$_id.month"}, "-", {$toString:"$_id.day"}, "-", {$toString:"$_id.year"}, "T", {$toString:"$_id.hour"}, ":00"] }, totalOps:1 } }
printjson(db.getSiblingDB("local").oplog.rs.aggregate([setDatePartsTZ, groupstage,sort2,proj]).toArray())
