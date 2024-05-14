const router = require('express').Router();
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
// Import schemas below

// ijmporting the jwt token
const jwt = require('jsonwebtoken');


router.get('/python/:param1', async (req, res) => {
    // run the Python file
    const python = spawn('python', ['fossilconsumption.py', req.params.param1]);
    console.log('req.params.param1: ', req.params.param1);

    // listen to Python script, await the result.
    python.on('close', (code) => {
        console.log('code: ', code);
        if (code === 2) {
            // Read the generated image file
            const imagePath = path.join(__dirname,`../data/sustainconsumption.png`);
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


/**  a get path for the welcoming page that simply has a button
This is a get method that has no need for format and parameters since it has nothing but a button.
The button will be coded in the client side to navigate to the following page.
*/
router.get('/welcome', async (req, res)=>  {
    try {
        // Send a welcome message as the response
        res.status(200).send('Welcome, user!');
    } catch (error) {
        // Handle errors
        res.status(400).send('The server cannot or will not process the request due to an apparent client error.');
    }
})

/**  This route works on the second page of the website. 
 * The page has multiple different graph examples with a button underneath them. 
 * The user can choose one of the graphs by clicking the button underneath that graph, 
 * where they will be navigated to another page. 
 * A page they can fill the queries and get all the data in their selected graph.
*/
router.get('/selectGraph', async (req, res) => {
    try {
        // Send a success message as the response
        res.status(200).send('Successful navigation.');
    } catch (error) {
        // Handle errors
        res.status(400).send('The server cannot or will not process the request due to an apparent client error.');
    }
});


//take the queries user put.
router.post('/infoGraph', async (req, res) => {
    try {
        // Extract queries from request body
        const { country, fromDate, toDate, energyType } = req.body;

        // Perform processing of queries and generate graph
        // Example: Call a function to generate graph based on the provided queries

        // Send the result as the response
        const result = {
            country: country,
            fromDate: fromDate,
            toDate: toDate,
            energyType: energyType,
            // Include any other data related to the generated graph
        };
        res.status(200).json(result);
    } catch (error) {
        // Handle errors
        res.status(400).send('The server cannot or will not process the request due to an apparent client error.');
    }
});

module.exports = router;
