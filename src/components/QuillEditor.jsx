// src/components/QuillEditor/QuillEditor.jsx
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import { styled } from "@mui/styles";
import { useState } from "react";
import EditorToolbar, { formats, redoChange, undoChange } from "./QuillEditorToolbar.jsx";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import { Icon } from "@iconify/react";
import visibilityIcon from "@iconify/icons-ic/visibility"; // Import visibility icon here

import { Quill } from "react-quill";
const Syntax = Quill.import("modules/syntax");
Syntax.DEFAULTS.highlight = (text) => hljs.highlightAuto(text).value;
Quill.register("modules/syntax", Syntax, true);

const RootStyle = styled("div")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`,
  "& .ql-container.ql-snow": {
    borderColor: "transparent",
    ...theme.typography.body1,
    fontFamily: theme.typography.fontFamily,
  },
  "& .ql-editor": {
    minHeight: 400,
    "&.ql-blank::before": {
      fontStyle: "normal",
      color: theme.palette.text.disabled,
    },
    "& pre.ql-syntax": {
      ...theme.typography.body2,
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.grey[900],
    },
  },
}));

const PreviewStyle = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  border: `solid 1px ${theme.palette.grey[500_32]}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[50],
  maxHeight: "300px", // Optional: limit height with scrollbar
  overflowY: "auto",
  "& pre": {
    backgroundColor: theme.palette.grey[900],
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    color: "#fff",
  },
}));

const PreviewButtonStyle = styled("button")(({ theme, active }) => ({
  marginTop: theme.spacing(1),
  padding: theme.spacing(1),
  border: `solid 1px ${theme.palette.grey[500_32]}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: active ? theme.palette.primary.light : "transparent",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

QuillEditor.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  simple: PropTypes.bool,
  sx: PropTypes.object,
};

export default function QuillEditor({
  id = "minimal-quill",
  error,
  value,
  onChange,
  simple = false,
  sx,
  ...other
}) {
  const [showPreview, setShowPreview] = useState(false);

  const modules = {
    toolbar: {
      container: `#${id}`,
      handlers: {
        undo: undoChange,
        redo: redoChange,
        // Removed preview handler from here
      },
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
    syntax: true,
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <RootStyle
      sx={{
        ...(error && {
          border: (theme) => `solid 1px ${theme.palette.error.main}`,
        }),
        ...sx,
      }}
    >
      <EditorToolbar id={id} isSimple={simple} />
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="Write something awesome..."
        {...other}
      />
      <PreviewButtonStyle
        active={showPreview}
        onClick={() => setShowPreview((prev) => !prev)}
        title="Toggle Preview"
      >
        <Icon
          icon={visibilityIcon}
          width={18}
          height={18}
          style={{ color: showPreview ? "#1976d2" : "inherit" }}
        />
      </PreviewButtonStyle>
      {showPreview && (
        <PreviewStyle dangerouslySetInnerHTML={{ __html: value }} />
      )}
    </RootStyle>
  );
}