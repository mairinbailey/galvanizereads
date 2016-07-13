module.exports = {
  findBook: function(name, list) {
    for (var i = 0; i < list.length; i++) {
      var book = list[i]
      if (name === book.title) {
        return book.id
      }
    }
  },
  findAuthor: function(name, list) {
    for (var i = 0; i < list.length; i++) {
      var author = list[i]
      if (name === author.last_name) {
        return author.id
      }
    }
  }
}
