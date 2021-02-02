const express = require('express')
const router = express.Router()

const fs = require("fs")

const BEERS_DB = "src/db/beers.json"


// router.get("/", async (req, res) => {
//     try {
//         const rawFileContent = await fs.readFileSync(BEERS_DB)
//         return res.status(200).json({
//             success: true,
//             data: JSON.parse(rawFileContent)
//         })
//     } catch (error) {
//         console.log(">error retrieving phones list: ", error.message)
//         return res.status(500).json({
//             success: false,
//             message: "something went wrong"
//         })
//     }
// })


router.get("/", async (req, res) => {
    try {
        const beersList = await fs.readFileSync(BEERS_DB)
        const beersJson = JSON.parse(beersList)
        const filteredList = beersJson.slice(0, 25)

        console.info("> list: ", filteredList)
        return res.status(200).json({
            success: true,
            data: filteredList
        })
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong"
        })
    }

})
router.get("/random", async (req, res) => {
    try {
        const beersList = await fs.readFileSync(BEERS_DB)
        const beersJson = JSON.parse(beersList)

        const random = Math.floor(Math.random() * beersJson.length);

        return res.status(200).json({
            success: true,
            data: beersJson[random]
        })

    } catch(error) {
        return res.status(500).jason({
            success: false,
            message: "something went wrong"
        })
    }
})


router.get("/:id", async (req, res) => {
    try {
        const beersListById = await fs.readFileSync(BEERS_DB)
        const beersJsonById = JSON.parse(beersListById)
        const filteredById = beersJsonById.filter((beer) => {
            console.info('> info: ', typeof beer.id, typeof req.params.id)

            if (beer.id === +req.params.id) {
                return beer
            }
        })

        console.info("> list:", filteredById)
        return res.status(200).json({
            success: true,
            data: filteredById
        })

    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong"
        })
    }
})

/*  router.get("/page/:page/perPage/:perPage", async (req, res) => {
    try {
        const beersList = await fs.readFileSync(BEERS_DB)
        const beersJson = JSON.parse(beersList)
        page = +req.params.page
        perPage = +req.params.perPage

        page = (perPage * page) / perPage
        let z = perPage * page
        let y = z - perPage

        const perPageBeer = beersJson.slice(y, z)

        console.log(">data :", perPageBeer)

        return res.status(200).json({
            success: true,
            data: perPageBeer

        })
    } catch {
        return res.status(500).json({
            success: false,
            message: "something went wrong"
        })
    }
})  */
const getPages = (totalBeers, amountPerPage) => Math.floor(totalBeers.length / amountPerPage);
router.get("/page/:page/perPage/:perPage", async (req, res) => {
    try {
        const beersList = await fs.readFileSync(BEERS_DB)
        const beersJson = JSON.parse(beersList)
        page = +req.params.page
        perPage = +req.params.perPage

        page = (perPage * page) / perPage
        let endIndex = perPage * page
        let startIndex = endIndex - perPage

        const perPageBeer = beersJson.slice(startIndex, endIndex)
       
        const nextPage = page + 1 

        console.log(">data :", perPageBeer)

       res.status(200).json({
            success: true,
            data: perPageBeer,
            next: `http://${req.headers.host}/beers?page=${nextPage}&perPage=${perPage}`,

        })
    } catch(error) {
             res.status(500).json({
            success: false,
            message: "something went wrong"
        })
    }
}) 


module.exports = router