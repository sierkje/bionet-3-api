const User = require("../models/User");
const Virtual = require("../models/Virtual");
const Container = require("../models/Container");
const Physical = require("../models/Physical");
const jwt = require("jsonwebtoken");
const adminRequired = require("../modules/apiAccess").adminRequired;
const userRequired = require("../modules/apiAccess").userRequired;

if (!process.env.JWT_SECRET) {
  require("../config/env.js");
}

module.exports = function(router) {
  // create new record
  router.post("/physicals/new", userRequired, (req, res) => {
    let newRecord = new Physical({
      virtual: req.body.virtual,
      creator: res.locals.currentUser || req.body.creator,
      lab: req.body.lab,
      parent: req.body.parent,
      name: req.body.name,
      description: req.body.description,
      parent: req.body['parent'],
      locations: req.body.locations,
      datName: req.body.datName,
      datHash: req.body.datHash
    });
    newRecord.save((error, data) => {
      let jsonResponse;
      if (error) {
        jsonResponse = {
          message: "There was a problem saving the new record.",
          data: {},
          error
        };
      } else {
        jsonResponse = {
          message: "The new record was successfully saved.",
          data: data,
          error: {}
        };
      }
      res.json(jsonResponse);
    });
  });

  // remove record
  router.post("/physicals/:recordId/remove", userRequired, (req, res) => {
    Physical.findOneAndDelete({_id: req.params.recordId}).exec(error => {
      if (error) {
        jsonResponse = {
          message: "There was a problem removing the record."
        };
      } else {
        jsonResponse = {
          message: "The record was successfully removed."
        };
      }
      res.json(jsonResponse);
    });
  });

  // edit record
  router.post("/physicals/:recordId/edit", userRequired, (req, res) => {
    if (process.env.NODE_ENV === 'test') {
      Physical.findOne({ _id: req.params.recordId })
        .exec((err, record) => {
          record.virtual = req.body.virtual;
          record.creator = req.body.creator;
          record.name = req.body.name;
          record.lab = req.body.lab;
          record.parent = req.body.parent;
          record.description = req.body.description;
          record.locations = req.body.locations;
          record.datName = req.body.datName;
          record.datHash = req.body.datHash;
          record.updatedAt = new Date();
      
          record.save((error, updatedRecord) => {
            let jsonResponse;
            if (error) {
              jsonResponse = {
                message: "There was a problem saving the updated record.",
                data: record
              };
            } else {
              jsonResponse = {
                message: "The updated record was successfully saved.",
                data: updatedRecord
              };
            }
            res.json(jsonResponse);
          });
        });
    } else {
      Physical.findOne({ _id: req.params.recordId })
        .populate("creator")
        .populate("virtual")
        .populate("lab")
        .populate("parent")
        .exec((err, record) => {
          record.virtual = req.body.virtual;
          record.creator = req.body.creator;
          record.name = req.body.name;
          record.lab = req.body.lab;
          record.parent = req.body.parent;
          record.description = req.body.description;
          record.locations = req.body.locations;
          record.datName = req.body.datName;
          record.datHash = req.body.datHash;
          record.updatedAt = new Date();
      
          record.save((error, updatedRecord) => {
            let jsonResponse;
            if (error) {
              jsonResponse = {
                message: "There was a problem saving the updated record.",
                data: record
              };
            } else {
              jsonResponse = {
                message: "The updated record was successfully saved.",
                data: updatedRecord
              };
            }
            res.json(jsonResponse);
          });
        });
    }
  });

  // show one record
  router.get("/physicals/:recordId", getRecordById, (req, res) => {
    let jsonResponse = {
      message: res.locals.message,
      data: res.locals.data
    };
    res.json(jsonResponse);
  });

  // list all records
  router.get("/physicals", getAllRecords, (req, res) => {
    let jsonResponse = {
      message: res.locals.message,
      data: res.locals.data
    };
    res.json(jsonResponse);
  });
};

function getAllRecords(req, res, next) {
  if (process.env.NODE_ENV === 'test') {
    Physical.find({}, {}, { sort: { name: 1 } })
    .exec((error, data) => {
      if (error) {
        res.locals.message =
          "There was a problem with retrieving the records.";
      } else {
        res.locals.message =
          "The records were successfully retrieved.";
      }
      res.locals.data = data;
      return next();
    });
  } else {
    Physical.find({}, {}, { sort: { name: 1 } })
    .populate("creator")
    .populate("virtual")
    .populate("lab")
    .populate("parent")
    .exec((error, data) => {
      if (error) {
        res.locals.message =
          "There was a problem with retrieving the records.";
      } else {
        res.locals.message =
          "The records were successfully retrieved.";
      }
      res.locals.data = data;
      return next();
    });    
  }  
}

function getRecordById(req, res, next) {
  if (process.env.NODE_ENV === 'test') {
    Physical
    .findOne({'_id': req.params.recordId})
    .exec((error, data) => {
      if(error) {
        res.locals.message = "There was a problem with retrieving the record.";
        res.locals.data = {};
      } else {
        res.locals.message = "The record was successfully retrieved.";
        res.locals.data = data;               
      }
      return next();
    });
  } else {
    Physical
    .findOne({'_id': req.params.recordId})
    .populate("creator")
    .populate("virtual")
    .populate("lab")
    .populate("parent")
    .exec((error, data) => {
      if(error) {
        res.locals.message = "There was a problem with retrieving the record.";
        res.locals.data = {};
      } else {
        res.locals.message = "The record was successfully retrieved.";
        res.locals.data = data;               
      }
      return next();
    });
  }
}   
