const Content = require('../models/content.model');

const Joi = require('joi');
const contentSchema = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(24).required(),
    description: Joi.string().alphanum().min(3).max(100).required(),
    link: Joi.string().optional(),
});

const ContentController = {
    getAllContents: (req, res, next) => {
        Content.find().exec((err, data) => {
            if(err){
                return next(err);
            }
            res.json({ message: 'Contents fetched', data: data })
        });
    },

    getContent: (req, res) => {
        res.send('Yes oh!');
    },

    createContent: (req, res, next) => {
        const { body } = req;
        const { error } = Joi.validate(body, contentSchema);
        if(!error === null){
            res.status(422).json({
                message: 'Invalid Request',
                data: body,
            })
        }
        else {
            let content = new Content(body);
            content.save((err) => {
                if(err){
                    return next(err);
                }
                res.json({ message: 'Content created', data: content })
            });
        }
    },

    updateContent: (req, res, next) => {
        const { body } = req;
        const { error } = Joi.validate(body, contentSchema);
        if(!error === null){
            res.status(422).json({
                message: 'Invalid Request',
                data: body,
            })
        }
        else {
            delete body._id;
            Content.findByIdAndUpdate(req.params.id, {$set: body }, (err, data) => {
                if(err){
                    return next(err);
                }
                res.json({ message: 'Content updated', data: data })
            });
        }
    },

    deleteContent: (req, res, next) => {

            Content.findByIdAndDelete(req.params.id, (err) => {
                if(err){
                    return next(err);
                }
                res.json({ message: 'Content deleted' })
            });
    },

};

module.exports = ContentController;
