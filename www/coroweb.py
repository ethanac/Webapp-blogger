#!/usr/bin/env python3
# -*- coding: utf-8 -*-

__author__ = 'Hao Zhang'

import asyncio, os, inspect, logging, functools
from urllib import parse
from aiohttp import web
# from apis import APIError


def get(path):
    '''
    Define decorator @get('/path')
    '''
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kw):
            return func(*args, **kw)
        wrapper.__method__ = 'GET'
        wrapper.__route__ = path
        return wrapper
    return decorator()


class RequestHandler(object):
    def __init__(self, app, fn):
        self._app = app
        self._func = fn


    @asyncio.coroutine
    def __call__(self, request):
        kw = {}
        r = yield from self._func(**kw)
        return r
