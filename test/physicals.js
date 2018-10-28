//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const shortid = require('shortid');
const Physical = require('../models/Physical');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Physicals', () => {

  beforeEach((done) => {
    Physical.deleteMany({}, (err) => { 
      done();           
    });        
  });

  describe('/GET /physicals', () => {
    it('it should GET all the physicals', (done) => {
      chai.request(server)
        .get('/physicals')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.message.should.be.a('string');
          res.body.data.should.be.a('array');
          res.body.data.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/POST /physicals/new', () => {
    it('it should not POST a physical without virtual field', (done) => {
      let physical = {
        creator: "exampleUser",
        parent: "exampleContainer",
        parentRow: 1,
        parentColumn: 1,
        rowSpan: 1,
        columnSpan: 1,
        name: "foo",
        description: "bar baz quay",
        datName: "fooDat",
        datHash: "fooHash" 
      };
      chai.request(server)
        .post('/physicals/new')
        .send(physical)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.have.property('errors');
          res.body.error.errors.should.have.property('virtual');
          res.body.error.errors.virtual.should.have.property('kind').eql('required');
          done();
        });
    });
    it('it should not POST a physical without creator field', (done) => {
      let physical = {
        virtual: "exampleVirtual",
        parent: "exampleContainer",
        parentRow: 1,
        parentColumn: 1,
        rowSpan: 1,
        columnSpan: 1,
        name: "foo",
        description: "bar baz quay",
        datName: "fooDat",
        datHash: "fooHash" 
      };
      chai.request(server)
        .post('/physicals/new')
        .send(physical)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.have.property('errors');
          res.body.error.errors.should.have.property('creator');
          res.body.error.errors.creator.should.have.property('kind').eql('required');
          done();
        });
    });
    it('it should not POST a physical without name field', (done) => {
      let physical = {
        virtual: "exampleVirtual",
        creator: "exampleUser",
        parent: "exampleContainer",
        parentRow: 1,
        parentColumn: 1,
        rowSpan: 1,
        columnSpan: 1,
        description: "bar baz quay",
        datName: "fooDat",
        datHash: "fooHash" 
      };
      chai.request(server)
        .post('/physicals/new')
        .send(physical)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.have.property('errors');
          res.body.error.errors.should.have.property('name');
          res.body.error.errors.name.should.have.property('kind').eql('required');
          done();
        });
    });
    it('it should not POST a physical without parent field', (done) => {
      let physical = {
        virtual: "exampleVirtual",
        creator: "exampleUser",
        parentRow: 1,
        parentColumn: 1,
        rowSpan: 1,
        columnSpan: 1,
        name: "foo",
        description: "bar baz quay",
        datName: "fooDat",
        datHash: "fooHash" 
      };
      chai.request(server)
        .post('/physicals/new')
        .send(physical)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.have.property('errors');
          res.body.error.errors.should.have.property('parent');
          res.body.error.errors['parent'].should.have.property('kind').eql('required');
          done();
        });
    });
    it('it should not POST a physical without parent row field', (done) => {
      let physical = {
        virtual: "exampleVirtual",
        creator: "exampleUser",
        parent: "exampleContainer",
        parentColumn: 1,
        rowSpan: 1,
        columnSpan: 1,
        name: "foo",
        description: "bar baz quay",
        datName: "fooDat",
        datHash: "fooHash" 
      };
      chai.request(server)
        .post('/physicals/new')
        .send(physical)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.have.property('errors');
          res.body.error.errors.should.have.property('parentRow');
          res.body.error.errors.parentRow.should.have.property('kind').eql('Number');
          done();
        });
    });
    it('it should not POST a physical without parent column field', (done) => {
      let physical = {
        virtual: "exampleVirtual",
        creator: "exampleUser",
        parent: "exampleContainer",
        parentRow: 1,
        rowSpan: 1,
        columnSpan: 1,
        name: "foo",
        description: "bar baz quay",
        datName: "fooDat",
        datHash: "fooHash" 
      };
      chai.request(server)
        .post('/physicals/new')
        .send(physical)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.have.property('errors');
          res.body.error.errors.should.have.property('parentColumn');
          res.body.error.errors.parentColumn.should.have.property('kind').eql('Number');
          done();
        });
    }); 
    it('it should successfully POST a physical', (done) => {
      let physical = {
        virtual: "exampleVirtual",
        creator: "exampleUser",
        parent: "exampleContainer",
        parentRow: 1,
        parentColumn: 1,
        rowSpan: 1,
        columnSpan: 1,
        name: "foo",
        description: "bar baz quay",
        datName: "fooDat",
        datHash: "fooHash" 
      };
      chai.request(server)
        .post('/physicals/new')
        .send(physical)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('virtual');
          res.body.data.should.have.property('creator');
          res.body.data.should.have.property('name');
          res.body.data.should.have.property('description');
          res.body.data.should.have.property('parent');
          res.body.data.should.have.property('parentRow');
          res.body.data.should.have.property('parentColumn');
          res.body.data.should.have.property('rowSpan');
          res.body.data.should.have.property('columnSpan');
          res.body.data.should.have.property('datName');
          res.body.data.should.have.property('datHash');
          done();
        });
    });    
  });

  describe('/GET /physicals/:recordId', () => {
    it('it should GET a physical by id', (done) => {
      let physical = new Physical({
        virtual: "exampleVirtual",
        creator: "exampleUser",
        parent: "exampleContainer",
        parentRow: 1,
        parentColumn: 1,
        rowSpan: 1,
        columnSpan: 1,
        name: "foo",
        description: "bar baz quay",
        datName: "fooDat",
        datHash: "fooHash"    
      });
      physical.save((error, physical) => {
        if (error) { 
          console.log(error); 
          done();
        } else {
          let route = `/physicals/${physical._id}`;
          chai.request(server)
            .get(route)
            .send(physical)
            .end((err, res) => {
              if (err) { console.log(err) }
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.should.have.property('data');
              res.body.data.should.be.a('object');
              res.body.data.should.have.property('virtual');
              res.body.data.should.have.property('creator');
              res.body.data.should.have.property('name');
              res.body.data.should.have.property('description');
              res.body.data.should.have.property('parent');
              res.body.data.should.have.property('parentRow');
              res.body.data.should.have.property('parentColumn');
              res.body.data.should.have.property('rowSpan');
              res.body.data.should.have.property('columnSpan');
              res.body.data.should.have.property('datName');
              res.body.data.should.have.property('datHash');
              done();
            });
          }    
      });
    });
  });

  describe('/POST /physicals/:recordId/edit', () => {
    it('it should UPDATE physical by id', (done) => {
      let physical = new Physical({
        virtual: "exampleVirtual",
        creator: "exampleUser",
        parent: "exampleContainer",
        parentRow: 1,
        parentColumn: 1,
        rowSpan: 1,
        columnSpan: 1,
        name: "foo",
        description: "bar baz quay",
        datName: "fooDat",
        datHash: "fooHash"    
      });
      physical.save((error, physical) => {
        if (error) { console.log(error) }
        let route = `/physicals/${physical._id}/edit`;
        chai.request(server)
          .post(route)
          .send({
            virtual: "exampleVirtual2",
            creator: "exampleUser2",
            parent: "exampleContainer2",
            parentRow: 2,
            parentColumn: 2,
            rowSpan: 2,
            columnSpan: 2,
            name: "foo2",
            description: "bar baz quay2",
            datName: "fooDat2",
            datHash: "fooHash2"       
          })
          .end((err, res) => {
            if (err) { console.log(err) }
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('data');
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('virtual').eql('exampleVirtual2');
            res.body.data.should.have.property('creator').eql('exampleUser2');
            res.body.data.should.have.property('name').eql('foo2');
            res.body.data.should.have.property('description').eql('bar baz quay2');
            res.body.data.should.have.property('parentRow').eql(2);
            res.body.data.should.have.property('parentColumn').eql(2);
            res.body.data.should.have.property('rowSpan').eql(2);
            res.body.data.should.have.property('columnSpan').eql(2);
            res.body.data.should.have.property('datName').eql('fooDat2');
            res.body.data.should.have.property('datHash').eql('fooHash2');
            done();
          });
      });
    });
  });

  describe('/POST /physicals/:recordId/remove', () => {
    it('it should DELETE physical by id', (done) => {
      let physical = new Physical({
        virtual: "exampleVirtual",
        creator: "exampleUser",
        parent: "exampleContainer",
        parentRow: 1,
        parentColumn: 1,
        rowSpan: 1,
        columnSpan: 1,
        name: "foo",
        description: "bar baz quay",
        datName: "fooDat",
        datHash: "fooHash"    
      });
      physical.save((error, physical) => {
        let route = `/physicals/${physical._id}/remove`;
        chai.request(server)
          .post(route)
          .end((err, res) => {
            if (err) { console.log(err) }
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('The record was successfully removed.');
            done();
          });
      });
    });
  });

});