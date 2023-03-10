const blog = require('../models/blog')
const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')



blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .populate('user')
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.get('/:id', (request, response) => {
    Blog
        .findById(request.params.id)
        .populate('user')
        .then(blog => {
            response.json(blog)
        })
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    if (!request.body.hasOwnProperty('likes')) {
        blog.likes = 0
    }
    if (!request.body.hasOwnProperty('title') || !request.body.hasOwnProperty('author')) {
        return response.status(400).json({
            error: 'missing important properties title and/or author'
        })
    }
    if (!request.body.hasOwnProperty('user')) {
        blog.user = await User.findOne({});
    } else {
        blog.user = await User.findById(request.body.user);
    }
    console.log(blog)
    const savedblog = await blog.save()
    const user = await User.findById(blog.user.id)
    user.blogs = user.blogs.concat(blog._id)
    await user.save()
    return response.status(201).json(savedblog).end()
})

blogsRouter.delete('/:id', async (request, response) => {
    const user = request.user
    const blogRequested = await blog.findById(request.params.id)
    try {
        if (blogRequested.user.toString() == user) {
            Blog
                .findByIdAndDelete(request.params.id)
                .then(result => {
                    response.status(204).end()
                })
        } else {
            response.status(403).end()
        }
    } catch (error) {
        response.status(403).end()
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: body.user.id
    }
    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
        .then(async (updatedBlog) => {
            const user = await User.findById(body.user.id)
            user.blogs = user.blogs.concat(updatedBlog._id)
            await user.save()
            response.json(updatedBlog)
        })
        .catch(err => {
            console.log(err)
            response.status(400).json({
                error: err
            })
        })

})

module.exports = blogsRouter