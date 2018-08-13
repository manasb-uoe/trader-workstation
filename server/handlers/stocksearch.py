import tornado.httpclient
import requests
from utils import logger
from handlers import basehandler

class StockSearch(basehandler.BaseHandler):
    log = logger.get_logger(__name__)
    
    async def get(self):
        try:
            http = tornado.httpclient.AsyncHTTPClient()
            query = self.get_query_argument("query")
            url = f"http://d.yimg.com/aq/autoc?query={query}&type=S&lang=en-US"
            response = await http.fetch(url)
            self.ok(response.body)
        except Exception as e:
            self.log.error(e)
            self.error(e)
