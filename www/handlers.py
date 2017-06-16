#!/usr/bin/env python3
# -*- coding: utf-8 -*-

__author__ = 'Hao Zhang'

' url handlers '

import re, time, json, logging, hashlib, base64, asyncio

from coroweb import get, post

from models import User, Comment, Blog, next_id


@get('/')
def index(request):
    # users = yield from User.find_all()
    summary = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, ' \
              'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    blogs = [
        Blog(id='1', name='Test Blog', summary=summary, created_at=time.time()-120),
        Blog(id='2', name='Something New', summary=summary, created_at=time.time() - 3200),
        Blog(id='3', name='Learn Javascript', summary=summary, created_at=time.time() - 7200),
    ]
    return {
        '__template__': 'blogs.html',
        'blogs': blogs
    }


@post('/api/users')
def api_register_user(*, email, name, passwd):
    if not name or not name.strip():
        raise APIV