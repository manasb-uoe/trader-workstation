import tornado.ioloop
import tornado.web
from handlers import stocksearch
from utils import logger

if __name__ == "__main__":
    log = logger.get_logger(__name__)
    app = tornado.web.Application([(r"/stocks", stocksearch.StockSearch)])
    port = 8080
    log.info("Starting server on port: " + str(port))
    app.listen(port)
    tornado.ioloop.IOLoop.instance().start()