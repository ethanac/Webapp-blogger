#!/usr/bin/env python3
# -*- coding: utf-8 -*-

'''
JSON API Definition.
'''

import json, logging, inspect, functools

class APIError(Exception):
    def __init__(self, error, data='', message=''):
        super(APIError, self).__init__(message)
        self.error = error
        self.data = data
        self.message = message
