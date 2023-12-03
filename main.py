import secrets
import datetime

from flask import Flask
import flask

from Backend.tasks_backend import blueprint as tasks_blueprint
from Backend.weather_icons import blueprint as icons_blueprint

app = Flask(__name__)

app.register_blueprint(tasks_blueprint)
app.register_blueprint(icons_blueprint)

app.config["SECRET_KEY"] = secrets.token_hex()
app.config['PERMANENT_SESSION_LIFETIME'] = datetime.timedelta(
    days=365
)


@app.route('/')
@app.route('/index')
def index():
    return flask.send_file("Frontend/index.html")


@app.route("/favicon.svg")
def icon():
    return flask.send_file("Frontend/favicon.svg")


@app.route("/menu_icon.svg")
def menu_icon():
    return flask.send_file("Frontend/3rdParty/FreeIcons/view-compact-symbolic.svg")


@app.route("/test.jpg")
def test_img():
    return flask.send_file("Frontend/test.jpg")


@app.route("/css/style.css")
def style():
    return flask.send_file("Frontend/css/style.css")


@app.route("/css/burger-menu.css")
def burger_menu():
    return flask.send_file("Frontend/css/burger-menu.css")


@app.route("/3rdParty/logo_white_cropped.png")
def open_weather_logo_demo():
    return flask.send_file("Frontend/3rdParty/logo_white_cropped.png")


@app.route("/3rdParty/FreeIcons/weather-none-available.svg")
def weather_not_av():
    return flask.send_file("Frontend/3rdParty/FreeIcons/weather-none-available.svg")


@app.route("/css/weather-cards.css")
def weather_cards_css():
    return flask.send_file("Frontend/css/weather-cards.css")


@app.route("/css/navbar-styles.css")
def navbar_styles():
    return flask.send_file("Frontend/css/navbar-styles.css")


@app.route("/css/language-switch.css")
def language_switch_styles():
    return flask.send_file("Frontend/css/language-switch.css")


@app.route("/css/white-theme/style.css")
def white_theme_styles():
    return flask.send_file("Frontend/css/white-theme/style.css")


@app.route("/css/dark-theme/style.css")
def dark_theme_styles():
    return flask.send_file("Frontend/css/dark-theme/style.css")


@app.route("/weather-cards.html")
def weather_cards_html():
    return flask.send_file("Frontend/__weather_card.html")


@app.route("/js/main.js")
def main_js():
    return flask.send_file("Frontend/js/main.js")


@app.route("/js/themes.js")
def themes_js():
    return flask.send_file("Frontend/js/themes.js")


@app.errorhandler(404)
def page_not_found(error):
    return flask.send_file("Frontend/404.html"), 404


@app.route("/12_days_forecast")
@app.route("/12_days_forecast.html")
def forecast_on_12_days():
    return flask.send_file("Frontend/12_days_forecast.html")


@app.route("/js/12_days_forecast.js")
def forecast_on_12_days_js():
    return flask.send_file("Frontend/js/12_days_forecast.js")


@app.route("/js/global_backend_config.js")
def global_backend_config_js():
    return flask.send_file("Frontend/js/global_backend_config.js")


if __name__ == '__main__':
    app.run(debug=True, port=8080, host="0.0.0.0")
