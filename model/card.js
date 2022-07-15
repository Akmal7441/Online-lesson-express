const Lesson = require("./lesson");
const path = require("path");
const fs = require("fs");

const dir = path.join(require.main.filename, "..", "data", "card.json");

class Card {
  static async removeById(id) {
    try {
        
      const lessons = await Card.get();
      const idx = await lessons.items.findIndex((lsn) => lsn.id === id);
      console.log(idx);

      if (idx < 0) {
        return new Error("Id not found");
      }

      if (lessons.items[idx].count === 1) {
        lessons.items.splice(idx, 1);
      } else {
        lessons.items[idx].count = lessons.items[idx].count - 1
        card.price = card.price - +card.books[idx].price
      }
      return new Promise((res, rej) => {
        fs.writeFile(
          path.join(__dirname, "..", "data", "card.json"),
          JSON.stringify(lessons),
          (err) => {
            if (err) rej(err);
            res();
          }
        );
      });
    } catch (error) {
      if (error) console.log(error);
    }
  }

  static async add(id) {
    const lesson = await Lesson.findById(id); // {}
    const data = await Card.get();

    const idx = data.items.findIndex((item) => item.id === id); // 0 1 2 3 3 56 6 65 / -1

    if (idx < 0) {
      // demak dars korzinada yo'q uni qo'shish kerak
      lesson.count = 1;
      data.items.push(lesson);
    } else {
      // demak dars korzinada bor uni sonini 1 ga oshirib qo'yamiz
      data.items[idx].count++;
    }

    data.price = +data.price + +lesson.price;

    return new Promise((res, rej) => {
      fs.writeFile(dir, JSON.stringify(data), (err) => {
        if (err) rej(err);
        else res(data.items);
      });
    });
  }

  static async get() {
    return new Promise((res, rej) => {
      fs.readFile(dir, "utf-8", (err, data) => {
        // console.log(JSON.parse(data).price);
        if (err) rej(err);
        else res(JSON.parse(data));
      });
    });
  }
}

module.exports = Card;
