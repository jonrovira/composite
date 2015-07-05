from flask import Flask, request, send_file
from instagram.client import InstagramAPI
import os
import json



##
# Flask application, specify configurations
#
#
app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])



##
# Index route 
#
#
@app.route("/")
def index():
    return send_file("templates/index.html")



##
# Instagram request route
#
#
@app.route('/instagram', methods=['POST'])
def instagram():
	results = []
	api = InstagramAPI(client_id=app.config['CLIENT_ID'], client_secret=app.config['CLIENT_SECRET'])

	data = json.loads(request.data.decode())
	lat = data["lat"]
	lng = data["lng"]
	dist = data["dist"]
	min_tstmp = data["min_timestamp"]
	your_location = api.media_search(count=100, lat=lat, lng=lng, distance=dist, min_timestamp=min_tstmp)

	for media in your_location:
		results.append(media.images['standard_resolution'].url)

	results = json.dumps(results)

	return results



##
# Main
#
#
if __name__ == '__main__':
	app.debug = True
	app.run()