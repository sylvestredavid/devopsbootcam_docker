from flask import Flask, request, jsonify
import psycopg2
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

PRODUCT_DATABASE_NAME = os.environ.get('PRODUCT_DATABASE_NAME')
PRODUCT_DATASOURCE_USERNAME = os.environ.get('PRODUCT_DATASOURCE_USERNAME')
PRODUCT_DATASOURCE_PASSWORD = os.environ.get('PRODUCT_DATASOURCE_PASSWORD')


@app.route('/products', methods=['GET'])
def get_all_products():
    conn = psycopg2.connect(f"postgresql://{PRODUCT_DATASOURCE_USERNAME}:{PRODUCT_DATASOURCE_PASSWORD}@dockerexempledbproducts:5432/{PRODUCT_DATABASE_NAME}")
    # Open a cursor to perform database operations
    cur = conn.cursor()

    # Execute a query
    cur.execute("SELECT * FROM products")

    # Retrieve query results
    records = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify([{
        "id": product[0],
        "name": product[1],
        "image_url": product[2],
        "price": product[3],
    } for product in records])


@app.route('/products/create', methods=['POST'])
def create_product():
    data = request.json
    conn = psycopg2.connect(f"postgresql://{PRODUCT_DATASOURCE_USERNAME}:{PRODUCT_DATASOURCE_PASSWORD}@dockerexempledbproducts:5432/{PRODUCT_DATABASE_NAME}")
    cur = conn.cursor()
    cur.execute("""INSERT INTO products (id, name, image_url, price)
                VALUES((SELECT uuid_in(md5(random()::text || random()::text)::cstring)), %s, %s, %s)""",
                (data["name"], data["image_url"], data["price"]))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({
        'code': 200,
        'message': 'product created!'
    })


if __name__ == '__main__':
    app.run(port=5001)
