const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const readXlsxFile = require('read-excel-file/node');
const fs = require('fs')

router.use(fileUpload());

router.post('/',(req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file selected...'});
    }
    
    const file = req.files.file;
    /*
    */
    file.mv(`${__dirname}/../uploads/${file.name}`,err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    });
    
    //Text file
    if (file.mimetype == 'text/plain') {
        console.log('Text File uploaded');
        fs.readFile(`${__dirname}/../uploads/${file.name}`, 'utf8', function(err, data) {
            if (err) throw err;
            var splitFile = [data.toString().split('\r\n')];
            //console.log(splitFile);
            res.json({ fileName: file.name, arr: splitFile});
        });
        
    //Excel File
    } else if (file.mimetype == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        console.log('Excel File uploaded');
        readXlsxFile(`${__dirname}/../uploads/${file.name}`).then((rows) => {
            res.json({ fileName: file.name, arr: rows });
        });

    } else {
        console.log('Unrecognized filetype');
    }

});

module.exports = router;