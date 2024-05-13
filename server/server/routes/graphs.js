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
router.get('/welcome/:param1', async (req, res)=> {
    // call the python script
    const python = spawner('python', ['python.py', req.params.param1]);
    // have chest ready to get python data
    let dataChest = '';
    // get the python data
    python.stdout.on('data', function (data) {
        dataChest += data.toString();
    });
    // run the python script
    python.stderr.on('end', function () {
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


module.exports = router;
