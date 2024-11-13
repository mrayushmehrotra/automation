// ColdEmailNode.js
import React from 'react';
import { Handle, Position } from 'reactflow';

const ColdEmailNode = ({ data }:any) => (
  <div className="p-4 border rounded bg-blue-100">
    <h4>{data.label || "Cold Email"}</h4>
    <p>Email: {data.email}</p>
    <Handle type="target" position={Position.Top} />
    <Handle type="source" position={Position.Bottom} />
  </div>
);

export default ColdEmailNode;
