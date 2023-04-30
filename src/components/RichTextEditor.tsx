import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

interface IReactQuillProps {
  theme?: string;
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
}

const ReactQuill = dynamic<IReactQuillProps>(() => import("react-quill"), {
  ssr: false,
});

interface Props {
  value: string;
  onChange: (value: string) => void;
  color?: string;
}

const RichTextEditor = ({ value, onChange, color }: Props) => {
  const [editorHtml, setEditorHtml] = useState(value);

  const handleChange = useCallback(
    (content: string) => {
      setEditorHtml(content);
      onChange(content);
    },
    [onChange]
  );

  const editorStyle = {
    width: "100%",
    height: "100%",
    padding: 0,
    margin: 0,
    border: `1px solid #${color}`,
    color: `#${color}`,
    overflow: "hidden",
  };
  const placeholderStyle = `
    .ql-editor::before {
      color: #ad3;
    }
    .ql-container {
        border: none;
      }
  `;

  return (
    <>
      <style>{placeholderStyle}</style>
      <ReactQuill
        theme="snow"
        value={editorHtml}
        onChange={handleChange}
        placeholder="Enter your text here"
        style={editorStyle}
      />
    </>
  );
};

export default RichTextEditor;
