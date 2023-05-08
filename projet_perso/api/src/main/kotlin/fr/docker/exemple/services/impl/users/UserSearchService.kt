package fr.docker.exemple.services.impl.users

import fr.docker.exemple.dto.responses.UserDto
import fr.docker.exemple.repositories.UserRepository
import fr.docker.exemple.services.interfaces.users.IUserSearchService
import org.springframework.stereotype.Service

@Service
class UserSearchService(val userRepository: UserRepository): IUserSearchService {

    override fun getAll(): List<UserDto> {
        val users = userRepository.findAll()

        return users.map(UserDto::fromDb)
    }

}