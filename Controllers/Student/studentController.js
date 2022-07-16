const Joi = require("joi");
const Student = require("../../models/Student");
const Students = require("../../models/Student");

const studentController = {

    // fetch all student
    async fetchStudent(req, res, next){
        // console.log(req.body);
        if(req.body.id){
            try {
                const result = await Students.find().select('-createdAt -updatedAt -__v');
                return res.json(result);
            } catch (error) {
                return res.json(error.message);
            }
        }
    },

    // Add student

    async addStudent(req, res, next){

        // validate student data
        const {name, email, mobile, college, degree, course, fees, duration, query } = req.body;

        const body = {name, email, mobile, college, degree, course, fees, duration, query }
        
        const studentSchema = Joi.object({
            name : Joi.string().min(5).max(30).required(),
            email : Joi.string().email().required(),
            mobile : Joi.string().length(10).pattern(/^[0-9]+$/).required(),
            college : Joi.string().required(),
            degree : Joi.string().required(),
            course : Joi.string().required(),
            fees : Joi.string().required(),
            duration : Joi.string().required(),
            query : Joi.string().required(),
        })
    
        console.log(req.body);
        const {error} = studentSchema.validate(body);
        if(error){
            return res.json(error.message)
        }

        try {
            const exist = await Students.exists({email : req.body.email});
            if(exist){
                return res.json({message : "Student already exist"})
            }

            // const {name, email, mobile, college, degree, course, fees, duration, query } = req.body;

            const student = new Student({
                name, email, mobile, college, degree, course, fees, duration, query
            })

            const result = await student.save();
            res.json(result);

        } catch (error) {
            return res.json({errorMessage : error.message})
        }

    },

    // Update student details
    async updateStudent(req, res, next){

        const {name, email, mobile, college, degree, course, fees, duration, query } = req.body;

        const body = {name, email, mobile, college, degree, course, fees, duration, query }

        const studentSchema = Joi.object({
            name : Joi.string().min(5).max(30).required(),
            email : Joi.string().email().required(),
            mobile : Joi.string().length(10).pattern(/^[0-9]+$/).required(),
            college : Joi.string().required(),
            degree : Joi.string().required(),
            course : Joi.string().required(),
            fees : Joi.string().required(),
            duration : Joi.string().required(),
            query : Joi.string().required(),
        })
    
        console.log(req.body);
        const {error} = studentSchema.validate(body);
        if(error){
            return res.json(error.message)
        }

        try {
            const data = await Students.findByIdAndUpdate({_id : req.params.id}, {
                name, email, mobile, college, degree, course, fees, duration, query   
            }, {new :true})

        return res.json(data);
        } catch (error) {
            return res.json({errorMessage : error.message})
        }


    },

    // delete student details 

    async deleteStudent(req, res, next){

        try {
            const result = await Students.findByIdAndDelete({_id : req.params.id});
            console.log(result);
            return res.json(result)
        } catch (error) {
            return res.json({errorMessage : error.message})
        }
    }

}



module.exports = studentController;