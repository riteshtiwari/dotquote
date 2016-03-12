from google.appengine.ext import ndb

class Quote(ndb.Model):
    author = ndb.StringProperty()
    created_at = ndb.DateTimeProperty(auto_now_add=True)
    en = ndb.StringProperty(indexed=False)
    hi = ndb.StringProperty(indexed=False)
    desc = ndb.StringProperty(indexed=False)

    def __unicode__(self):
        return u"%s - %s - %s"%(self.hi, self.en, self.author)

    def __str__(self):
        return unicode(self).encode('utf-8')

