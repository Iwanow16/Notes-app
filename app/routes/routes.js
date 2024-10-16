module.exports = function (app, db) {
  // Добавление заметки
  app.post("/notes/add", async (req, res) => {
    const note = {
      text: req.body.body,
      title: req.body.title,
    };

    try {
      const result = await db.collection("notes").insertOne(note);
      console.log("NOTE", note);
      res.send({
        text: note.text,
        title: note.title,
        _id: result.insertedId,
      });
    } catch (err) {
      console.log("ERROR", err);
      res.send({
        error: "An error has occurred",
      });
    }
  });

  // Получение всех заметок
  app.get("/notes/all", async (req, res) => {
    try {
      const result = await db.collection("notes").find({}).toArray();
      console.log("result:", result);
      res.send(result);
    } catch (err) {
      console.log("An error has occurred", err);
      res.send({
        error: "An error has occurred",
      });
    }
  });

  const { ObjectId } = require("mongodb");

  // Удаление заметки по id
  app.delete("/notes/:id", async (req, res) => {
    const id = req.params.id;

    try {
      const result = await db
        .collection("notes")
        .deleteOne({ _id: ObjectId.createFromHexString(id) });

      console.log("Note deleted successfully");
      res.status(200).json({
        message: "Note deleted successfully",
      });
    } catch (err) {
      console.error("Error deleting note:", err);
      res.status(500).json({
        error: "An error occurred while deleting the note",
        details: err.message,
      });
    }
  });

  // Редактирование заметки по id
  app.put("/notes/:id", async (req, res) => {
    const id = req.params.id;
    const updatedNote = req.body;
    console.log(req.body);
    try {
      const result = await db
        .collection("notes")
        .updateOne(
          { _id: ObjectId.createFromHexString(id) },
          { $set: updatedNote }
        );

      console.log("Note updated successfully");
      console.log(updatedNote);

      res.status(200).json({
        message: "Note updated successfully",
        note: { id, ...updatedNote },
      });
    } catch (err) {
      console.error("Error updating note:", err);
      res.status(500).json({
        error: "An error occurred while updating the note",
        details: err.message,
      });
    }
  });
};