import webapp2
import models
import logging
import json

def json_handler(obj):
    return obj.isoformat() if hasattr(obj, 'isoformat') else obj

class Api(webapp2.RequestHandler):
    def get(self):
        data= {'success': True}
        try:
            data['data'] = self.api_get()
        except Exception,e:
            data['success'] = False
            data['error'] = str(e)

        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(data, default=json_handler))

class ApiHelp(Api):
    def api_get(self):
        return [
            "/api/quotes : list all quotes"
        ]

class ApiQuote(Api):
    def api_get(self):
        quotes = models.Quote.query().fetch(10)
        data = {}
        quotes_list = []
        for quote in quotes:
            quotes_list.append(quote.to_dict())
        return quotes_list


app = webapp2.WSGIApplication([
    ('/api/?', ApiHelp),
    ('/api/quotes', ApiQuote),
], debug=True)

