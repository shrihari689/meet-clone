import React from 'react';
import CallOptionButton from './components/Call/CallOptionButton';
import CallActionButton from './components/Call/CallActionButton';
import Time from './components/Shared/Time';
import PeopleList from './components/Call/People/PeopleList';
import ChatList from './components/Call/Chat/ChatList';

const App = () => {
  return (
    <main className="h-screen w-full flex flex-col justify-between bg-gray-900 overflow-hidden">
      <div className="w-full h-full flex p-3">
        <div className="flex flex-col items-center justify-between flex-1 px-2">
          <div className="w-full flex justify-end">
            <i className="material-icons text-white" style={{ fontSize: '16px' }}>mic_off</i>
          </div>
          <div className="flex items-center justify-center flex-1 w-full">
            <img className="h-18 w-18 rounded-full" src="https://lh3.googleusercontent.com/a-/AOh14GhinDC_5_G9VLzmIbRW5L0d8f6w6Kg92VxIKWSu=s120-p-k-no-mo" alt="Shri Hari L" />
          </div>
          <div className="w-full flex justify-start text-white text-sm">You</div>
        </div>
        <PeopleList />
        <ChatList />
      </div>
      <div className="flex flex-col space-y-2 md:flex-row items-center justify-between text-sm text-white px-3 pb-3">
        <div className="flex items-center">
          <Time className="text-xs" />
          <span className="mx-2 font-thin">|</span>
          <span>obo-qpck-cbz</span>
        </div>
        <div className="flex items-center">
          <CallActionButton icon="mic_off" active={true} />
          <CallActionButton icon="videocam_off" active={true} />
          <CallActionButton icon="closed_caption" active={false} />
          <CallActionButton icon="pan_tool" active={false} />
          <CallActionButton icon="present_to_all" active={false} />
          <CallActionButton icon="more_vert" active={false} />
          <CallActionButton icon="call_end" className="w-14" active={true} />
        </div>
        <div className="flex items-center">
          <CallOptionButton icon="info" />
          <CallOptionButton icon="group" />
          <CallOptionButton icon="chat" />
          <CallOptionButton icon="themes" />
          <CallOptionButton icon="security" />
        </div>
      </div>
    </main>
  );
}

export default App;
