function updateSummary(summary, doc) {
    if (!("startTime" in summary)) summary.startTime = doc.wall
    summary.endTime = doc.wall

    if (!(doc.ns in summary)) {
        summary[`${doc.ns}`] = {}
        if( doc.ns == "") {
            summary[`${doc.ns}`].noop = 0    
        }
        else {
            summary[`${doc.ns}`].update = 0
            summary[`${doc.ns}`].insert = 0
            summary[`${doc.ns}`].command = 0
            summary[`${doc.ns}`].delete = 0
        }
        summary[`${doc.ns}`].maxBsonSize = 0
        summary[`${doc.ns}`].totalBsonSize = 0
        summary[`${doc.ns}`].avgBsonSize = 0
        summary[`${doc.ns}`].totalOps = 0
    }
    var bsize = bsonsize(doc);
    if(bsize > summary[`${doc.ns}`].maxBsonSize) summary[`${doc.ns}`].maxBsonSize = bsize
    summary[`${doc.ns}`].totalBsonSize += bsize
    ++summary[`${doc.ns}`].totalOps
    summary[`${doc.ns}`].avgBsonSize = summary[`${doc.ns}`].totalBsonSize / summary[`${doc.ns}`].totalOps

    switch (doc.op) {
        case "c": 
            ++summary[`${doc.ns}`].command;
            break;
        case "u": 
            ++summary[`${doc.ns}`].update;
            break;
        case "i": 
            ++summary[`${doc.ns}`].insert;
            break;
        case "d": 
            ++summary[`${doc.ns}`].delete;
            break;
        case "n":
            ++summary[`${doc.ns}`].noop;
            break;
    }
    return summary;
}
