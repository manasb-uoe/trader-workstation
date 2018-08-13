import tornado

class BaseHandler(tornado.web.RequestHandler):
    def ok(self, contents):
        self.write(contents)
    
    def error(self, error):
        self.write({"error": str(error)})
