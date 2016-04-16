# coding=utf-8
import sys

import models

def add_quotes():
    quotes = [
        (u"\u0916\u095c\u0947 \u0915\u094d\u092f\u094b\u0902 \u0939\u094b, \u092c\u0948\u0920 \u091c\u093e\u0913", "Destination will arrive, you will never reach"),
    ]


    for hi, en in quotes:
        q = models.Quote(author='baba', desc='awesome is the quote, awesome is the author, awesome is the book',hi=hi,en=en)
        q.put()

for i in range(5):
    add_quotes()
