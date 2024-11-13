// LeadSourceNode.js
import React from 'react';
import { Handle, Position } from 'reactflow';

const LeadSourceNode = ({ data }) => (
  <div className="p-4 border rounded bg-purple-100">
    <h4>{data.label || "Lead Source"}</h4>
    <p>Source: {data.leadSource}</p>
    <Handle type="target" position={Position.Top} />
    <Handle type="source" position={Position.Bottom} />
  </div>
);

export default LeadSourceNode;
