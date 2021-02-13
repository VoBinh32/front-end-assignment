import React from "react";

export const Counters: React.FC<any> = (props) => {
  return (
    <div>
      <div>
        <div>{props.data.total_conversation_count}</div>
        <p>Total conversation count</p>
      </div>
      <div>
        <div>{props.data.total_user_message_count}</div>
        <p>Total user message count</p>
      </div>
      <div>
        <div>{props.data.total_visitor_message_count}</div>
        <p>Total visitor message count</p>
      </div>
    </div>
  );
};
