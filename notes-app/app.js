const yargs = require("yargs");
const pkg = require("./package.json");
const note = require("./note.js");

yargs.version(pkg.version);

yargs.command({
  command: "add",
  decribe: "Add note",
  builder: {
    title: {
      type: "string",
      demandOption: true,
      decribe: "Note title",
    },
    text: {
      type: "string",
      demandOption: true,
      decribe: "Note text",
    },
  },
  handler({ title, text }) {
    note.addNote(title, text);
  },
});

yargs.command({
  command: "list",
  decribe: "View notes list",
  handler() {
    note.listNotes();
  },
});

yargs.command({
  command: "read",
  decribe: "Read note",
  builder: {
    title: {
      type: "string",
      demandOption: true,
      decribe: "Note title",
    },
  },

  handler({ title }) {
    note.readNote(title);
  },
});

yargs.command({
  command: "delete",
  decribe: "Delete note",
  builder: {
    title: {
      type: "string",
      demandOption: true,
      decribe: "Note title",
    },
  },
  handler({ title }) {
    note.deleteNote(title);
  },
});

yargs.parse();
