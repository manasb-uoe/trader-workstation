# trader-workstation

## How to run the server?

1. Navigate to the `/server`.
2. Create and activate a new virtualenv:
	- `virtualenv env`
	- `./env/Scripts/activate.bat`
3. Install dependencies listed in requirements.txt:
	- `pip install -r requirements.txt`
4. Launch the server on port `8080`:
	- `python main.py`


## How to run the client?

1. Navigate to the `/client/app`.
2. Install dependencies:
	- `npm install`
3. Launch webpack dev server on port `3000`. All API requests will be proxied to `localhost:8080`.
	- `npm start`  
