import secrets
import datetime

from flask import Flask
import flask


app = Flask(__name__)

app.config["SECRET_KEY"] = secrets.token_hex()
app.config['PERMANENT_SESSION_LIFETIME'] = datetime.timedelta(
    days=365
)


@app.route('/')
@app.route('/index')
def index():
    return flask.send_file("./Frontend/index.html")


@app.route("/favicon.svg")
def icon():
    return flask.send_file("./Frontend/favicon.svg")


@app.route("/style.css")
def style():
    return flask.send_file("./Frontend/style.css")


@app.route("/3rdParty/logo_white_cropped.png")
def open_weather_logo_demo():
    return flask.send_file("./Frontend/3rdParty/logo_white_cropped.png")


if __name__ == '__main__':
    app.run(debug=True, port=8080, host="0.0.0.0")
