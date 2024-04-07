from django.shortcuts import render,redirect
import oracledb

session = []

def home(request):
    print('session is',session)
    return render(request, 'index.html')


def signup(request):
    if request.method == 'POST':
        conn = oracledb.connect(
            user='unique_car', password='123', host="localhost", port=1521)
        try:
            # Create a cursor
            cur = conn.cursor()
            cur2 = conn.cursor()

            username = request.POST['username']
            email = request.POST['email']
            password = request.POST['password']
            
            print(username, password, email)

            email_check = """SELECT * FROM USERS where email = :1"""
            cur.execute(email_check, (email,))
            email_result = cur.fetchone()

            user_check = """SELECT * FROM USERS where username = :1"""
            cur.execute(user_check, (username,))
            username_result = cur.fetchone()

            if email_result not in (None, '', ' '):
                print('This email already exist')
            elif username_result not in (None, '', ' '):
                print('username already taken')
            elif len(password) <= 8:
                print('enter password with more than 8 chars')
            else:
                insert = conn.cursor()
                insert_sql = """INSERT INTO USERS(username, email, password) values(:1, :2, :3)"""
                result = insert.execute(insert_sql, (username,email, password))
                session.append(email)
                print(result)
                conn.commit()
                

        except oracledb.Error as error:
            print('Error occurred:', error)
        finally:
            cur.close()
            conn.close()
    return render(request, 'signup.html')

def login_user(request):

    if request.method == 'POST':
        conn = oracledb.connect(
            user='unique_car', password='123', host="localhost", port=1521)
        try:
            # Create a cursor
            cur = conn.cursor()
            
            username = request.POST['username']
            password = request.POST['password']
            print(username, password)
            sql = """SELECT * FROM USERS where username = :1 and password = :2"""
            cur.execute(sql, (username,password))
            
            # Fetch the result
            result = cur.fetchone()
            print(result)
            if result in (None,'', ' '):
                print('False password')
            else:
                session.append(result[2])
                return redirect('/')
        except oracledb.Error as error:
            print('Error occurred:', error)
        finally:
            cur.close()
            conn.close()
    
    return render(request, 'login.html')
