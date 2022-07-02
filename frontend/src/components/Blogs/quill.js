const quillmodules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 },{header:[3,4,5]},{font:[]}], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    ["link", "image", "video"] , 
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],
    
    ["clean"],
  ],
};
const quillformats = [
  "header",
  "font",
  "size",
  "bold",
  "background",
  "color",
  "code",
  "italic",
  "link",
  "script",
  "strike",
  "underline",
  "blockquote",
  "indent",
  "list",
  "align",
  "direction",
  "code-block",
  "formula",
  "image",
  "video",
];
module.exports = {quillmodules,quillformats}