import { Edge, Node } from "reactflow";
export const initialNodes: Node[] = [
    {
      id: "1",
      data: {
        label: 'Cold Email',
        dropdownOptions: ['SalesBlink Demo', 'RE: Follow Up', 'Other Option'],
      },
      position: { x: 10, y: 10 },
      type:"ColdEmail"
    },
    {
      id: "2",
      data: {
        label: "Wait/Delay",
      },
      position: { x: 100, y: 100 },
      type:"WaitDelay"

    },
    {
      id: "3",
      data: {
        label: "Node 3",
      },
      position: { x: 30, y: 10 },
        type:"LeadSource"
    },
  ];
  
  export const initialEdges: Edge[] = [
    { id: "1-2", source: "1", target: "2", animated:true}
  
  ];
  