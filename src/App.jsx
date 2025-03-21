// src/App.js
import { useState } from "react";
import QuillEditor from "./components/QuillEditor.jsx";

function App() {
  const [content, setContent] = useState("");

  return (
    <div style={{height:"200px", padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Blog Editor</h1>
      <QuillEditor
        value={content}
        onChange={setContent}
      />
    </div>
  );
}

export default App;