const router = require('express').Router();

// import the library to call a python script
const spawner = require('child_process').spawn


// Import schemas below


// ijmporting the jwt token
const jwt = require('jsonwebtoken');





/**  a get path for the welcoming page that simply has a button
This is a get method that has no need for format and parameters since it has nothing but a button.
The button will be coded in the client side to navigate to the following page.
*/
router.get('/python/:param1', async (req, res)=> {
    // call the python script
    const python = spawner('python', ['python.py', req.params.param1]);
    // have chest ready to get python data
    let dataChest = '';
    // get the python data
    python.stdout.on('data', function (data) {
        dataChest += data.toString();
    });
    // run the python script
    python.stderr.on('close', function () {
        const img = Buffer.from(dataChest, 'base64');
        
        // Set response headers using res.set()
        res.set({
            'Content-Type': 'image/png',
            'Content-Length': img.length
        });
        
        // Send the image data in the response
        res.end(img);
    });
})

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
