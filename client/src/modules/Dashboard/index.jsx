import React from "react";
import AVATAR from "../../../public/Avatar.jpg";
import {
  Search,
  Phone,
  Video,
  MoreHorizontal,
  Settings,
  Bell,
  Plus,
  Send,
  Smile,
  Paperclip,
} from "lucide-react";
import Input from "../../components/Input";

const Dashboard = () => {
  const Contacts = [
    {
      name: "John Doe",
      status: "Available",
      avatar: AVATAR,
    },
    {
      name: "Marry Jane",
      status: "Available",
      avatar: AVATAR,
    },
    {
      name: "Alex Smith",
      status: "Available",
      avatar: AVATAR,
    },
    {
      name: "Jackie Martin",
      status: "Available",
      avatar: AVATAR,
    },
    {
      name: "Clay Jhonson",
      status: "Available",
      avatar: AVATAR,
    },
    {
      name: "Shezuka Haruno",
      status: "Available",
      avatar: AVATAR,
    },
    {
      name: "Albert Tokyo",
      status: "Available",
      avatar: AVATAR,
    },
    
  ];
  return (
    <div className="w-screen flex">
      {/* LEFT SIDEBAR */}
      <div className="w-[25%] h-screen bg-white border-r border-gray-300">
        <div className="flex justify-center items-center my-4 px-4">
          <img
            className="border border-blue-600 rounded-3xl p-1"
            src={AVATAR}
            width={50}
            height={50}
            alt="User Avatar"
          />
          <div className="ml-4">
            <h5 className="text-base font-semibold">User Name</h5>
            <p className="text-sm text-gray-500">My Account</p>
          </div>
          <Settings className="ml-auto cursor-pointer text-gray-600" size={20} />
        </div>
        <hr className="border-b border-gray-300" />
        <div className="mx-6 mt-5">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold text-blue-600">Messages</h4>
            <Plus size={20} className="cursor-pointer text-blue-600" />
          </div>
          <div className="mt-4">
            {Contacts.map((contact, index) => (
              <div
                key={index}
                className="flex items-center py-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
              >
                <img
                  className="border border-blue-600 rounded-3xl p-1"
                  src={contact.avatar}
                  width={40}
                  height={40}
                  alt="contact avatar"
                />
                <div className="ml-4">
                  <h5 className="text-sm font-medium">{contact.name}</h5>
                  <p className="text-xs text-gray-500">{contact.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CHAT WINDOW */}
      <div className="w-[50%] bg-white flex flex-col h-screen">
        {/* Chat Header */}
        <div className="w-[90%] mx-auto h-[70px] bg-[#e1edff] mt-6 rounded-full flex items-center px-6">
          <img
            className="border border-blue-600 rounded-3xl  cursor-pointer"
            src={AVATAR}
            alt="avataar"
            width={50}
            height={50}
          />
          <div className="ml-6 mr-auto">
            <h5 className="text-sm font-semibold">Alexzander</h5>
            <p className="text-sm text-gray-500">Online</p>
          </div>
          <div className="flex items-center gap-4">
            <Phone size={22} className="text-gray-600 cursor-pointer" />
            <Video size={25} className="text-gray-600 cursor-pointer" />
            <MoreHorizontal size={22} className="text-gray-600 cursor-pointer" />
          </div>
        </div>

        {/* Chat Body */}
        <div className="flex-1 w-full overflow-y-scroll px-10 py-6">
          <div className="p-3 max-w-[45%] bg-[#e1edff] rounded-b-xl rounded-tr-xl mb-4">
            Hey, how are you?
          </div>
          <div className="p-3 max-w-[45%] bg-blue-600 rounded-b-xl rounded-tl-xl mb-4 ml-auto text-white">
            I'm good, working on a project!
          </div>
          <div className="p-3 max-w-[45%] bg-[#e1edff] rounded-b-xl rounded-tr-xl mb-4">
            That’s awesome. Let’s catch up later.
          </div>
          <div className="p-3 max-w-[45%] bg-blue-600 rounded-b-xl rounded-tl-xl mb-4 ml-auto text-white">
            Sure, let's plan for tonight!
          </div>
          <div className="p-3 max-w-[45%] bg-[#e1edff] rounded-b-xl rounded-tr-xl mb-4">
            Hey, how are you?
          </div>
          <div className="p-3 max-w-[45%] bg-blue-600 rounded-b-xl rounded-tl-xl mb-4 ml-auto text-white">
            I'm good, working on a project!
          </div>
          <div className="p-3 max-w-[45%] bg-[#e1edff] rounded-b-xl rounded-tr-xl mb-4">
            That’s awesome. Let’s catch up later.
          </div>
          <div className="p-3 max-w-[45%] bg-blue-600 rounded-b-xl rounded-tl-xl mb-4 ml-auto text-white">
            Sure, let's plan for tonight!
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-6 w-full flex items-center gap-3">
          <Smile size={24} className="text-gray-600 cursor-pointer" />
          <Paperclip size={22} className="text-gray-600 cursor-pointer" />
          <Input
            className="flex-1"
            inputClassname="shadow-lg border-0 p-4 rounded-full bg-gray-100 focus:ring-0 focus:outline-0"
            placeholder="Type your message..."
          />
          <Send size={24} className="text-blue-600 cursor-pointer" />
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-[25%] h-screen bg-white border-l border-gray-300 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <h3 className="text-lg font-semibold">Details</h3>
          <Bell size={20} className="cursor-pointer text-gray-600" />
        </div>

        {/* Profile Info */}
        <div className="flex flex-col items-center p-6">
          <img
            src={AVATAR}
            alt="profile"
            className="w-24 h-24 rounded-full border-2 border-blue-600"
          />
          <h4 className="mt-4 text-lg font-semibold">Alexzander</h4>
          <p className="text-sm text-gray-500">Frontend Developer</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700">
            View Profile
          </button>
        </div>

        {/* About Section */}
        <div className="px-6 mt-4">
          <h5 className="text-sm text-gray-500 uppercase">About</h5>
          <p className="mt-2 text-sm text-gray-700 leading-relaxed">
            Passionate developer with experience in React, Node.js, and UI/UX design.
          </p>
        </div>

        {/* Media / Files Section */}
        <div className="px-6 mt-6">
          <h5 className="text-sm text-gray-500 uppercase mb-2">Shared Files</h5>
          <div className="flex flex-col gap-2 text-sm text-blue-600 cursor-pointer">
            <p>📄 project-doc.pdf</p>
            <p>🖼️ design.png</p>
            <p>🎵 audio.mp3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


