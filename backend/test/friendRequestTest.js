const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');  // Adjust the path based on your project structure
const User = require('../models/User');

chai.use(chaiHttp);


const { expect } = chai;

describe("Friend Request System", () => {
  let user1Token;
  let user2Token;
  let user1Id;
  let user2Id;

  before(async () => {
    // Assuming you already have users "friendstester1@gmail.com" and "friendtester3@gmail.com" in the database

    // Find the two users from your database by their emails
    const user1 = await User.findOne({ email: "friendstester1@gmail.com" });
    const user2 = await User.findOne({ email: "friendtester3@gmail.com" });

    if (!user1 || !user2) {
      throw new Error("Test users not found in the database");
    }

    user1Id = user1._id;
    user2Id = user2._id;

    // Simulate login and retrieve tokens (if using JWT authentication)
    const loginResponse1 = await chai
      .request(server)
      .post("/api/auth/login")  // Adjust this to your actual login route
      .send({ email: "friendstester1@gmail.com", password: "Goalseek@123" });

    const loginResponse2 = await chai
      .request(server)
      .post("/api/auth/login")
      .send({ email: "friendtester3@gmail.com", password: "Goalseek@123" });

    user1Token = loginResponse1.body.token;
    user2Token = loginResponse2.body.token;
  });

  it("should send a friend request from User1 to User2", (done) => {
    chai
      .request(server)
      .post(`/api/friends/send-req/${user1Id}`)
      .set("Authorization", `Bearer ${user1Token}`)
      .send({ friendIdentifier: "friendtester3@gmail.com" })
      .end((err, res) => {
        if (err) {
          console.error(err);
        }
        expect(res).to.have.status(200);
        expect(res.body.msg).to.equal("Friend request sent");
        done();
      });
  });

  it("should allow User2 to accept the friend request from User1", (done) => {
    chai
      .request(server)
      .delete(`/api/friends/decline-req/${user2Id}`)
      .set("Authorization", `Bearer ${user2Token}`)
      .send({ friendIdentifier: "friendstester1@gmail.com" })
      .end((err, res) => {
        if (err) {
          console.error(err);
        }
        expect(res).to.have.status(200);
        expect(res.body.msg).to.equal("Friend request declined and removed from both users");
        done();
      });
  });

  // it("should allow User2 to remove User1 from friends list", (done) => {
  //   chai
  //     .request(server)
  //     .delete(`/api/friends/friend/remove/${user2Id}`)
  //     .set("Authorization", `Bearer ${user2Token}`)
  //     .send({ friendIdentifier: "friendstester1@gmail.com" })
  //     .end((err, res) => {
  //       if (err) {
  //         console.error(err);
  //       }
  //       expect(res).to.have.status(200);
  //       expect(res.body.msg).to.equal("Friend removed");
  //       done();
  //     });
  // });
});
