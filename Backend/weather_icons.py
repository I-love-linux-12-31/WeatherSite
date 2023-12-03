import os.path

from flask import Blueprint, request
import flask

blueprint = Blueprint("Weather icons", __name__)


def get_path_by_met_no_icon_name(name: str) -> str:
    filename = f"Frontend/3rdParty/FreeIcons/weather-{name}.svg"
    if os.path.exists(filename):
        return filename
    match name:
        case "cloudy":
            return "Frontend/3rdParty/FreeIcons/weather-clouds.svg"
        case "partlycloudy_day":
            return "Frontend/3rdParty/FreeIcons/weather-few-clouds.svg"
        case "partlycloudy_night":
            return "Frontend/3rdParty/FreeIcons/weather-few-clouds-night.svg"
        case "sleet":
            return "Frontend/3rdParty/FreeIcons/weather-snow-rain.svg"
        case "lightsnowshowers_day":
            return "Frontend/3rdParty/FreeIcons/weather-few-clouds.svg"
        case "lightsnowshowers_night":
            return "Frontend/3rdParty/FreeIcons/weather-few-clouds-night.svg"
        case "lightrain":
            return "Frontend/3rdParty/FreeIcons/weather-showers.svg"
        case "rain":
            return "Frontend/3rdParty/FreeIcons/weather-showers.svg"
        case "lightsnow":
            return "Frontend/3rdParty/FreeIcons/weather-snow.svg"
        case "fair_night":
            return "Frontend/3rdParty/FreeIcons/weather-clear-night.svg"
        case "clearsky_night":
            return "Frontend/3rdParty/FreeIcons/weather-clear-night.svg"
        case "fair_day":
            return "Frontend/3rdParty/FreeIcons/weather-clear-wind.svg"
        case "clearsky_day":
            return "Frontend/3rdParty/FreeIcons/weather-clear.svg"
        case "lightsleet":
            return "Frontend/3rdParty/FreeIcons/weather-clear.svg"
        case "rainshowers_day":
            return "Frontend/3rdParty/FreeIcons/weather-showers.svg"
        case "heavysleet":
            return "Frontend/3rdParty/FreeIcons/weather-snow-rain.svg"

    print(f"[\033[33mWARN\033[0m] failed to get icon: {name}]")
    return "Frontend/3rdParty/FreeIcons/weather-none-available.svg"


@blueprint.route("/icons/met_no_api")
def get_met_no_icon():
    if "weather" in request.args.keys():
        response = flask.send_file(get_path_by_met_no_icon_name(request.args["weather"]))
        response.headers.add_header("Access-Control-Allow-Origin", "*")
        return response

    else:
        response = flask.make_response("No image found.", 404)
        response.headers.add_header("Access-Control-Allow-Origin", "*")
        return response
