const route = require('express').Router()

// Endpoints relativos a NEAs
const NeasModel = require('../models/Neas')

//punto1
// next: `http://${req.headers.host}/neas?clas=${cl}`

route.get("/", async (req, res, next) => {
    try {

        const cl = req.query.cl
        const result = await NeasModel.find({ orbit_class: cl }, { _id: 0, designation: 1, period_yr: 1, orbit_class: 1 })

        res.status(200).json({
            success: true,
            data: result,
        })
    } catch (error) {
        console.error('> error retrieving neas: ', error.message)

        next(new Error('error retrieving neas'))
    }
})
//punto2
route.get("/date", async (req, res, next) => {
    try {
        const { from, to } = req.query;

        const y1 = +req.query.from
        const y2 = +req.query.to
        const result = await NeasModel.find({
            $or: [
                { $expr: { $gte: [{ $year: "$discovery_date" }, y1] } },
                { $expr: { $lte: [{ $year: "$discovery_date" }, y2] } }
            ]
        }, { _id: 0, designation: 1, period_yr: 1, discovery_date: 1 })

        res.status(200).json({
            success: true,
            data: result,
            // next: `http://${req.headers.host}/neas/date?from=${y1}&to=${y2}`

        })
    } catch (error) {
        console.error('> error retrieving neas: ', error.message)

        next(new Error('error retrieving neas'))
    }
})
//punto 3 ...el de pha=1
// next: `http://${req.headers.host}/neas/dangerous?pha=${p}`
route.get("/dangerous", async (req, res, next) => {
    try {
        let p = +req.query.pha
        const result = await NeasModel.find({
            $and: [
                { pha: "Y" },
                { $and: [{ moid_au: { $lte: 0.05 } }, { h_mag: { $lte: 22.0 } }] },
            ]
        },
            { _id: 0, designation: 1, discovery_date: 1, period_yr: 1 })

        if (p === 1) {
            console.log(result)
        } else {
            console.log("not dangerous asteroids found")
        }

        res.status(200).json({
            success: "ok",
            data: result,
        })
    } catch (error) {
        console.error(">error with neas ", error.message)
        next(new Error("error with neas "))
    }

})
//punto 4
route.get("/not-dang", async (req, res, next) => {
    try {
        let p = +req.query.pha
        const result = await NeasModel.find({
            $and: [
                { pha: "N" },
                { $and: [{ moid_au: { $gt: 0.05 } }, { h_mag: { $gt: 22.0 } }] },
            ]
        },
            { _id: 0, designation: 1, discovery_date: 1, period_yr: 1 })
        if (p === 0) {
            console.log(result)
        } else {
            console.log("only dangerous asteroids found")
        }
        res.status(200).json({
            success: "ok",
            data: result
        })
    } catch (error) {
        console.error(">error with neas", error.message)
        next(new Error("error with neas"))
    }
})
//punto 5
route.get("/not-found", async (req, res, next) => {
    try {
        let p = +req.query.pha

        const result = await NeasModel.find({ pha: "n/a" }, { _id: 0, designation: 1, discovery_date: 1, period_yr: 1 })
        if (p === -1) {
            console.log(result)
        } else {
            console.log(" asteroids not found")
        }
        res.status(200).json({
            success: "ok",
            data: result
        })
    } catch (error) {
        console.error(">error with neas", error.message)
        next(new Error("error with neas"))
    }
})
//punto 6
route.get("/periods", async (req, res, next) => {
    try {
        const { from, to } = req.query
        const result = await NeasModel.find(
            { $or: [{period_yr: { $gte: from } }, { period_yr: { $lte: to} }] },
        
            { _id: 0, designation: 1, discovery_date: 1, period_yr: 1 }
        )
        res.status(200).json({
            success: "ok",
            data: result
        })
    } catch (error) {
        console.error(">error with neas", error.message)
        next(new Error("error with neas"))
    }
})

module.exports = route