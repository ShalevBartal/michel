from flask import Flask, jsonify
import urllib
import pyodbc
from flask_cors import CORS
from flask import request, jsonify

app = Flask(__name__)
CORS(app)

@app.route('/execute-query')
def execute_query():
    try:
        # Use the connection string directly here
        conn_str = (
            'DRIVER={ODBC Driver 17 for SQL Server};'
            'SERVER=DESKTOP-JCN3TE0;'
            'DATABASE=flask;'
            'Trusted_Connection=yes;'
        )
        with pyodbc.connect(conn_str) as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT * FROM persons")
                rows = cursor.fetchall()
                # Convert data into a list of dictionaries or a similar structure
                data = [dict(zip([column[0] for column in cursor.description], row)) for row in rows]
                return jsonify(data=data)
    except Exception as e:
        return jsonify(error=str(e)), 500


@app.route('/add-person', methods=['POST'])
def add_person():
    data = request.get_json()
    address = data.get('Address')
    city = data.get('City')
    first_name = data.get('FirstName')
    last_name = data.get('LastName')
    person_id = data.get('PersonID')

    try:
        conn_str = (
            'DRIVER={ODBC Driver 17 for SQL Server};'
            'SERVER=DESKTOP-JCN3TE0;'
            'DATABASE=flask;'
            'Trusted_Connection=yes;'
        )
        with pyodbc.connect(conn_str) as conn:
            with conn.cursor() as cursor:
                cursor.execute("""
                    INSERT INTO Persons (PersonID, LastName, FirstName, Address, City)
                    VALUES (?, ?, ?, ?, ?)
                """, (person_id, last_name, first_name, address, city))
                conn.commit()
        return jsonify(success=True), 201
    except Exception as e:
        return jsonify(error=str(e)), 500
    
@app.route('/add-colleague', methods=['POST'])
def add_colleague():
    data = request.get_json()
    colleague_id = data.get('ColleagueID')
    name = data.get('Name')
    email = data.get('Email')
    phone_number = data.get('PhoneNumber')
    emergency_contact = data.get('EmergencyContact')
    address = data.get('Address')
    sensitivity = data.get('Sensitivity')
    room_number = data.get('roomNumber')
    status = data.get('status')

    try:
        conn_str = (
            'DRIVER={ODBC Driver 17 for SQL Server};'
            'SERVER=DESKTOP-JCN3TE0;'
            'DATABASE=flask;'
            'Trusted_Connection=yes;'
        )
        with pyodbc.connect(conn_str) as conn:
            with conn.cursor() as cursor:
                # Check if the colleague already exists
                cursor.execute("""
                    IF EXISTS (SELECT 1 FROM soldier WHERE ColleagueID = ?)
                    BEGIN
                        UPDATE soldier
                        SET Name = ?, Email = ?, PhoneNumber = ?, EmergencyContact = ?, Address = ?, Sensitivity = ?, roomNumber = ?, status = ?
                        WHERE ColleagueID = ?
                    END
                    ELSE
                    BEGIN
                        INSERT INTO soldier (ColleagueID, Name, Email, PhoneNumber, EmergencyContact, Address, Sensitivity, roomNumber, status)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                    END
                """, (colleague_id, name, email, phone_number, emergency_contact, address, sensitivity, room_number, status, colleague_id, colleague_id, name, email, phone_number, emergency_contact, address, sensitivity, room_number, status))
                conn.commit()
        return jsonify(success=True), 201
    except Exception as e:
        return jsonify(error=str(e)), 500

    

@app.route('/update-housing-status', methods=['POST'])
def update_housing_status():
    data = request.get_json()
    soldier_id = data.get('id')
    room_number = data.get('roomNumber')
    status = data.get('status')
    join_date = data.get('joinDate')  # Fetch the join date from the request

    try:
        conn_str = (
            'DRIVER={ODBC Driver 17 for SQL Server};'
            'SERVER=DESKTOP-JCN3TE0;'
            'DATABASE=flask;'
            'Trusted_Connection=yes;'
        )
        with pyodbc.connect(conn_str) as conn:
            with conn.cursor() as cursor:
                # Update soldier table
                cursor.execute("""
                    UPDATE soldier
                    SET roomNumber = ?, status = ?, JoinDate = ?
                    WHERE ColleagueID = ?
                """, (room_number, status, join_date, soldier_id))

                # Update HOUSE_ROOM_DETAILS table
                cursor.execute("""
                    UPDATE HOUSE_ROOM_DETAILS
                    SET capacity = capacity + 1
                    WHERE room_number = ?
                """, (room_number,))

                conn.commit()
        return jsonify(success=True), 200
    except Exception as e:
        return jsonify(error=str(e)), 500



@app.route('/manage-coordinator', methods=['POST'])
def manage_coordinator():
    data = request.get_json()
    coordinator_id = data.get('id')
    house_id = data.get('house_id')
    name = data.get('name')
    phone_number = data.get('phoneNumber')
    email = data.get('email')

    try:
        conn_str = (
            'DRIVER={ODBC Driver 17 for SQL Server};'
            'SERVER=DESKTOP-JCN3TE0;'
            'DATABASE=flask;'
            'Trusted_Connection=yes;'
        )
        with pyodbc.connect(conn_str) as conn:
            with conn.cursor() as cursor:
                # Check if the coordinator already exists
                cursor.execute("SELECT COUNT(1) FROM COORDINATOR WHERE id = ?", (coordinator_id,))
                if cursor.fetchone()[0] > 0:
                    # Update existing coordinator
                    cursor.execute("""
                        UPDATE COORDINATOR
                        SET house_id = ?, name = ?, phoneNumber = ?, email = ?
                        WHERE id = ?
                    """, (house_id, name, phone_number, email, coordinator_id))
                else:
                    # Insert new coordinator
                    cursor.execute("""
                        INSERT INTO COORDINATOR (id, house_id, name, phoneNumber, email)
                        VALUES (?, ?, ?, ?, ?)
                    """, (coordinator_id, house_id, name, phone_number, email))
                conn.commit()
        return jsonify(success=True), 200
    except Exception as e:
        app.logger.error('Error managing coordinator: %s', str(e))
        return jsonify(error=str(e)), 500

@app.route('/remove-colleague', methods=['POST'])
def remove_colleague():
    data = request.get_json()
    soldier_id = data.get('soldier_id')
    reason_for_leaving = data.get('reasonForLeaving')
    date_of_leaving = data.get('dateOfLeaving')  # New field for date of leaving

    try:
        conn_str = (
            'DRIVER={ODBC Driver 17 for SQL Server};'
            'SERVER=DESKTOP-JCN3TE0;'
            'DATABASE=flask;'
            'Trusted_Connection=yes;'
        )
        with pyodbc.connect(conn_str) as conn:
            with conn.cursor() as cursor:
                # Check for open debt
                cursor.execute("SELECT cast(debt as int) FROM payment WHERE soldier_id = ?", (soldier_id,))
                if cursor.fetchone()[0] > 0:
                    return jsonify(error='There is an open debt, pay it and then we could remove the colleague'), 400

                # Get the room number
                cursor.execute("SELECT roomNumber FROM soldier WHERE ColleagueID = ?", (soldier_id,))
                room_number = cursor.fetchone()
                if room_number is not None:
                    room_number = room_number[0]
                    # Decrease capacity of the room
                    cursor.execute("UPDATE HOUSE_ROOM_DETAILS SET capacity = capacity - 1 WHERE room_number = ?", (room_number,))

                # Remove from soldier table and insert into retirement table
                cursor.execute("DELETE FROM soldier WHERE ColleagueID = ?", (soldier_id,))
                cursor.execute("""
                    INSERT INTO retirement (soldier_id, reason_for_leaving, date_of_leaving) 
                    VALUES (?, ?, ?)
                """, (soldier_id, reason_for_leaving, date_of_leaving))  # Include date_of_leaving in the INSERT query
                conn.commit()

        return jsonify(success=True), 200
    except Exception as e:
        app.logger.error('Error removing colleague: %s', str(e))
        return jsonify(error=str(e)), 500




@app.route('/verify-payment', methods=['POST'])
def verify_payment():
    data = request.get_json()
    soldier_id = data.get('soldier_id')
    date = data.get('date')
    amount = data.get('amount')

    try:
        conn_str = (
            'DRIVER={ODBC Driver 17 for SQL Server};'
            'SERVER=DESKTOP-JCN3TE0;'
            'DATABASE=flask;'
            'Trusted_Connection=yes;'
        )
        with pyodbc.connect(conn_str) as conn:
            with conn.cursor() as cursor:
                cursor.execute("""
                    INSERT INTO payment (soldier_id, date, amount)
                    VALUES (?, ?, ?)
                """, (soldier_id, date, amount))
                conn.commit()
        return jsonify(success=True), 201
    except Exception as e:
        app.logger.error('Error verifying payment: %s', str(e))
        return jsonify(error=str(e)), 500




@app.route('/verify-shopping', methods=['POST'])
def verify_shopping():
    data = request.get_json()
    COORDINATOR_id = data.get('COORDINATOR_id')
    Date_of_purchase = data.get('Date_of_purchase')
    category = data.get('category')
    product = data.get('product')
    quantity = data.get('quantity')
    price = data.get('price')

    try:
        conn_str = (
            'DRIVER={ODBC Driver 17 for SQL Server};'
            'SERVER=DESKTOP-JCN3TE0;'
            'DATABASE=flask;'
            'Trusted_Connection=yes;'
        )
        with pyodbc.connect(conn_str) as conn:
            with conn.cursor() as cursor:
                cursor.execute("""
                    INSERT INTO PURCHASE (COORDINATOR_id, Date_of_purchase, category, product, quantity, price)
                    VALUES (?, ?, ?, ?, ?, ?)
                """, (COORDINATOR_id, Date_of_purchase, category, product, quantity, price))
                conn.commit()
        return jsonify(success=True), 201
    except Exception as e:
        app.logger.error('Error during shopping verification: %s', str(e))
        return jsonify(error=str(e)), 500

@app.route('/open-debt-report')
def open_debt_report():
    try:
        # Use the connection string directly in the route
        conn_str = (
            'DRIVER={ODBC Driver 17 for SQL Server};'
            'SERVER=DESKTOP-JCN3TE0;'
            'DATABASE=flask;'
            'Trusted_Connection=yes;'
        )
        with pyodbc.connect(conn_str) as conn:
            with conn.cursor() as cursor:
                cursor.execute("""
                   SELECT s.ColleagueID, s.Name, s.Email, s.PhoneNumber, s.Address, s.roomNumber, s.status, p.debt
FROM soldier s
INNER JOIN payment p ON s.ColleagueID = p.soldier_id
WHERE CAST(p.debt AS DECIMAL(10, 2)) > 0
order by CAST(p.debt AS DECIMAL(10, 2))  desc                       
                                ;

                """)
                rows = cursor.fetchall()
                data = [dict(zip([column[0] for column in cursor.description], row)) for row in rows]
                return jsonify(data=data)
    except Exception as e:
        app.logger.error('Error fetching open debt report: %s', str(e))
        return jsonify(error=str(e)), 500

@app.route('/vacant-rooms-report')
def vacant_rooms_report():
    try:
        conn_str = (
            'DRIVER={ODBC Driver 17 for SQL Server};'
            'SERVER=DESKTOP-JCN3TE0;'
            'DATABASE=flask;'
            'Trusted_Connection=yes;'
        )
        with pyodbc.connect(conn_str) as conn:
            with conn.cursor() as cursor:
                cursor.execute("""
                    SELECT house_id, COORDINATOR_id, name, address, room_number,
                           (8 - capacity) AS available_beds
                    FROM HOUSE_ROOM_DETAILS
                    WHERE capacity < 8
                    ORDER BY available_beds DESC;
                """)
                rows = cursor.fetchall()
                data = [dict(zip([column[0] for column in cursor.description], row)) for row in rows]
                return jsonify(data=data)
    except Exception as e:
        app.logger.error('Error fetching vacant rooms report: %s', str(e))
        return jsonify(error=str(e)), 500
    
@app.route('/purchase-report')
def purchase_report():
    try:
        conn_str = (
            'DRIVER={ODBC Driver 17 for SQL Server};'
            'SERVER=DESKTOP-JCN3TE0;'
            'DATABASE=flask;'
            'Trusted_Connection=yes;'
        )
        with pyodbc.connect(conn_str) as conn:
            with conn.cursor() as cursor:
                cursor.execute("""
                    SELECT p.*, h.name AS house_name
                    FROM PURCHASE p
                    LEFT JOIN HOUSE_ROOM_DETAILS h ON p.COORDINATOR_id = h.COORDINATOR_id
                """)
                rows = cursor.fetchall()
                data = [dict(zip([column[0] for column in cursor.description], row)) for row in rows]
                return jsonify(data=data)
    except Exception as e:
        app.logger.error('Error fetching purchase report: %s', str(e))
        return jsonify(error=str(e)), 500
    
   
@app.route('/joining-soldiers')
def joining_soldiers_report():
    try:
        conn_str = (
            'DRIVER={ODBC Driver 17 for SQL Server};'
            'SERVER=DESKTOP-JCN3TE0;'
            'DATABASE=flask;'
            'Trusted_Connection=yes;'
        )
        with pyodbc.connect(conn_str) as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT * FROM soldier")
                rows = cursor.fetchall()
                data = [dict(zip([column[0] for column in cursor.description], row)) for row in rows]
                return jsonify(data=data)
    except Exception as e:
        app.logger.error('Error fetching soldiers: %s', str(e))
        return jsonify(error=str(e)), 500

@app.route('/leavings', methods=['GET'])
def leavings_report():
    try:
        conn_str = (
            'DRIVER={ODBC Driver 17 for SQL Server};'
            'SERVER=DESKTOP-JCN3TE0;'
            'DATABASE=flask;'
            'Trusted_Connection=yes;'
        )
        with pyodbc.connect(conn_str) as conn:
            with conn.cursor() as cursor:
                cursor.execute("""
                    SELECT * FROM retirement
                """)
                rows = cursor.fetchall()
                data = [dict(zip([column[0] for column in cursor.description], row)) for row in rows]
                return jsonify(data=data)
    except Exception as e:
        app.logger.error('Error fetching leavings data: %s', str(e))
        return jsonify(error=str(e)), 500


if __name__ == '__main__':
    app.run(debug=True)


