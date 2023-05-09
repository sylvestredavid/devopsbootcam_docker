import React, {useState} from "react";
import {Button, Form, Input, message as AntdMessage } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {UserRequestModel} from "../../models/UserRequestModel";
import axios from "axios";
import './HomePage.css'
import {ProductRequestModel} from "../../models/ProductRequestModel";

const HomePage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const createUser = (values: any) => {
        setLoading(true)
        const newUser: UserRequestModel = {
            prenom: values.prenom,
            email: values.email,
            mdp: values.mdp,
        }

        axios.post("http://localhost:5000/users/create", newUser)
            .then((res) => {
                void AntdMessage.info(
                    `L'user a bien été ajouté.`, 3
                );
            })
            .catch(() => {
                void AntdMessage.error(
                    `Une erreur est survenue, merci de ressayer plus tard.`, 3
                );
            })
            .finally(() => setLoading(false))

    }

    const createProduct = (values: any) => {
        setLoading(true)
        const newProduct: ProductRequestModel = {
            name: values.name,
            image_url: values.image_url,
            price: values.price * 100,
        }

        axios.post("http://localhost:5001/products/create", newProduct)
            .then((res) => {
                void AntdMessage.info(
                    `Le produit a bien été ajouté.`, 3
                );
            })
            .catch(() => {
                void AntdMessage.error(
                    `Une erreur est survenue, merci de ressayer plus tard.`, 3
                );
            })
            .finally(() => setLoading(false))

    }

    return (
        <>
            <div className="container">
                <h1>Ajouter un user</h1>
                <Form
                    onFinish={createUser}
                    autoComplete="on"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                >
                    <Form.Item
                        label="Prenom"
                        name="prenom"
                        rules={[{required: true, message: 'Merci de renseigner un prenom'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={
                            [
                                {required: true, message: 'Merci de renseigner un email'},
                                {pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/, message: 'Merci de renseigner un email valide'}
                            ]
                        }
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Mdp"
                        name="mdp"
                        rules={[{required: true, message: 'Merci de renseigner un mot de passe'}]}
                    >
                        <Input.Password
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>

                    <div className="rightBtn">
                        <Button loading={loading} type="primary" htmlType="submit" shape="round">
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
            <div className="container">
                <h1>Ajouter un produit</h1>
                <Form
                    onFinish={createProduct}
                    autoComplete="on"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                >
                    <Form.Item
                        label="Nom"
                        name="name"
                        rules={[{required: true, message: 'Merci de renseigner un nom'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Image"
                        name="image_url"
                        rules={
                            [
                                {required: true, message: 'Merci de renseigner une image'},
                            ]
                        }
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Prix"
                        name="price"
                        rules={[{required: true, message: 'Merci de renseigner un prix'}]}
                    >
                        <Input type="number"/>
                    </Form.Item>

                    <div className="rightBtn">
                        <Button loading={loading} type="primary" htmlType="submit" shape="round">
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default HomePage
