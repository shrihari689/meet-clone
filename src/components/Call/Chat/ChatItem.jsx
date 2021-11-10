import Linkify from "linkify-react";

const ChatItem = ({ senderName, message, time }) => {
  return (
    <div className="flex flex-col w-full my-2">
      <div className="text-sm">
        <span className="font-medium">{senderName}</span>
        <span className="font-normal text-xs text-gray-500 ml-2">{time}</span>
      </div>
      <Linkify
        tagName="div"
        className="w-full text-sm break-all"
        options={{
          className: "font-medium text-indigo-800",
          tagName: "a",
          target: { url: "_blank" },
        }}
      >
        {message.split("\n").map((e, i) => (
          <p key={i}>{e}</p>
        ))}
      </Linkify>
    </div>
  );
};

export default ChatItem;
