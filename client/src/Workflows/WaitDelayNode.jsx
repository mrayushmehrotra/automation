// WaitDelayNode.js
import React from 'react';
import { Handle, Position } from 'reactflow';

const WaitDelayNode = ({ data }) => (
  <div className="p-4 border rounded bg-green-100">
    <h4>{data.label || "Wait/Delay"}</h4>
    <p>Delay: {data.delay} hours</p>
    <Handle type="target" position={Position.Top} />
    <Handle type="source" position={Position.Bottom} />
  </div>
);

export default WaitDelayNode;
