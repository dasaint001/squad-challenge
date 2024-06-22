const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const rewire = require("rewire");
const request = require("supertest");

var app = rewire("../index");

//var sandbox = sinon.sandbox.create();

describe("Merchants", () => {
  context("GET /all", () => {
    it("should get all merchants", (done) => {
      request(app)
        .get("/api/merchant/all")
        .expect(200)
        .expect("Content-Type", /json/)
        .then((response) => {
          expect(response.body).to.be.an("object");
          done();
        })
        .catch(done);
    });
  });

  context("POST /create", () => {
    it("should create a new merchant", (done) => {
      request(app)
        .post("/api/merchant/create")
        .send({ fullName: "fake" })
        .expect(201)
        .expect("Content-Type", /json/)
        .then((response) => {
          expect(response.body).to.be.an("object");
          done();
        })
        .catch(done);
    });
  });

  context("GET /get-balance", () => {
    it("should fetch merchant's balance", (done) => {
      request(app)
        .get("/api/merchant/get-balance")
        .send({ merchantID: 4536 })
        .expect(400)
        .expect("Content-Type", /json/)
        .then((response) => {
          expect(response.body).to.be.an("object");
          done();
        })
        .catch(done);
    });
  });

  context("GET /get merchant", () => {
    it("should return 404 not found", (done) => {
      request(app)
        .get("/api/merchant/5663")
        .expect(404)
        .expect("Content-Type", /json/)
        .then((response) => {
          expect(response.body).to.be.an("object");
          done();
        })
        .catch(done);
    });
  });

  context("GET /get merchant", () => {
    it("should return merchant", (done) => {
      request(app)
        .get("/api/merchant/42719")
        .expect(200)
        .expect("Content-Type", /json/)
        .then((response) => {
          expect(response.body).to.be.an("object");
          done();
        })
        .catch(done);
    });
  });

});
