package fr.docker.exemple.services.interfaces.users

import fr.docker.exemple.dto.requests.UserRequestDto
import fr.docker.exemple.dto.responses.UserDto


interface IUserCreateService {
    fun createUser(request: UserRequestDto): UserDto
}