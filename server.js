const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const dataPath = path.join(__dirname, 'data.json');

// Middleware to parse JSON bodies
app.use(express.json());

// Helper function to read data from the file
const readData = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(data))
            }
        });
    })
};

// Helper function to write data to the file
const writeData = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf8', err => {
            if (err) {
                reject(err);
            }
            else {
                resolve()
            }})
        });
    }
 

    // Read (GET all)

    app.get('/jobs', async(req, res) => {
        try {
            const data = await readData()
            res.json(data);
        } catch (error) {
            res.status(500).json({error: "Error reading data file"})
        }
    })
    
    // Read (GET by ID) 
    app.get('/jobs/:id', async(req, res) => {
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


    // Create (POST) 
    app.post('/jobs', async(req, res) => {
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

    // Update (PUT)  
    app.put('/jobs/:id', async(req, res) => {
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

    // Delete (DELETE)

    app.delete('/jobs/:id', async(req, res) => {
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
   
    

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
