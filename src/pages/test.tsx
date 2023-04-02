import RichTextEditor from "@/components/RichTextEditor";
import { useState } from "react";

const TestPage = () => {
  const [text, setText] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Handle form submission
    console.log(text)
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <form onSubmit={handleSubmit}>
        <RichTextEditor value={text} onChange={setText} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TestPage;
