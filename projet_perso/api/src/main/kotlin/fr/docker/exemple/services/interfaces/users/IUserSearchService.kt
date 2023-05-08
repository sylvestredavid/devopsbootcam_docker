package fr.docker.exemple.services.interfaces.users

import fr.docker.exemple.dto.responses.UserDto


interface IUserSearchService {
    fun getAll(): List<UserDto>
}