// src/components/QuillEditor/QuillEditorToolbarStyle.jsx
import { styled } from "@mui/styles";

const QuillEditorToolbarStyle = styled("div")(({ theme }) => ({
  "& .ql-toolbar.ql-snow": {
    borderRadius: theme.shape.borderRadius,
    border: `solid 1px ${theme.palette.grey[500_32]}`,
  },
  "& .ql-container.ql-snow": {
    borderColor: "transparent",
  },
}));

export default QuillEditorToolbarStyle;