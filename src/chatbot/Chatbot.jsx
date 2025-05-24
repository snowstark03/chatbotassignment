// ChatSupportUI.js

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  MoreVertical,
  User,
  Users,
  Paperclip,
  MoveUp,
  SendHorizonal
} from "lucide-react";
import Avatar from "react-avatar";

const chatUsers = [
  { name: "Luis - Github", message: "Hey! I have a question...", time: "45m" },
  {
    name: "Ivan - Nike",
    message: "Hi there, I have a question...",
    time: "30m"
  },
  {
    name: "Lead from New York",
    message: "Good morning, let me...",
    time: "40m"
  },
  { name: "Booking API problems", message: "Bug report", time: "45m" },
  {
    name: "Miracle - Exemplary Bank",
    message: "Hey there, I'm here to...",
    time: "45m"
  }
];

const dummyChats = {
  "Luis - Github": [
    { from: "user", text: "Can I get a refund?", time: "1min" },
    {
      from: "agent",
      text: "Sure, let me check that for you.",
      time: "Just now"
    }
  ],
  "Ivan - Nike": [
    { from: "user", text: "Do you ship to Canada?", time: "2min" },
    { from: "agent", text: "Yes, we do ship worldwide.", time: "1min" }
  ],
  "Lead from New York": [
    { from: "user", text: "Can someone assist with pricing?", time: "10min" },
    {
      from: "agent",
      text: "Sure! I’ll send you our latest catalog.",
      time: "5min"
    }
  ],
  "Booking API problems": [
    { from: "user", text: "The API is throwing a 500 error.", time: "8min" },
    {
      from: "agent",
      text: "Thanks for reporting, we're looking into it.",
      time: "6min"
    }
  ],
  "Miracle - Exemplary Bank": [
    {
      from: "user",
      text: "How do I access my account reports?",
      time: "15min"
    },
    {
      from: "agent",
      text: "Please log in and go to Reports > Summary.",
      time: "10min"
    }
  ]
};

const aiCopilotChat = [
  {
    from: "user",
    text: `How do I get a refund ?`
  },
  {
    from: "copilot",
    text: `We understand that sometimes a purchase may not meet your expectations, and you may need to request a refund.`,
    text1: `To assist you with the refund request, could you please provide your voter id and proof of purchase.`,
    text2: `Once I've checked these details, if everything looks OK, I will send a returns QR code which you can use to post the item back to us. Your refund will be automatically issued once you put in the post.`
  }
];

const detailsSections = [
  "LINKS",
  "USER DATA",
  "CONVERSATION ATTRIBUTES",
  "COMPANY DETAILS",
  "SALESFORCE",
  "STRIPE",
  "JIRA FOR TICKETS"
];

export default function ChatSupportUI() {
  const [selectedUser, setSelectedUser] = useState(chatUsers[0].name);
  const [activeTab, setActiveTab] = useState("Copilot");
  const [expandedSections, setExpandedSections] = useState({});
  const [chattext, setchattext] = useState("");
  const [copilottext, setcopilottext] = useState("");
  const [chatstate, setchatstate] = useState(false);

  const toggleSection = section => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const currentChats = dummyChats[selectedUser];

  return (
    <div className="flex flex-col md:flex-row w-full h-screen font-sans bg-[#f5f5f5]">
      {/* Sidebar */}
      <div className="flex-shrink-0 md:w-1/4 w-full bg-white border-r border-gray-300 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Your inbox</h2>
        </div>
        <div className="flex items-center justify-between px-4 py-2 text-sm border-b border-gray-100">
          <div className="font-medium">5 Open</div>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {chatUsers.map((item, idx) =>
            <motion.div
              key={idx}
              className={`px-4 py-3 cursor-pointer flex gap-3 items-start ${selectedUser ===
              item.name
                ? "bg-yellow-100"
                : "hover:bg-gray-100"}`}
              onClick={() => setSelectedUser(item.name)}
              whileHover={{ scale: 1.02 }}
            >
              <Avatar name={item.name} size="32" round={true} />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-gray-900 truncate">
                  {item.name}
                </div>
                <div className="text-xs text-gray-600 truncate">
                  {item.message}
                </div>
                <div className="text-xs text-gray-400">
                  {item.time}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-grow md:w-1/2 w-full flex flex-col bg-white">
        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Avatar name={selectedUser} size="32" round={true} />
            <h3 className="font-semibold">
              {selectedUser}
            </h3>
          </div>
          <MoreVertical size={18} className="text-gray-500 cursor-pointer" />
        </div>

        <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-gray-50">
          <AnimatePresence>
            {currentChats.map((chat, index) =>
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-2 items-start ${chat.from === "agent"
                  ? "justify-end"
                  : ""}`}
              >
                {chat.from === "user" &&
                  <Avatar
                    name={selectedUser}
                    size="32"
                    round={true}
                    className="mt-3"
                  />}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`p-3 rounded-lg max-w-lg shadow text-sm ${chat.from ===
                  "agent"
                    ? "bg-blue-100 text-gray-800"
                    : "bg-white text-gray-800"}`}
                  onDoubleClick={() => {
                    if (chat.from === "user") {
                      setcopilottext(chat.text);
                    } else {
                      alert("Select the user message!");
                    }
                  }}
                >
                  {chat.text}
                  <div
                    className={`text-[11px] mt-1 ${chat.from === "agent"
                      ? "text-right text-gray-500"
                      : "text-gray-400"}`}
                  >
                    {chat.time}
                  </div>
                </motion.div>
                {chat.from === "agent" &&
                  <Avatar
                    name="Agent"
                    size="32"
                    round={true}
                    className="mt-3"
                  />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="border-t border-gray-200 px-6 py-4">
          <div className="flex items-center border rounded-md p-2 bg-white shadow-sm">
            {/* <Paperclip
              size={18}
              className="text-gray-400 cursor-pointer mr-2"
            /> */}
            <textarea
              type="textarea"
              rows="3"
              className="flex-1 text-sm focus:outline-none"
              placeholder="Chat..."
              value={chattext}
              onChange={e => setchattext(e.target.value)}
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="text-white bg-black rounded p-1"
              onClick={() => {
                const a = dummyChats[selectedUser];
                if (chatstate) {
                  a.push({ from: "agent", text: chattext, time: "Just now" });
                  setchatstate(false);
                } else {
                  a.push({ from: "user", text: chattext, time: "Just now" });
                }
                setchattext("");
              }}
            >
              <SendHorizonal size={18} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Copilot & Details Panel */}
      <div className="flex-shrink-0 md:w-1/4 w-full bg-white flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex gap-6 text-sm">
            {["Copilot", "Details"].map(tab =>
              <button
                key={tab}
                style={{ background: "#fff" }}
                className={`font-medium pb-1 ${activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            )}
          </div>
          <MoreVertical size={18} className="text-gray-500 cursor-pointer" />
        </div>

        {activeTab === "Copilot"
          ? <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col px-4 py-4 space-y-4 overflow-y-auto text-sm"
            >
              {aiCopilotChat.map((chat, idx) =>
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className={
                    chat.from === "copilot"
                      ? "bg-purple-100 p-3 rounded-md shadow-sm"
                      : "bg-grey-700 p-3 rounded-md shadow-sm"
                  }
                >
                  <div className="font-semibold text-gray-800 mb-1">
                    {chat.from === "copilot" ? "Fin" : "You"}
                  </div>
                  <div className="text-gray-700 whitespace-pre-line">
                    {chat.text}
                  </div>
                  <br />
                  <div className="text-gray-700 whitespace-pre-line">
                    {chat.text1}
                  </div>
                  <br />
                  <div className="text-gray-700 whitespace-pre-line">
                    {chat.text2}
                  </div>
                  <br />
                  {chat.from === "copilot" &&
                    <button
                      className="w-full text-white bg-black rounded p-1"
                      onClick={() => {
                        setchattext(`${chat.text} ${chat.text1} ${chat.text2}`);
                        setchatstate(true);
                      }}
                    >
                      Add to Composer
                    </button>}
                </motion.div>
              )}
            </motion.div>
          : <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 px-4 py-4 overflow-y-auto text-sm"
            >
              <div className="flex gap-8 mb-3">
                <p className="text-gray-600">Assignee:</p>
                <div className="flex items-center gap-2">
                  <User size={16} className="text-gray-500" />
                  <span className="text-gray-800 font-medium">Brian Byrne</span>
                </div>
              </div>
              <br />
              <div className="flex gap-14 mb-4">
                <p className="text-gray-600">Team:</p>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-gray-500" />
                  <span className="text-gray-800 font-medium">Unassigned</span>
                </div>
              </div>

              {detailsSections.map((section, idx) =>
                <div key={idx} className="pt-7">
                  <div
                    className="flex items-center justify-between cursor-pointer py-2"
                    onClick={() => toggleSection(section)}
                  >
                    <span className="text-gray-800 font-medium">
                      {section}
                    </span>
                    {expandedSections[section]
                      ? <ChevronUp size={14} className="text-gray-500" />
                      : <ChevronDown size={14} className="text-gray-500" />}
                  </div>
                  <AnimatePresence>
                    {expandedSections[section] &&
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-gray-600 text-sm pl-2 pb-2"
                      >
                        Placeholder content for {section}
                      </motion.div>}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>}
        {activeTab == "Copilot" &&
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center border rounded-md p-2 bg-white shadow-sm">
              <input
                type="text"
                className="flex-1 text-sm focus:outline-none"
                placeholder={
                  activeTab === "Copilot" ? "Ask a question..." : "Search..."
                }
                value={copilottext}
                onChange={e => setcopilottext(e.target.value)}
              />
              <button
                className="text-white bg-gray-800 rounded p-1"
                style={{ background: "#fff", color: "#000" }}
                onClick={() => {
                  aiCopilotChat.push({
                    from: "copilot",
                    text: `We understand your query`,
                    text1: `To assist you with "${copilottext}" request, could you please provide your voter id proof.`,
                    text2: `Once I've checked these details, we will update you about the solution.`
                  });
                  setcopilottext("");
                }}
              >
                {/* <SendHorizonal size={18} /> */}
                <MoveUp size={18} />
              </button>
            </div>
          </div>}
      </div>
    </div>
  );
}
