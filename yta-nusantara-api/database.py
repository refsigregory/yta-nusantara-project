import pymysql
import time
import os

# Load database configuration from environment variables
db_config = {
    'host': os.getenv('DB_HOST'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'name': os.getenv('DB_NAME'),
}

max_retries = 3
retry_count = 0

while retry_count < max_retries:
    try:
        # Initializing connection
        db = pymysql.connections.Connection(
            host=db_config['host'],
            user=db_config['user'],
            password=db_config['password'],
            connect_timeout=60
        )

        # Creating cursor object
        cursor = db.cursor()

        # Executing SQL query
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {db_config['name']}")
        cursor.execute("SHOW DATABASES")

        # Displaying databases
        for databases in cursor:
            print(databases)

        # Closing the cursor and connection to the database
        cursor.close()
        db.close()

        break  # Exit loop if successful
    
    except pymysql.Error as e:
        print(f"Error: {e}")
        retry_count += 1
        print(f"Retrying connection... (Attempt {retry_count}/{max_retries})")
        time.sleep(5)  # Wait for 5 seconds before retrying
