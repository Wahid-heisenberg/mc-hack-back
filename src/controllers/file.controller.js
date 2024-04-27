const path = require('path');
const File = require('../models/file.model'); // Import the File model
const fs = require('fs');
const Company = require('../models/company.model');

exports.save_file = async (req, res) => {
  try {
    const { originalname, mimetype, size   } = req.file;
    const { category } = req.body;
    // Save file to local storage (optional)
    const Path = path.join(__dirname, `../uploads/${originalname}`);

    const buffer = fs.readFileSync(Path).toString('base64');
    // Save file data to MongoDB as buffer
    // const company = req.params.company;
    // const companyExists = await Company.findById(company)
    // if (!companyExists) {
    //   return res.status(404).json({ success: false, error: 'Company not found' });
    // }
    const file = await File.create({
      name: originalname+Date.now(),
      data: buffer,
      type: mimetype,
      size: size,
      path: Path,
      category

    });

    // Save the file to the uploads directory
    // This step is optional and can be removed if not needed
    // fs.writeFileSync(filePath, buffer); // Uncomment this line if you want to save the file to the local storage

    res.status(201).json({ success: true, data: file });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};


// Controller to get a file by ID
exports.generate_pdf_results = async (req, res) => {
  try {
    const fileId = req.params.id;
    const file = await File.findById(fileId);
    list = []


    if (!file) {
      return res.status(404).json({ success: false, error: 'File not found' });
    }
    res.status(200).json({ success: true, data: file });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
}

exports.getCompanyFiles = async (req, res) => {
    try {
        const company = req.params.company;
        const companyExists = await Company.findById(company)
        if (!companyExists) {
            return res.status(404).json({ success: false, error: 'Company not found' });
        }
        const files = await File.find({ company });
        res.status(200).json({ success: true, data: files });


    } catch (error) {

        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }

}

exports.getAllFiles = async (req, res) => {
    try {
        const files = await File.find();
        if (!files) {
            return res.status(404).json({ success: false, error: 'Files not found' });
        }
        res.status(200).json({ success: true, data: files });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
}


exports.get_file_by_category = async (req, res) => {

    try {
        const category = req.params.category;
        const files = await File.find({ category });
        if (!files) {
            return res.status(404).json({ success: false, error: 'Files not found' });
        }
        res.status(200).json({ success: true, data: files });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
}




