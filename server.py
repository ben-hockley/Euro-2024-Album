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

    conn = sqlite3.connect('euroalbum.db')
    cur = conn.cursor()
    cur.execute(f'SELECT Password FROM Accounts WHERE Username = "{username}"')
    realPassword = cur.fetchone()[0]
    conn.close()

    #redirects user to homepage if password is correct
    if (realPassword == password):
        return redirect(f"/home/{username}")
    #else redirect back to sign in page
    return redirect("/signIn")

@app.route("/createAccount")
def loadCreateAccount():
    return render_template('createAccount.html')

@app.route("/submitNewAccount", methods=['POST'])
def submitNewAccount():
    username = request.form.get('uname')
    password = request.form.get('pword')

    albumName = username + "_sTable"
    swapStackName = username + "_sSwaps"

    conn = sqlite3.connect('euroalbum.db')
    cur = conn.cursor()
    cur.execute(f"INSERT INTO Accounts('Username','Password') VALUES ('{username}','{password}');")
    conn.commit()
    cur.execute(f"CREATE TABLE '{albumName}' AS SELECT * FROM AlbumTemplate;") #Create new album for new user
    cur.execute(f"CREATE TABLE '{swapStackName}' AS SELECT * FROM SwapStackTemplate;") #Create new swap stack for new user
    conn.close()
    return redirect("/signIn")

@app.route("/home/<user>")
def loadHomePage(user):
    return render_template('home.html',username=user)

@app.route("/album/<user>")
def loadAlbum(user):

    usersAlbum = user + "_sTable"

    conn = sqlite3.connect('euroalbum.db')
    cur = conn.cursor()
    cur.execute(f'SELECT Collected FROM {usersAlbum};') #get updated collection
    checklist = cur.fetchall()
    conn.close()
    checklist = json.dumps(checklist) #convert array to JSON to pass to JS.
    return render_template('album.html',username=user,checklist=checklist)

@app.route("/openPacks/<user>")
def loadPacks(user):
    usersAlbum = user + "_sTable"

    #get connection before opening new pack to check if cards are new
    conn = sqlite3.connect('euroalbum.db')
    cur = conn.cursor()
    cur.execute(f'SELECT Collected FROM {usersAlbum};')
    checklist = cur.fetchall()
    conn.close()
    checklist = json.dumps(checklist)

    return render_template('openPacks.html',username=user,checklist=checklist)

@app.route('/logNewCards',methods=['POST'])
def logNewCards():
    #get username
    user = request.form.get('uname')
    #get card numbers of all 5 cards in pack.
    card1 = request.form.get('pack1')
    card2 = request.form.get('pack2')
    card3 = request.form.get('pack3')
    card4 = request.form.get('pack4')
    card5 = request.form.get('pack5')

    usersAlbum = user + "_sTable"
    usersSwapStack = user + "_sSwaps"

    conn = sqlite3.connect('euroalbum.db')
    cur = conn.cursor()
    #1st card
    cur.execute(f'SELECT Collected FROM {usersAlbum} WHERE ID = {card1}')
    checkCollected = cur.fetchone()[0]
    if checkCollected == 0:
        #if new card stick into the users album
        cur.execute(f'UPDATE {usersAlbum} SET Collected = 1 WHERE ID = {card1};')
        conn.commit()
    else:
        #if not a new card add to the users swap stack.
        cur.execute(f'INSERT INTO {usersSwapStack} (cardNumber) VALUES ({card1});')
        conn.commit()
    #2nd card
    cur.execute(f'SELECT Collected FROM {usersAlbum} WHERE ID = {card2}')
    checkCollected = cur.fetchone()[0]
    if checkCollected == 0:
        cur.execute(f'UPDATE {usersAlbum} SET Collected = 1 WHERE ID = {card2};')
        conn.commit()
    else:
        cur.execute(f'INSERT INTO {usersSwapStack} (cardNumber) VALUES ({card2});')
        conn.commit()
    #3rd card
    cur.execute(f'SELECT Collected FROM {usersAlbum} WHERE ID = {card3}')
    checkCollected = cur.fetchone()[0]
    if checkCollected == 0:
        cur.execute(f'UPDATE {usersAlbum} SET Collected = 1 WHERE ID = {card3};')
        conn.commit()
    else:
        cur.execute(f'INSERT INTO {usersSwapStack} (cardNumber) VALUES ({card3});')
        conn.commit()
    #4th card
    cur.execute(f'SELECT Collected FROM {usersAlbum} WHERE ID = {card4}')
    checkCollected = cur.fetchone()[0]
    if checkCollected == 0:
        cur.execute(f'UPDATE {usersAlbum} SET Collected = 1 WHERE ID = {card4};')
        conn.commit()
    else:
        cur.execute(f'INSERT INTO {usersSwapStack} (cardNumber) VALUES ({card4});')
        conn.commit()
    #5th card
    cur.execute(f'SELECT Collected FROM {usersAlbum} WHERE ID = {card5}')
    checkCollected = cur.fetchone()[0]
    if checkCollected == 0:
        cur.execute(f'UPDATE {usersAlbum} SET Collected = 1 WHERE ID = {card5};')
        conn.commit()
    else:
        cur.execute(f'INSERT INTO {usersSwapStack} (cardNumber) VALUES ({card5});')
        conn.commit()
    #close connection
    conn.close()

    #redirect user back to homescreen
    return redirect('/home/'+user)

if __name__ == "__main__":
    app.run(debug=True)