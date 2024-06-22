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


describe("Transactions", () => {
    context("GET /all", () => {
        it("should get all transactions", (done) => {
        request(app)
            .get("/api/transaction/all")
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
        it("should return an error", (done) => {
        request(app)
            .post("/api/transaction/create")
            .send({ fullName: "fake" })
            .expect(400)
            .expect("Content-Type", /json/)
            .then((response) => {
            expect(response.body).to.be.an("object");
            done();
            })
            .catch(done);
        });
    });

    context("GET /get-transaction", () => {
        it("should return a transaction", (done) => {
        request(app)
            .get("/api/transaction/:reference")
            .send({ reference: "6dea8140f4b6c" })
            .expect(200)
            .expect("Content-Type", /json/)
            .then((response) => {
            expect(response.body).to.be.an("object");
            done();
            })
            .catch(done);
        });
    });

    context("POST /get merchant's payout", () => {
        it("should return 422 error due to missing request body", (done) => {
        request(app)
            .post("/api/transaction/merchant/payout")
            .send({ merchant: "6dea8140f4b6c" })
            .expect(422)
            .expect("Content-Type", /json/)
            .then((response) => {
            expect(response.body).to.be.an("object");
            done();
            })
            .catch(done);
        });
    });

    context("POST /get merchant's payout", () => {
      it("should return merchant's total payout", (done) => {
        request(app)
          .post("/api/transaction/merchant/payout")
          .send({ merchantId: "42719" })
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
