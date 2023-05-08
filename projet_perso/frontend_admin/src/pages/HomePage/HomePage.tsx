import React, {useState} from "react";
import {Button, Form, Input, message as AntdMessage } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {UserRequestModel} from "../../models/UserModel";
import axios from "axios";
import './HomePage.css'

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
    return (
        <div className="container">
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
    )
}

export default HomePage
