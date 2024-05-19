const router = require('express').Router();
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
// Import schemas below

// ijmporting the jwt token
const jwt = require('jsonwebtoken');

// this router is for the prototype
router.get('/python/:param1', async (req, res) => {
    // run the Python file
    const python = spawn('python', ['scripts/fossilconsumption.py', req.params.param1]);
    console.log('req.params.param1: ', req.params.param1);

    // listen to Python script, await the result.
    python.on('close', (code) => {
        console.log('code: ', code);
        if (code === 0) {
            // Read the generated image file
            const imagePath = path.join(__dirname,`../image/fossilconsumption.png`);
            console.log('__dirname: ', __dirname);
                // Read the image
                const imageBuffer = fs.readFileSync(imagePath);
                console.log('imagePath: ', imagePath);

                // Set response headers
                res.set({
                    'Content-Type': 'image/png',
                    'Content-Length': imageBuffer.length
                });

                // Send the image to response body
                res.end(imageBuffer);
        } else {
            // if there's problem with generating image
            res.status(500).send('Error: Failed to show the image');
        }
    });
});

// this router will be using json body.
router.get('/firstGraph/:country/:graphType', async (req, res) => {
    // get the queries from the json body
    // the graphType should be between one to 3. 
    const { country, graphType } = req.params;

    // fossiconsumption = 1, sustainconsumption.py = 2, emissionperiod.py = 3
    // create a map for the scripts.
    // maybe join.path here?
    const scriptPaths = {
        '1': 'scripts/fossilconsumption.py',
        '2': 'scripts/sustainconsumption.py',
        '3': 'scripts/emissionperiod.py',
        '4': 'scripts/energydemand.py'
    }

    // make sure graph is one of in the map.
    if (!(graphType in scriptPaths)) {
        return res.status(400).send("You've entered the wrong input for the graphType. Please, choose between 1 and 4")
    }

    // run the python script
    const python = spawn('python', [scriptPaths[graphType], country]);
    console.log('graphType: ', graphType);
    console.log('country: ', country);

    // listen to the python sript, and await result.
    python.on('close', (code) => {
        console.log('code: ', code);
        if (code === 0) {
            // Read the generated image file
            const imagePath = path.join(__dirname,`../image/fossilconsumption.png`);
                // Read the image
                const imageBuffer = fs.readFileSync(imagePath);
                console.log('imagePath: ', imagePath);

                // Set response headers
                res.set({
                    'Content-Type': 'image/png',
                    'Content-Length': imageBuffer.length
                });

                // Send the image to response body
                res.end(imageBuffer);
        } else {
            // if there's problem with generating image
            res.status(500).send('Error: Failed to show the image');
        }
    })
})


// generate the pie graph based on the json body.
router.post('/pieChart', async function (req, res) {
    const { year, country, graphType } = req.body;

    // fossiconsumption = 1, sustainconsumption.py = 2, emissionperiod.py = 3
    // create a map for the scripts.
    // maybe join.path here?
    const scriptPaths = {
        '1': 'scripts/fossilconsumption.py',
        '2': 'scripts/sustainconsumption.py',
        '3': 'scripts/emissionperiod.py',
        '4': 'scripts/energydemand.py'
    }

    // make sure graph is one of in the map.
    if (!(graphType in scriptPaths)) {
        return res.status(400).send("You've entered the wrong input for the graphType. Please, choose between 1 and 4")
    }
    // make sure year is correct format, example '2010', no extra number or letter.
    if (!/^\d{4}$/.test(year)) {
        return res.status(400).send("You've entered the wrong input for the year. Please, enter a four digit year")
    }

    // Ensure country is an array
    const countryArray = Array.isArray(country) ? country : [country];

    // run the python script
    const python = spawn('python', [scriptPaths[graphType], year, ...countryArray]);
    console.log('year: ', year);
    console.log('graphType: ', graphType);
    console.log('country: ', country);

    // listen to the python sript, and await result.
    python.on('close', (code) => {
        console.log('code: ', code);
        if (code === 0) {
            // Read the generated image file
            const imagePath = path.join(__dirname,`../image/sustainconsumption.png`);
                // Read the image
                const imageBuffer = fs.readFileSync(imagePath);
                console.log('imagePath: ', imagePath);

                // Set response headers
                res.set({
                    'Content-Type': 'image/png',
                    'Content-Length': imageBuffer.length
                });

                // Send the image to response body
                res.end(imageBuffer);
        } else {
            // if there's problem with generating image
            res.status(500).send('Error: Failed to show the image');
        }
    })
})

// this route should generate a bar graph
router.post('/barGraph', async function (req, res) {
    // get the data from the request body
    const { stat, year, graphType } = req.body;
    console.log('graphType: ', graphType);
    console.log('year: ', year);
    console.log('stat: ', stat);

    // define the state like the script paths
    const trueStats = ['population', 'gdp', 'greenhouse_gas_emissions'];
    if (!trueStats.includes(stat)) {
        return res.status(400).send("Invalid stat. Please choose between 'population', 'gdp', or 'greenhouse_gas_emissions'.");
    }
    
    // make sure year is correct format, example '2010', no extra number or letter.
    if (!/^\d{4}$/.test(year)) {
        return res.status(400).send("You've entered the wrong input for the year. Please, enter a four digit year")
    }


    // fossiconsumption = 1, sustainconsumption.py = 2, emissionperiod.py = 3
    // create a map for the scripts.
    // maybe join.path here?
    const scriptPaths = {
        '1': 'scripts/fossilconsumption.py',
        '2': 'scripts/sustainconsumption.py',
        '3': 'scripts/emissionperiod.py',
        '4': 'scripts/energydemand.py'
    }

    // make sure graph is one of in the map.
    if (!(graphType in scriptPaths)) {
        return res.status(400).send("You've entered the wrong input for the graphType. Please, choose between 1 and 4")
    }
    
    // run the python script
    const python = spawn('python', [scriptPaths[graphType], stat, year]);
    console.log('graphType: ', graphType);
    console.log('stat: ', stat);
    console.log('year: ', year);


    // listen to the python sript, and await result.
    python.on('close', (code) => {
        console.log('code: ', code);
        if (code === 0) {
            // save the image file
            const imagePath = path.join(__dirname,`../image/emissionperiod.png`);
            console.log('imagePath: ', imagePath);
                // Read the image
                const imageBuffer = fs.readFileSync(imagePath);

                // Set response headers
                res.set({
                    'Content-Type': 'image/png',
                    'Content-Length': imageBuffer.length
                });

                // Send the image to response body
                res.end(imageBuffer);
        } else {
            // if there's problem with generating image
            res.status(500).send('Error: Failed to show the image');
        }
    })
})

// the following is the last graph
router.post('/lastgraph', async function (req, res) {
    // get the data from the request body
    const { country, graphType, year } = req.body;

    // fossiconsumption = 1, sustainconsumption.py = 2, emissionperiod.py = 3
    // create a map for the scripts.
    // maybe join.path here?
    const scriptPaths = {
        '1': 'scripts/fossilconsumption.py',
        '2': 'scripts/sustainconsumption.py',
        '3': 'scripts/emissionperiod.py',
        '4': 'scripts/energydemand.py'
    }

    // make sure graph is one of in the map.
    if (!(graphType in scriptPaths)) {
        return res.status(400).send("You've entered the wrong input for the graphType. Please, choose between 1 and 4")
    }

    // make sure year is correct format, example '2010', no extra number or letter.
    if (!/^\d{4}$/.test(year)) {
        return res.status(400).send("You've entered the wrong input for the year. Please, enter a four digit year")
    }

    // run the python script
    const python = spawn('python', [scriptPaths[graphType], country, year]);
    console.log('year: ', year);
    console.log('graphType: ', graphType);
    console.log('country: ', country);

    // listen to the python sript, and await result.
    python.on('close', (code) => {
        console.log('code: ', code);
        if (code === 0) {
            // Read the generated image file
            const imagePath = path.join(__dirname,`../image/energydemand.png`);
                // Read the image
                const imageBuffer = fs.readFileSync(imagePath);
                console.log('imagePath: ', imagePath);

                // Set response headers
                res.set({
                    'Content-Type': 'image/png',
                    'Content-Length': imageBuffer.length
                });

                // Send the image to response body
                res.end(imageBuffer);
        } else {
            // if there's problem with generating image
            res.status(500).send('Error: Failed to show the image');
        }
    })
})
module.exports = router;
