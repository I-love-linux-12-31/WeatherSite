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


@blueprint.route("/css/tasks_2.css")
def tasks_2_css():
    print("NOT INCLUDE TO FINAL SITE !!!")
    return flask.send_file("./Frontend/css/tasks_2.css")


@blueprint.route("/tasks/tasks_2.html")
def tasks_2_html():
    print("NOT INCLUDE TO FINAL SITE !!!")
    return flask.send_file("./Frontend/tasks_page_2.html")


@blueprint.route("/js/task_9.js")
def tasks_9_js():
    print("NOT INCLUDE TO FINAL SITE !!!")
    return flask.send_file("./Frontend/js/pr9.js")
