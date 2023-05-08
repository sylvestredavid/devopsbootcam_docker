from flask import Flask, request, jsonify
import psycopg2

app = Flask(__name__)


@app.route('/products', methods=['GET'])
def get_all_products():
    conn = psycopg2.connect("postgresql://bartapp:Myriamelenajeremy24!@dockerexempledbproducts:5432/docker_app_products")
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
    conn = psycopg2.connect("postgresql://bartapp:Myriamelenajeremy24!@dockerexempledbproducts:5432/docker_app_products")
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
