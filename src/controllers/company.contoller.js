const Company = require('../models/company.model');
const User = require('../models/user.model');

// Create and Save a new Company
//get a user from the db using its email
//check if his account is verified and not locked 
//create a new companny according to name recieved from the body request 
//associate the new companny with the user 

exports.create_company = async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }
        if (user.isVerified && !user.isLocked) {
            const company = await Company.create({
                name
            });
            await user.updateOne({
                company: company._id
            });
            return res.status(201).json({
                success: true,
                data: company
            });
        }

    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }

}



