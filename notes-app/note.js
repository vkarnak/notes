const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

const notePath = path.join(__dirname, "notes.json");

const getNotes = (callback) => {
  fs.readFile(notePath, "utf-8", (err, content) => {
    if (err) {
      throw new Error(err);
    }

    try {
      callback(JSON.parse(content));
    } catch (e) {
      callback([]);
    }
  });
};

const addNote = (title, text) => {
  getNotes((notes) => {
    console.log("addNote", notes);
    const isExists = notes.find((note) => note.title === title);

    if (isExists) {
      console.log(chalk.red.inverse("This note title is exists"));
    } else {
      notes.push({ title, text });
      saveNotes(notes);
      console.log(chalk.green.inverse("Note added"));
    }
  });
};

const saveNotes = (content) => {
  fs.writeFile(notePath, JSON.stringify(content), (err) => {
    if (err) {
      throw new Error(err);
    }
  });
};

const listNotes = () => {
  getNotes((notes) => {
    if (notes.length) {
      console.log(chalk.inverse("Note list: "));
      notes.forEach((note) => {
        console.log(note.title);
      });
    } else {
      console.log(chalk.blue("Note list is empty. Add new note."));
    }
  });
};

const readNote = (title) => {
  getNotes((notes) => {
    const note = notes.find((n) => n.title === title);
    if (note) {
      console.log(chalk.inverse(note.title));
      console.log(note.text);
    } else {
      console.log(chalk.red(`Can't find note '${title}'`));
    }
  });
};

const deleteNote = (title) => {
  getNotes((notes) => {
    const updatedNotes = notes.filter((note) => note.title !== title);

    if (updatedNotes.length !== notes.length) {
      saveNotes(updatedNotes);
      console.log(chalk.green(`Note ${title} was deleted`));
    } else {
      console.log(chalk.red(`Can't find note '${title}'`));
    }
  });
};

module.exports = {
  addNote,
  listNotes,
  readNote,
  deleteNote,
};
