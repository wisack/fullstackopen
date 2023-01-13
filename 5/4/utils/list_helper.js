const _ = require('lodash');


const dummy = (blogs) => {
    return 1
  }

  
  const totalLikes = (blogs) => {
    return Array.length === 0 ? 0 : blogs.map(x => x.likes).reduce((accumulator, currValue) => accumulator + currValue, 0)
    }

  
  const favoriteBlog = (blogs) => {
    const likes = blogs.map(e=>e.likes)
    const favorite_blog = blogs.find(e => e.likes===Math.max(...likes))
    return favorite_blog
  }
  
  const mostBlogs = (blogs) => {
    const authors = blogs.map(x => x.author)
    const count = _.countBy(authors)
    const firstItem = Object.keys(count)[0]
    const blogCount = Object.values(count)[0]
    const findAuthor = blogs.find(x => x.author===firstItem)
    return {
        author: findAuthor.author,
        blogs: blogCount
    }
  }

  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
  }
