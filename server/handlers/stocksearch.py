from utils import httpresponsefactory
import tornado
import requests
from utils import logger

class StockSearch(tornado.web.RequestHandler):
    log = logger.get_logger(__name__)
    def get(self):
        try:
            query = self.get_query_argument("query")
            url = f"http://d.yimg.com/aq/autoc?query={query}&type=S&lang=en-US"
            response = requests.get(url, timeout=0.2)
            self.write(httpresponsefactory.create_ok(response.text))
        except Exception as e:
            self.log.error(e)   
            self.write(httpresponsefactory.create_error(str(e)))
