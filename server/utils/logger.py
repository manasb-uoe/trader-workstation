import logging

logging.basicConfig(level=logging.INFO)

def get_logger(__name__: str):
  return logging.getLogger(__name__)