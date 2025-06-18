import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import "./App.css"; // Keep your own custom styles

export default function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [script, setScript] = useState("");
  const [output, setOutput] = useState("");

  const runCode = () => {
    try {
      const input = JSON.parse(jsonInput);
      const func = new Function('input', 'output', script + '; return output;');
      const result = func(input, {});
      setOutput(JSON.stringify(result, null, 2));
    } catch (err) {
      setOutput(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100 text-black">
      {/* Top: Editors side by side on desktop, stacked on mobile */}
      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden px-4 py-2 gap-4">
        {/* Input JSON */}
        <div className="w-full lg:w-1/2 bg-white rounded-xl p-4 flex flex-col overflow-hidden">
          <h2 className="text-lg font-semibold mb-2">📝 Input JSON</h2>
          <div className="flex-1">
            <Editor
              theme="vs-dark"
              height="500px"
              language="json"
              value={jsonInput}
              onChange={(val) => setJsonInput(val || "")}
              options={{ minimap: { enabled: false }, fontSize: 14 }}
            />
          </div>
        </div>

        {/* Output JSON */}
        <div className="w-full lg:w-1/2 bg-white rounded-xl p-4 flex flex-col overflow-hidden">
          <h2 className="text-lg font-semibold mb-2">📤 Output</h2>
          <div className="flex-1">
            <Editor
              theme="vs-dark"
              height="500px"
              language="json"
              value={output}
              options={{ readOnly: true, minimap: { enabled: false }, fontSize: 14 }}
            />
          </div>
        </div>
      </div>

      {/* Bottom: Script Editor */}
      <div className="bg-white border-t shadow p-4">
        <h2 className="text-lg font-semibold text-center mb-3">
          ✏️ Script Editor <code className="text-sm bg-gray-200 px-2 py-0.5 rounded">input</code>
        </h2>

        <div className="flex justify-center mb-4">
          <button
            onClick={runCode}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow transition"
          >
            ▶️ Run Script
          </button>
        </div>

        <div className="w-full px-2 lg:px-0 max-w-5xl mx-auto">
          <Editor
            theme="vs-dark"
            height="200px"
            language="javascript"
            value={script}
            onChange={(val) => setScript(val || "")}
            options={{ minimap: { enabled: false }, fontSize: 14 }}
          />
        </div>
      </div>
    </div>
  );
}
