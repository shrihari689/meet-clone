import React from "react";
import { connect } from "react-redux";
import { TABS } from "../../../database/entities";

const HostControlsIcon = ({ isHost, setIsSidebarOpen }) => {
  const handleChangeCallOption = () => {
    setIsSidebarOpen(TABS.SECURITY);
  };

  if (!isHost) return <></>;

  return (
    <div
      title="Host Controls"
      onClick={handleChangeCallOption}
      className="flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-gray-800"
    >
      <i className="google-material-icons" style={{ fontSize: "18px" }}>
        security
      </i>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isHost: false,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HostControlsIcon);
