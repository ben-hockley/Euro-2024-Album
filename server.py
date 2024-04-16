import os
from flask import Flask, redirect, request, render_template, url_for
import json
import sqlite3

app = Flask(__name__)

ALLOWED_EXTENTIONS = set(['jpg', 'txt', 'svg', 'png', 'jpeg', 'gif'])

@app.route("/")
def redirectSignIn():
    return redirect("/signIn")

@app.route("/signIn")
def renderSignIn():
    return render_template("signIn.html")

@app.route("/submitLogInForm", methods=['POST'])
def redirectHomePage():
    username = request.form.get('uname')
    password = request.form.get('pword')

    conn = sqlite3.connect('euroAlbum.db')
    cur = conn.cursor()
    cur.execute(f'SELECT Password FROM Accounts WHERE Username = "{username}"')
    realPassword = cur.fetchone()[0]

    #redirects user to homepage is password is correct
    if (realPassword == password):
        return redirect(f"/home/{username}")
    #else redirect back to sign in page
    return redirect("/signIn")

@app.route("/home/<user>")
def loadHomePage(user):
    return render_template('home.html',username=user)

if __name__ == "__main__":
    app.run(debug=True)