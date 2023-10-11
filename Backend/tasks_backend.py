from flask import Blueprint
import flask

blueprint = Blueprint("Tasks backend", __name__)


@blueprint.route("/tasks/main.html")
def tasks_page():
    return flask.send_file("Frontend/tasks_page.html")


@blueprint.route("/_tasks.css")
def tasks():
    print("NOT INCLUDE TO FINAL SITE !!!")
    return flask.send_file("./_tasks.css")


@blueprint.route("/1.webm")
def webm():
    print("NOT INCLUDE TO FINAL SITE !!!")
    return flask.send_file("./Frontend/1.webm")
