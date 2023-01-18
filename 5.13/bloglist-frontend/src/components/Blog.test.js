/* eslint-disable testing-library/no-debugging-utils */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog cases', () => {
  let container

  /*const setup = () => {
    const blog = {
      _id:'1dbl0g',
      title:'How to create an awesome blog',
      url:'https://www.easyblog.com',
      likes:513,
      author:'Totally not a scam',
      user:{
        id:'t0t4llyN0rm4l1d'
      }
    }
    render(
      <Blog key={blog._id} blog={blog}/>
    )
  }*/

  beforeEach(() => {
    //container = setup().container
    const blog = {
      _id:'1dbl0g',
      title:'How to create an awesome blog',
      url:'https://www.easyblog.com',
      likes:513,
      author:'Totally not a scam',
      user:{
        id:'t0t4llyN0rm4l1d'
      }
    }
    container = render(
      <Blog key={blog._id} blog={blog}/>
    ).container
  })

  test('renders names and author, but not likes and url by default', async () => {
    //screen.debug(container)
    const divName = container.querySelector('.blogName')
    expect(divName).toBeVisible()
    const divAuthor = container.querySelector('.blogAuthor')
    expect(divAuthor).toBeVisible()
    const divUrl = container.querySelector('.blogUrl')
    expect(divUrl).not.toBeVisible()
    const divLikes = container.querySelector('.blogLikes')
    expect(divLikes).not.toBeVisible()
  })
})