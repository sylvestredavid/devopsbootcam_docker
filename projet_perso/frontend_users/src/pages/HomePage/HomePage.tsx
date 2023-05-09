import React, {useEffect, useState} from "react";
import axios from "axios";
import {UserModel} from "../../models/UserModel";
import {ColumnsType} from "antd/es/table";
import {
    Table,
    Empty as AntdEmpty,
} from "antd";
import {ProductModel} from "../../models/ProductModel";
import './HomePage.css'

const HomePage: React.FC = () => {

    const [users, setUsers] = useState<UserModel[]>([])
    const [products, setProducts] = useState<ProductModel[]>([])

    useEffect(() => {
        void axios.get(`http://localhost:5000/users`)
            .then(res => {
                setUsers(res.data)
            })
        void axios.get(`http://localhost:5001/products`)
            .then(res => {
                setProducts(res.data)
            })
    }, [])

    const columns: ColumnsType<UserModel> = [
        {
            title: 'Prenom',
            dataIndex: 'prenom',
            key: 'prenom',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
    ];

    const productsColumns: ColumnsType<ProductModel> = [
        {
            title: 'Nom',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Image',
            dataIndex: 'image_url',
            key: 'image_url',
        },
        {
            title: 'Prix',
            dataIndex: 'price',
            key: 'price',
            render: (value: number) => <p>{value / 100}€</p>
        },
    ];

    return (
        <>
            <div className="container">
                <h1>Users</h1>
                <Table locale={{
                    emptyText: <AntdEmpty
                        image={AntdEmpty.PRESENTED_IMAGE_SIMPLE}
                        description={'Aucun résultat trouvé'}
                    />
                }}
                       dataSource={users}
                       columns={columns} size="middle"/>
            </div>
            <div className="container">
                <h1>Products</h1>
                <Table locale={{
                    emptyText: <AntdEmpty
                        image={AntdEmpty.PRESENTED_IMAGE_SIMPLE}
                        description={'Aucun résultat trouvé'}
                    />
                }}
                       dataSource={products}
                       columns={productsColumns} size="middle"/>
            </div>
        </>
    )
}

export default HomePage
