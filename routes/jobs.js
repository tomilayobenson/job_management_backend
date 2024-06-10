const express = require('express');
const router = express.Router()
const {readData,writeData} = require('../utils/fileHelpers')

// Read (GET all jobs)

    router.get('/', async(req, res) => {
        try {
            // console.log("we are here")
            const data = await readData()
            res.json(data);
        } catch (error) {
            res.status(500).json({error: "Error reading data file"})
        }
    })
    
    // Read (GET job by ID) 
    router.get('/:id', async(req, res) => {
        try {
            const data = await readData()
            const item = data.find(job => job.id === parseInt(req.params.id))

            if (item){
                res.json(item); 
            } else {
                res.status(404).json({error: "Item not found"})
            }
            
        } catch (error) {
            res.status(500).json({error: "Error reading data file"})
        }
    })


    // Create job (POST) 
    router.post('/', async(req, res) => {
        try {
            const data = await readData();
            const newItem ={
                id: data.length ? data[data.length-1].id + 1 : 1,
                ...req.body
            }
            data.push(newItem);
            await writeData(data);
            res.status(201).json({ok: "Record created"})
        } catch (error) {
            res.status(500).json({error: "Error creating record"})
        }
    })

    // Update a job by ID (PUT)  
    router.put('/:id', async(req, res) => {
        try {
            const data = await readData();
            const item = data.find(job => job.id === parseInt(req.params.id))
            if (!item){
                res.status(404).json({error: "Item not found"})
                return;
            } 
            const position = data.indexOf(item)
            const updateItem = {...item, ...req.body}

            data[position] = updateItem
            await writeData(data)
            res.json({ok: "Item Updated"})

        } catch (error) {
            res.status(500).json({error: "Error creating record"})
        }
  
    })

    // Delete job by ID (DELETE)

    router.delete('/:id', async(req, res) => {
        try {
            const data = await readData();
            const newData = data.filter( job => job.id !== parseInt(req.params.id))
            if (newData.length !== data.length){
                await writeData(newData)
                res.json({ok: "Item deleted"})
            } else {
                res.status(404).json({error: "Item not found"})   
            }
        } catch (error) {
            res.status(500).json({error: "Error deleting record"})
        }
    })
   
    module.exports = router