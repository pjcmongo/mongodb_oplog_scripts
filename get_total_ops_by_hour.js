setDatePartsTZ = { $set: {datePartsTZ: {$dateToParts: {date:'$wall'}}}}
groupfield = { year: "$datePartsTZ.year", month: "$datePartsTZ.month", day: "$datePartsTZ.day", hour: "$datePartsTZ.hour" }
groupstage = { $group: { _id: groupfield, totalOps: { $sum: 1} } }
sort2 = { $sort: {_id:1 }}
printjson(db.getSiblingDB("local").oplog.rs.aggregate([setDatePartsTZ, groupstage,sort2]).toArray())
