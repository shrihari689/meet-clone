import React from "react";
import { connect } from "react-redux";
import { TABS } from "../../../database/entities";

const ChatIcon = ({ isSidebarOpen, hasUnseenMessages, onClick }) => {
  return (
    <div className="flex items-center justify-center relative">
      <div
        title="Chat"
        onClick={onClick}
        className="flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-gray-800"
      >
        <i
          className={
            isSidebarOpen === TABS.CHAT
              ? "material-icons"
              : "google-material-icons"
          }
          style={{ fontSize: "18px" }}
        >
          chat
        </i>
      </div>
      {hasUnseenMessages && (
        <span className="absolute top-0 right-1 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
        </span>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  hasUnseenMessages: state.messages,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ChatIcon);
