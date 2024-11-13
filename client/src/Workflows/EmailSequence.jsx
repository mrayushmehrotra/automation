import React, { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { v4 as uuidv4 } from "uuid"; 

// Import custom nodes
import ColdEmailNode from "./ColdEmailNode";
import WaitDelayNode from "./WaitDelayNode";
import LeadSourceNode from "./LeadSourceNode";

const nodeTypes = {
  coldEmail: ColdEmailNode,
  waitDelay: WaitDelayNode,
  leadSource: LeadSourceNode,
};

const EmailSequenceBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [formData, setFormData] = useState({
    label: "",
    email: "",
    delay: "",
    leadSource: "",
  });

  const openModal = (type) => {
    setModalType(type);
    setFormData({ label: "", email: "", delay: "", leadSource: "" });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const leadSourceOptions = ["SalesBlink Demo", "RE: Follow Up", "Other Option"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addNode = () => {
    const newNode = {
      id: uuidv4(),
      type: modalType,
      position: { x: 250 + nodes.length * 30, y: 150 + nodes.length * 30 },
      data: { ...formData },
    };
    setNodes((nds) => [...nds, newNode]);
    closeModal();
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded shadow-md">
        <button
          onClick={() => openModal("coldEmail")}
          className="mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Cold Email
        </button>
        <button
          onClick={() => openModal("waitDelay")}
          className="mb-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Wait/Delay
        </button>
        <button
          onClick={() => openModal("leadSource")}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Add Lead Source
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <h2 className="text-lg font-bold mb-2 capitalize">{modalType} Node</h2>
            <p className="text-sm text-gray-500 mb-4">Enter details for the {modalType} node.</p>

            <label className="block mb-2 text-gray-700">Label</label>
            <input
              name="label"
              type="text"
              placeholder="Enter label"
              value={formData.label}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            {modalType === "coldEmail" && (
              <input
                name="email"
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
            )}

            {modalType === "waitDelay" && (
              <input
                name="delay"
                type="number"
                placeholder="Enter delay time"
                value={formData.delay}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
            )}

            {modalType === "leadSource" && (
              <>
                <select
                  name="leadSource"
                  value={formData.leadSource}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                >
                  {leadSourceOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </>
            )}

            <div className="flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={addNode}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add Node
              </button>
            </div>
          </div>
        </div>
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes} // Register custom node types here
        fitView
      >
        <MiniMap />
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default EmailSequenceBuilder;
