import React from "react";
import UserSearch from "../components/FriendComponents/FriendSearch.js";
import FriendsList from "../components/FriendComponents/FriendList";
import FriendRequestList from "../components/FriendComponents/FriendRequestList.js";
import "./Friends.css";
import { Grid } from "@mui/system";
import VerticalNavigation from "../components/VerticalNavigation.js";
import { Row } from "react-bootstrap";

const FriendPage = () => {
  return (
    <div className="FriendComponents">
      <Grid container spacing={2}>
        <Grid
          xs={"100%"}
          md={"100%"}
          lg={"100%"}
          xl={"100%"}
          className="vh-100"
          style={{ position: "sticky", top: 0 }}
        >
          <VerticalNavigation />
        </Grid>
        <Grid size={{ xs: "grow", lg: "grow" }} style={{ overflowX: "hidden" }}>
          <Grid>
            <Row style={{
              marginTop:50
            }}>
              <UserSearch />
              <FriendRequestList />
            </Row>
          </Grid>

          <FriendsList />
        </Grid>
      </Grid>
    </div>
  );
};

export default FriendPage;
